module.exports = (app) => {
    const departments = require('../controllers/note.controller.js');

    // Create a new departments
    app.post('/departments', departments.create);

    // Retrieve all departments
    app.get('/departments', departments.findAll);

    // Retrieve a single departments with departmentName
    app.get('/departments/:departmentName', departments.findOne);

    // Update a departments with departmentName
    app.put('/departments/:departmentName', departments.update);

    // Delete a departments with departmentName
    app.delete('/departments/:departmentName', departments.delete);
}