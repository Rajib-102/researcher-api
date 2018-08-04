const Department = require('../models/note.model.js');


// Create and Save a new  Department
exports.create = (req, res) => {
    // Validate request
    if (!req.body.research_content) {
        return res.status(400).send({
            message: "Department content can not be empty"
        });
    }

    // Create a Department
    const department = new Department({
        department_name: req.body.department_name,
        researcher_name: req.body.researcher_name,
        type: req.body.type || "Unknown",
        research_content: req.body.research_content
    });

    // Save Department in the database
    department.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Department."
            });
        });
};

// Retrieve and return all departments from the database.
exports.findAll = (req, res) => {
    Department.find()
        .then(departments => {
            res.send(departments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving departments."
            });
        });
};

// Find a single Department with a departmentName
exports.findOne = (req, res) => {
    Department.findById(req.params.departmentName)
        .then(department => {
            if (!department) {
                return res.status(404).send({
                    message: "Department not found with departmentName " + req.params.departmentName
                });
            }
            res.send(department);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Department not found with departmentName " + req.params.departmentName
                });
            }
            return res.status(500).send({
                message: "Error retrieving Department with departmentName " + req.params.departmentName
            });
        });
};

// Update a Department identified by the departmentName in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.research_content) {
        return res.status(400).send({
            message: "Department content can not be empty"
        });
    }

    // Find Department and update it with the request body
    Department.findByIdAndUpdate(req.params.departmentName, {
            department_name: req.body.department_name,
            researcher_name: req.body.researcher_name,
            type: req.body.type || "Unknown",
            research_content: req.body.research_content
        }, { new: true })
        .then(department => {
            if (!department) {
                return res.status(404).send({
                    message: "Department not found with departmentName " + req.params.departmentName
                });
            }
            res.send(department);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Department not found with departmentName " + req.params.departmentName
                });
            }
            return res.status(500).send({
                message: "Error updating Department with departmentName " + req.params.departmentName
            });
        });
};

// Delete a Department with the specified departmentName in the request
exports.delete = (req, res) => {
    Department.findByIdAndRemove(req.params.departmentName)
        .then(department => {
            if (!department) {
                return res.status(404).send({
                    message: "Department not found with id " + req.params.departmentName
                });
            }
            res.send({ message: "Department deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Department not found with DepartmentName " + req.params.departmentName
                });
            }
            return res.status(500).send({
                message: "Could not delete Department with departmentName " + req.params.departmentName
            });
        });
};