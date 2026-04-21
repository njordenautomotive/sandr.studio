from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt as pyjwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME")
client: Optional[AsyncIOMotorClient] = None
db: Optional[AsyncIOMotorDatabase] = None

if mongo_url and db_name:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'sandr-admin-2026')
JWT_SECRET = os.environ.get('JWT_SECRET', 'sandr_studio_secret_key_change_in_prod')
JWT_ALGO = 'HS256'
JWT_EXPIRY_HOURS = 12

app = FastAPI(title="sandr.studio API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)


# ---------- Models ----------
class ContactSubmissionCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=200)
    website: Optional[str] = Field(default=None, max_length=500)
    startup_description: str = Field(..., min_length=1, max_length=2000)
    need: Optional[str] = Field(default=None, max_length=2000)
    problem: Optional[str] = Field(default=None, max_length=2000)
    timeline: Optional[str] = Field(default=None, max_length=120)
    budget: Optional[str] = Field(default=None, max_length=120)
    desired_feel: Optional[str] = Field(default=None, max_length=2000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    website: Optional[str] = None
    startup_description: str
    need: Optional[str] = None
    problem: Optional[str] = None
    timeline: Optional[str] = None
    budget: Optional[str] = None
    desired_feel: Optional[str] = None
    status: str = "new"  # new | read | replied | archived
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AdminLoginRequest(BaseModel):
    password: str


class AdminLoginResponse(BaseModel):
    token: str
    expires_in_hours: int


class StatusUpdateRequest(BaseModel):
    status: str


# ---------- Helpers ----------
def serialize_doc(doc: dict) -> dict:
    if not doc:
        return doc
    doc = {k: v for k, v in doc.items() if k != '_id'}
    if 'created_at' in doc and isinstance(doc['created_at'], str):
        try:
            doc['created_at'] = datetime.fromisoformat(doc['created_at'])
        except Exception:
            pass
    return doc


def create_token() -> str:
    payload = {
        'sub': 'admin',
        'role': 'admin',
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        'iat': datetime.now(timezone.utc),
    }
    return pyjwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def require_db() -> AsyncIOMotorDatabase:
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database is not configured for this deployment",
        )
    return db


async def require_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> dict:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")
    try:
        payload = pyjwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    if payload.get('role') != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    return payload


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"studio": "sandr.studio", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"ok": True, "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactSubmission, status_code=201)
async def create_contact(payload: ContactSubmissionCreate):
    database = require_db()
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await database.contact_submissions.insert_one(doc)
    return submission


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(body: AdminLoginRequest):
    if not body.password or body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    token = create_token()
    return AdminLoginResponse(token=token, expires_in_hours=JWT_EXPIRY_HOURS)


@api_router.get("/admin/me")
async def admin_me(_user: dict = Depends(require_admin)):
    return {"authenticated": True, "role": "admin"}


@api_router.get("/admin/submissions", response_model=List[ContactSubmission])
async def list_submissions(_user: dict = Depends(require_admin)):
    database = require_db()
    cursor = database.contact_submissions.find({}).sort("created_at", -1)
    items = await cursor.to_list(length=1000)
    return [ContactSubmission(**serialize_doc(x)) for x in items]


@api_router.get("/admin/submissions/{submission_id}", response_model=ContactSubmission)
async def get_submission(submission_id: str, _user: dict = Depends(require_admin)):
    database = require_db()
    doc = await database.contact_submissions.find_one({"id": submission_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return ContactSubmission(**serialize_doc(doc))


@api_router.patch("/admin/submissions/{submission_id}", response_model=ContactSubmission)
async def update_submission_status(submission_id: str, body: StatusUpdateRequest, _user: dict = Depends(require_admin)):
    database = require_db()
    allowed = {"new", "read", "replied", "archived"}
    if body.status not in allowed:
        raise HTTPException(status_code=400, detail=f"status must be one of {sorted(allowed)}")
    doc = await database.contact_submissions.find_one_and_update(
        {"id": submission_id},
        {"$set": {"status": body.status}},
        return_document=True,
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return ContactSubmission(**serialize_doc(doc))


@api_router.delete("/admin/submissions/{submission_id}")
async def delete_submission(submission_id: str, _user: dict = Depends(require_admin)):
    database = require_db()
    result = await database.contact_submissions.delete_one({"id": submission_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": True}


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client is not None:
        client.close()
