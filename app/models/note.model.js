const mongoose = require('mongoose');

const ResearcherSchema = mongoose.Schema({
    department_name: String,
    researcher_name: String,
    type: String,
    research_content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Department', ResearcherSchema);