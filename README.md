# StayFix – Apartment / PG Complaint Management System

StayFix is a simple full-stack web application that helps apartment and PG residents submit, view, search, and manage maintenance complaints.

## Features

- Submit a new complaint
- View submitted complaints
- View complaint details
- Search complaints
- Filter complaints by category and status
- Validate form inputs
- Track complaint status
- REST API for complaint management
- API testing using Postman
- Responsive user interface

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST API
- JSON

### Testing
- Postman

## Project Structure
'''text
StayFix/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
   ├── index.html
   ├── style.css
   └── script.js
'''text
### 3. Install Backend Dependencies

Open the terminal and run:

    cd backend
    npm install

### 4. Start the Backend Server

Run:

    node server.js

The backend server will start at:

    http://localhost:5000

### 5. Open the Frontend

Open the `frontend` folder and open:

    index.html

You can also use **Live Server** in VS Code to run the frontend.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/complaints` | Get all complaints |
| GET | `/api/complaints/:id` | Get a specific complaint |
| POST | `/api/complaints` | Create a new complaint |
| PUT | `/api/complaints/:id` | Update a complaint |
| DELETE | `/api/complaints/:id` | Delete a complaint |

## API Testing

The APIs are tested using **Postman**.

## Data Storage

The current version uses an in-memory JavaScript array to store complaints.

MongoDB can be integrated in the future for permanent data storage.

## Author

**Vandith Kottary**
