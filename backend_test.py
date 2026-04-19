#!/usr/bin/env python3
"""
Backend API Testing for sandr.studio
Tests all endpoints including auth, contact submissions, and admin functionality
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class SandrStudioAPITester:
    def __init__(self, base_url: str = "https://quirky-heisenberg-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        self.created_submission_id = None

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                 data: Optional[Dict] = None, headers: Optional[Dict] = None) -> tuple[bool, Any]:
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        
        # Default headers
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)
        
        # Add auth token if available
        if self.token and 'Authorization' not in default_headers:
            default_headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=default_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"status_code": response.status_code, "text": response.text[:200]}

            details = f"Status: {response.status_code} (expected {expected_status})"
            self.log_test(name, success, details, response_data if not success else None)
            
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "health", 200)

    def test_contact_submission(self):
        """Test contact form submission"""
        print("\n🔍 Testing Contact Submission...")
        
        # Valid submission
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "website": "https://test.com",
            "startup_description": "A revolutionary test startup that changes everything",
            "need": "Complete website redesign",
            "problem": "Current site doesn't convert",
            "timeline": "3-6 months",
            "budget": "$50k-100k",
            "desired_feel": "Modern, clean, professional"
        }
        
        success, response = self.run_test("Create Contact Submission", "POST", "contact", 201, contact_data)
        
        if success and response.get('id'):
            self.created_submission_id = response['id']
            print(f"    Created submission ID: {self.created_submission_id}")
        
        # Test missing required field
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing startup_description (required)
        }
        
        self.run_test("Contact Submission - Missing Required Field", "POST", "contact", 422, invalid_data)
        
        # Test invalid email
        invalid_email_data = {
            "name": "Test User",
            "email": "invalid-email",
            "startup_description": "Test description"
        }
        
        self.run_test("Contact Submission - Invalid Email", "POST", "contact", 422, invalid_email_data)

    def test_admin_login(self):
        """Test admin authentication"""
        print("\n🔍 Testing Admin Authentication...")
        
        # Test correct password
        correct_login = {"password": "sandr-admin-2026"}
        success, response = self.run_test("Admin Login - Correct Password", "POST", "admin/login", 200, correct_login)
        
        if success and response.get('token'):
            self.token = response['token']
            print(f"    Received token: {self.token[:20]}...")
        
        # Test incorrect password
        wrong_login = {"password": "wrong-password"}
        self.run_test("Admin Login - Wrong Password", "POST", "admin/login", 401, wrong_login)
        
        # Test empty password
        empty_login = {"password": ""}
        self.run_test("Admin Login - Empty Password", "POST", "admin/login", 401, empty_login)

    def test_admin_protected_endpoints(self):
        """Test admin protected endpoints"""
        print("\n🔍 Testing Admin Protected Endpoints...")
        
        if not self.token:
            print("❌ No admin token available, skipping protected endpoint tests")
            return
        
        # Test admin/me endpoint
        self.run_test("Admin Me - With Token", "GET", "admin/me", 200)
        
        # Test without token
        old_token = self.token
        self.token = None
        self.run_test("Admin Me - Without Token", "GET", "admin/me", 401)
        self.token = old_token
        
        # Test with invalid token
        invalid_headers = {'Authorization': 'Bearer invalid-token-here'}
        self.run_test("Admin Me - Invalid Token", "GET", "admin/me", 401, headers=invalid_headers)

    def test_admin_submissions_crud(self):
        """Test admin CRUD operations on submissions"""
        print("\n🔍 Testing Admin Submissions CRUD...")
        
        if not self.token:
            print("❌ No admin token available, skipping CRUD tests")
            return
        
        # List submissions
        success, response = self.run_test("List Submissions", "GET", "admin/submissions", 200)
        
        if success and isinstance(response, list):
            print(f"    Found {len(response)} submissions")
            
            # If we have submissions, test individual operations
            if response and self.created_submission_id:
                # Get specific submission
                self.run_test("Get Specific Submission", "GET", f"admin/submissions/{self.created_submission_id}", 200)
                
                # Update submission status
                status_update = {"status": "read"}
                self.run_test("Update Submission Status", "PATCH", f"admin/submissions/{self.created_submission_id}", 200, status_update)
                
                # Test invalid status
                invalid_status = {"status": "invalid-status"}
                self.run_test("Update Submission - Invalid Status", "PATCH", f"admin/submissions/{self.created_submission_id}", 400, invalid_status)
                
                # Delete submission (optional - comment out if you want to keep test data)
                # self.run_test("Delete Submission", "DELETE", f"admin/submissions/{self.created_submission_id}", 200)
        
        # Test operations on non-existent submission
        fake_id = "non-existent-id-12345"
        self.run_test("Get Non-existent Submission", "GET", f"admin/submissions/{fake_id}", 404)
        self.run_test("Update Non-existent Submission", "PATCH", f"admin/submissions/{fake_id}", 404, {"status": "read"})
        self.run_test("Delete Non-existent Submission", "DELETE", f"admin/submissions/{fake_id}", 404)

    def test_unauthorized_access(self):
        """Test unauthorized access to protected endpoints"""
        print("\n🔍 Testing Unauthorized Access...")
        
        # Save current token
        old_token = self.token
        self.token = None
        
        # Test all protected endpoints without token
        protected_endpoints = [
            ("GET", "admin/submissions"),
            ("GET", "admin/submissions/test-id"),
            ("PATCH", "admin/submissions/test-id"),
            ("DELETE", "admin/submissions/test-id")
        ]
        
        for method, endpoint in protected_endpoints:
            test_name = f"Unauthorized {method} {endpoint}"
            expected_status = 401  # Should return 401 Unauthorized
            
            if method == "PATCH":
                self.run_test(test_name, method, endpoint, expected_status, {"status": "read"})
            else:
                self.run_test(test_name, method, endpoint, expected_status)
        
        # Restore token
        self.token = old_token

    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting sandr.studio Backend API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run test suites in order
        self.test_health_endpoints()
        self.test_contact_submission()
        self.test_admin_login()
        self.test_admin_protected_endpoints()
        self.test_admin_submissions_crud()
        self.test_unauthorized_access()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("❌ Some tests failed. Check details above.")
            return 1

    def get_test_report(self):
        """Get detailed test report"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_results": self.test_results,
            "created_submission_id": self.created_submission_id
        }

def main():
    """Main test runner"""
    tester = SandrStudioAPITester()
    exit_code = tester.run_all_tests()
    
    # Save detailed report
    report = tester.get_test_report()
    with open('/app/backend_test_report.json', 'w') as f:
        json.dump(report, f, indent=2, default=str)
    
    print(f"\n📄 Detailed report saved to: /app/backend_test_report.json")
    return exit_code

if __name__ == "__main__":
    sys.exit(main())