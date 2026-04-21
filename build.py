from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path


ROOT_DIR = Path(__file__).parent
FRONTEND_DIR = ROOT_DIR / "frontend"
FRONTEND_BUILD_DIR = FRONTEND_DIR / "build"
PUBLIC_DIR = ROOT_DIR / "public"


def run(command: list[str], cwd: Path, env: dict[str, str] | None = None) -> None:
    print(f"Running: {' '.join(command)}")
    subprocess.run(command, cwd=cwd, env=env, check=True)


def main() -> None:
    env = os.environ.copy()
    env["CI"] = "false"

    if not env.get("REACT_APP_BACKEND_URL"):
        env["REACT_APP_BACKEND_URL"] = ""

    install_command = ["npm", "ci", "--legacy-peer-deps"] if (FRONTEND_DIR / "package-lock.json").exists() else ["npm", "install", "--legacy-peer-deps"]
    run(install_command, cwd=FRONTEND_DIR, env=env)
    run(["npm", "run", "build"], cwd=FRONTEND_DIR, env=env)

    if PUBLIC_DIR.exists():
        shutil.rmtree(PUBLIC_DIR)
    shutil.copytree(FRONTEND_BUILD_DIR, PUBLIC_DIR)
    print(f"Copied {FRONTEND_BUILD_DIR} to {PUBLIC_DIR}")


if __name__ == "__main__":
    main()
