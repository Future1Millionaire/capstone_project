const express = require("express");
const cors = require("cors");
const complaints = require("./data/complaints");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to StayFix Complaint Management API"
    });
});

app.get("/api/complaints", (req, res) => {

    res.status(200).json({
        success: true,
        count: complaints.length,
        data: complaints
    });

});

app.post("/api/complaints", (req, res) => {
    const {
        residentName,
        roomNumber,
        contact,
        category,
        description,
        priority
    } = req.body;


    if (!residentName || residentName.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Resident name is required"
        });
    }

    if (!roomNumber || roomNumber.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Room number is required"
        });
    }

    if (!contact || !/^[0-9]{10}$/.test(contact)) {
        return res.status(400).json({
            success: false,
            message: "Contact must contain exactly 10 digits"
        });
    }

    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Complaint category is required"
        });
    }

    if (!description || description.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Complaint description is required"
        });
    }

    if (!priority || !["Low", "Medium", "High"].includes(priority)) {
        return res.status(400).json({
            success: false,
            message: "Priority must be Low, Medium or High"
        });
    }

    const newComplaint = {
        id: complaints.length + 1,
        residentName: residentName,
        roomNumber: roomNumber,
        contact: contact,
        category: category,
        description: description,
        priority: priority,
        status: "Pending",
        date: new Date().toISOString().split("T")[0]
    };

     complaints.push(newComplaint);
     
     res.status(201).json({
        success: true,
        message: "Complaint created successfully",
        data: newComplaint
    });

});

app.get("/api/complaints/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const complaint = complaints.find((item) => item.id === id);

    if (!complaint) {
        return res.status(404).json({
            success: false,
            message: "Complaint not found"
        });
    }

    res.status(200).json({
        success: true,
        data: complaint
    });

});
app.put("/api/complaints/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const complaint = complaints.find((item) => item.id === id);

    if (!complaint) {
        return res.status(404).json({
            success: false,
            message: "Complaint not found"
        });
    }

    const {
        residentName,
        roomNumber,
        contact,
        category,
        description,
        priority
    } = req.body;

    complaint.residentName = residentName;
    complaint.roomNumber = roomNumber;
    complaint.contact = contact;
    complaint.category = category;
    complaint.description = description;
    complaint.priority = priority;

    res.status(200).json({
        success: true,
        message: "Complaint updated successfully",
        data: complaint
    });

});
app.delete("/api/complaints/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const complaintIndex = complaints.findIndex(
        (item) => item.id === id
    );

    if (complaintIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Complaint not found"
        });
    }

    const deletedComplaint = complaints.splice(
        complaintIndex,
        1
    );

    res.status(200).json({
        success: true,
        message: "Complaint deleted successfully",
        data: deletedComplaint[0]
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});