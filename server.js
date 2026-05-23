const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('public'));

const filePath = './students.json';

// Read Students
const getStudents = () => {

    const data = fs.readFileSync(filePath);

    return JSON.parse(data);
};

// Save Students
const saveStudents = (students) => {

    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

// GET Students
app.get('/students', (req, res) => {

    res.json(getStudents());
});

// ADD Student
app.post('/students', (req, res) => {

    const students = getStudents();

    const newStudent = {

        id: Date.now(),

        name: req.body.name,

        age: req.body.age,

        course: req.body.course
    };

    students.push(newStudent);

    saveStudents(students);

    res.json(newStudent);
});

// UPDATE Student
app.put('/students/:id', (req, res) => {

    let students = getStudents();

    students = students.map(student => {

        if(student.id == req.params.id) {

            return {
                ...student,
                ...req.body
            };
        }

        return student;
    });

    saveStudents(students);

    res.json({
        message: 'Student Updated Successfully'
    });
});

// DELETE Student
app.delete('/students/:id', (req, res) => {

    let students = getStudents();

    students = students.filter(student => student.id != req.params.id);

    saveStudents(students);

    res.json({
        message: 'Student Deleted Successfully'
    });
});

// Start Server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);
});