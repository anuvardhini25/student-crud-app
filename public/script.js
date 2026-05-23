const API_URL = 'http://localhost:3000/students';

// Fetch Students
async function fetchStudents() {

    const response = await fetch(API_URL);

    const students = await response.json();

    const studentList = document.getElementById('studentList');

    studentList.innerHTML = '';

    students.forEach(student => {

        studentList.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.age}</td>

                <td>${student.course}</td>

                <td>${student.phone}</td>

                <td>

                    <button class="action-btn edit-btn"
                        onclick="editStudent('${student.id}', '${student.name}', '${student.age}', '${student.course}', '${student.phone}')">
                        Edit
                    </button>

                    <button class="action-btn delete-btn"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}

// Save Student
async function saveStudent() {

    const hiddenId = document.getElementById('studentHiddenId').value;

    const studentId = document.getElementById('studentId').value;

    const name = document.getElementById('name').value;

    const age = document.getElementById('age').value;

    const course = document.getElementById('course').value;

    const phone = document.getElementById('phone').value;

    // Validation
    if(studentId === '' || name === '' || age === '' || course === '' || phone === '') {

        alert('Please fill all fields');

        return;
    }

    const studentData = {

        id: studentId,

        name,

        age,

        course,

        phone
    };

    // UPDATE
    if(hiddenId) {

        await fetch(`${API_URL}/${hiddenId}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(studentData)
        });

    } else {

        // CREATE
        await fetch(API_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(studentData)
        });
    }

    clearForm();

    fetchStudents();
}

// Edit Student
function editStudent(id, name, age, course, phone) {

    document.getElementById('studentHiddenId').value = id;

    document.getElementById('studentId').value = id;

    document.getElementById('name').value = name;

    document.getElementById('age').value = age;

    document.getElementById('course').value = course;

    document.getElementById('phone').value = phone;
}

// Delete Student
async function deleteStudent(id) {

    const confirmDelete = confirm('Are you sure you want to delete this student?');

    if(confirmDelete) {

        await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'
        });

        fetchStudents();
    }
}

// Clear Form
function clearForm() {

    document.getElementById('studentHiddenId').value = '';

    document.getElementById('studentId').value = '';

    document.getElementById('name').value = '';

    document.getElementById('age').value = '';

    document.getElementById('course').value = '';

    document.getElementById('phone').value = '';
}

// Initial Load
fetchStudents();