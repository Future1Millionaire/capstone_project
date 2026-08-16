const complaintForm = document.getElementById("complaintForm");
const residentName = document.getElementById("residentName");
const roomNumber = document.getElementById("roomNumber");
const contact = document.getElementById("contact");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const description = document.getElementById("description");
const complaintList = document.getElementById("complaintList");
const message = document.getElementById("message");
const totalComplaints = document.getElementById("totalComplaints");
const pendingComplaints = document.getElementById("pendingComplaints");
const progressComplaints = document.getElementById("progressComplaints");
const resolvedComplaints = document.getElementById("resolvedComplaints");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

let complaints = [];

const API_URL = "http://localhost:5000/api/complaints";

async function getComplaints() {

    try {

        const response = await fetch(API_URL);
         const result = await response.json();
        if (!response.ok) {
            throw new Error("Failed to load complaints");
        }

        complaints = result.data;

        displayComplaints(complaints);

        updateDashboard();

    } catch (error) {

        console.log("Error:", error);

        complaintList.innerHTML = `
            <p>Unable to load complaints.</p>
        `;
    }
}

function displayComplaints(data) {

    complaintList.innerHTML = "";

    if (data.length === 0) {

        complaintList.innerHTML = `
            <p>No complaints found.</p>
        `;

        return;
    }

    data.forEach(function (complaint) {

        const card = document.createElement("div");

        card.className = "complaint-card";

        card.innerHTML = `
            <div class="complaint-header">

                <h3>${complaint.category}</h3>

                <strong>${complaint.priority}</strong>

            </div>

            <p>
                <strong>Resident:</strong>
                ${complaint.residentName}
            </p>

            <p>
                <strong>Room:</strong>
                ${complaint.roomNumber}
            </p>

            <p>
                <strong>Description:</strong>
                ${complaint.description}
            </p>

            <p>
                <strong>Status:</strong>
                ${complaint.status}
            </p>

            
        `;

        complaintList.appendChild(card);

    });

}

function updateDashboard() {

    totalComplaints.textContent = complaints.length;

    const pending = complaints.filter(function (complaint) {
        return complaint.status === "Pending";
    });

    const inProgress = complaints.filter(function (complaint) {
        return complaint.status === "In Progress";
    });

    const resolved = complaints.filter(function (complaint) {
        return complaint.status === "Resolved";
    });


    pendingComplaints.textContent = pending.length;

    progressComplaints.textContent = inProgress.length;

    resolvedComplaints.textContent = resolved.length;
}
function filterComplaints() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const selectedStatus = statusFilter.value;


    const filteredComplaints = complaints.filter(function (complaint) {

        const matchesSearch =
            complaint.residentName.toLowerCase().includes(searchText) ||
            complaint.roomNumber.toLowerCase().includes(searchText) ||
            complaint.description.toLowerCase().includes(searchText);


        const matchesCategory =
            selectedCategory === "All" ||
            complaint.category === selectedCategory;


        const matchesStatus =
            selectedStatus === "All" ||
            complaint.status === selectedStatus;



        return matchesSearch &&
            matchesCategory &&
            matchesStatus;

    });

    displayComplaints(filteredComplaints);
}

searchInput.addEventListener("input", filterComplaints);

categoryFilter.addEventListener("change", filterComplaints);

statusFilter.addEventListener("change", filterComplaints);

complaintForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nameValue = residentName.value.trim();
    const roomValue = roomNumber.value.trim();
    const contactValue = contact.value.trim();
    const categoryValue = category.value;
    const priorityValue = priority.value;
    const descriptionValue = description.value.trim();

    if (nameValue === "") {

        message.textContent = "Please enter your name.";

        return;
    }


    if (roomValue === "") {

        message.textContent = "Please enter your room number.";

        return;
    }


    if (!/^[0-9]{10}$/.test(contactValue)) {

        message.textContent =
            "Please enter a valid 10 digit contact number.";

        return;
    }


    if (categoryValue === "") {

        message.textContent =
            "Please select a complaint category.";

        return;
    }


    if (priorityValue === "") {

        message.textContent =
            "Please select a priority.";

        return;
    }


    if (descriptionValue === "") {

        message.textContent =
            "Please describe your complaint.";

        return;
    }

    const newComplaint = {

        residentName: nameValue,

        roomNumber: roomValue,

        contact: contactValue,

        category: categoryValue,

        description: descriptionValue,

        priority: priorityValue

    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newComplaint)

        });


        const result = await response.json();


        if (!response.ok) {

            message.textContent = result.message;

            return;
        }

        complaints.push(result.data);


        displayComplaints(complaints);

        updateDashboard();


        message.textContent =
            "Complaint submitted successfully!";

        complaintForm.reset();


    } catch (error) {

        console.log("Error:", error);

        message.textContent =
            "Unable to connect to the server.";

    }


    message.textContent =
        "Complaint submitted successfully!";

    complaintForm.reset();

});

getComplaints();