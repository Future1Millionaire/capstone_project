Apartment / PG Complaint Management System
A beginner-friendly full-stack web application for managing complaints raised by residents of apartments and PG accommodations.
Residents can submit complaints, view complaints, search/filter them, check complaint details, update complaint information, change complaint status, and delete/cancel complaints.
Features
Frontend
Complaint submission form
Resident and room/flat details
Complaint category selection
Priority/severity selection
Complaint description
Complaint listing
Search and filter functionality
Complaint status display
Complaint details
Update and delete/cancel controls
Form validation
Success and error messages
Responsive user interface
Backend
Node.js
Express.js
REST API
JSON request/response handling
CORS support
Basic input validation
HTTP status codes
Error handling
CRUD operations for complaints
Technologies Used
HTML5
CSS3
JavaScript
Node.js
Express.js
CORS
REST API
Postman for API testing
> Note: The current version uses local/in-memory data. MongoDB can be added later as a database layer.
Project Structure
```text
capstone_project/
│
├── backend/
│   ├── data/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
Prerequisites
Before running the project, make sure you have:
Node.js installed
npm installed
VS Code or another code editor
Postman for API testing
A modern web browser
Check Node.js and npm:
```bash
node -v
npm -v
```
Installation
1. Clone the repository
```bash
git clone https://github.com/Future1Millionaire/capstone_project.git
```
2. Open the project
```bash
cd capstone_project
```
3. Install dependencies
```bash
npm install
```
If dependencies have not been installed yet, you can also install Express and CORS with:
```bash
npm install express cors
```
Running the Backend
Start the Express server with:
```bash
node backend/server.js
```
If your `server.js` is currently configured to use another port, use the port shown in the terminal.
For example:
```text
Server running on http://localhost:3000
```
Keep this terminal running while using the application.
Running the Frontend
Open the frontend in a browser.
You can use the VS Code Live Server extension:
Open `frontend/index.html`.
Right-click the file.
Select Open with Live Server.
The frontend will open in your browser.
The frontend communicates with the Express backend using JavaScript `fetch()` requests.
API Endpoints
The backend provides the following REST API endpoints.
Method	Endpoint	Purpose
POST	`/api/complaints`	Create a complaint
GET	`/api/complaints`	Get all complaints
GET	`/api/complaints/:id`	Get one complaint
PUT	`/api/complaints/:id`	Update a complaint
DELETE	`/api/complaints/:id`	Delete/cancel a complaint
PATCH	`/api/complaints/:id/status`	Update complaint status
Complaint Information
A complaint can contain:
Resident name
Room/flat number
Contact information
Complaint category
Description
Date
Priority/severity
Status
Additional information
Complaint Categories
Typical categories include:
Electricity
Plumbing
Water Supply
Internet
Housekeeping
Maintenance
Security
Other
Complaint Status
The system can use statuses such as:
Pending
In Progress
Resolved
Cancelled
Testing APIs with Postman
Postman can be used to test the backend independently from the frontend.
GET all complaints
```text
GET http://localhost:3000/api/complaints
```
GET one complaint
```text
GET http://localhost:3000/api/complaints/1
```
POST a complaint
```text
POST http://localhost:3000/api/complaints
```
Select:
Body → raw → JSON
Example:
```json
{
  "residentName": "Rahul",
  "roomNumber": "A-203",
  "contact": "9876543210",
  "category": "Plumbing",
  "description": "Water leakage in bathroom",
  "priority": "High",
  "additionalInfo": "Leak gets worse at night"
}
```
PUT a complaint
```text
PUT http://localhost:3000/api/complaints/1
```
Send the updated complaint information as JSON.
PATCH complaint status
```text
PATCH http://localhost:3000/api/complaints/1/status
```
Example body:
```json
{
  "status": "Resolved"
}
```
DELETE a complaint
```text
DELETE http://localhost:3000/api/complaints/1
```
HTTP Status Codes
The API uses appropriate HTTP status codes, for example:
`200 OK` — Request completed successfully
`201 Created` — Complaint created successfully
`400 Bad Request` — Invalid input
`404 Not Found` — Complaint does not exist
`500 Internal Server Error` — Server-side error
CORS
The backend uses CORS so that the frontend and backend can communicate when they are running on different local origins/ports.
Future Improvements
The project can be extended with:
MongoDB database
User authentication
Admin dashboard
Resident login
Image/file attachments
Email notifications
Complaint assignment to maintenance staff
Complaint history
Advanced filtering
Deployment to a cloud platform
GitHub
Repository:
https://github.com/Future1Millionaire/capstone_project
Author
Capstone Project — Apartment / PG Complaint Management System
