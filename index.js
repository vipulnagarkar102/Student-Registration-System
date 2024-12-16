const studentName = document.getElementById('studentName');
const studentId = document.getElementById('studentId');
const studentClass = document.getElementById('studentClass');
const studentAddress = document.getElementById('studentAddress');
const studentContact = document.getElementById('studentContact');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentTableBody = document.getElementById('studentTableBody');

// Load data from localStorage
document.addEventListener('DOMContentLoaded', loadStudents);

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentRow(student));
}

function saveStudents() {
    const rows = document.querySelectorAll('#studentTableBody tr');
    const students = [];
    rows.forEach(row => {
        const student = {
            id: row.cells[0].innerText,
            name: row.cells[1].innerText,
            class: row.cells[2].innerText,
            address: row.cells[3].innerText,
            contact: row.cells[4].innerText
        };
        students.push(student);
    });
    localStorage.setItem('students', JSON.stringify(students));
}

function addStudentRow(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.address}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(this)">Edit</button>
                    <button onclick="deleteStudent(this)">Delete</button>
                </td>
            `;
    studentTableBody.appendChild(row);
}

addStudentBtn.addEventListener('click', () => {
    const id = studentId.value.trim();
    const name = studentName.value.trim();
    const cls = studentClass.value.trim();
    const address = studentAddress.value.trim();
    const contact = studentContact.value.trim();

    if (!id || !name || !cls || !address || !contact) {
        alert('All fields are required!');
        return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Name must contain only letters and spaces.');
        return;
    }

    if (!/^[0-9]+$/.test(contact)) {
        alert('Contact must contain only numbers.');
        return;
    }
    if (!/^[0-9]+$/.test(id)) {
        alert('Id must contain only numbers.');
        return;
    }

    const student = { id, name, class: cls, address, contact };
    addStudentRow(student);
    saveStudents();
    studentId.value = '';
    studentName.value = '';
    studentClass.value = '';
    studentAddress.value = '';
    studentContact.value = '';
});

function editStudent(button) {
    const row = button.parentElement.parentElement;
    const cells = row.cells;
    const id = prompt('Edit id:', cells[0].innerText);
    const name = prompt('Edit Name:', cells[1].innerText);
    const cls = prompt('Edit Class:', cells[2].innerText);
    const address = prompt('Edit Address:', cells[3].innerText);
    const contact = prompt('Edit Contact:', cells[4].innerText);

    if (!id || !name || !cls || !address || !contact) {
        alert('All fields are required!');
        return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Name must contain only letters and spaces.');
        return;
    }

    if (!/^[0-9]+$/.test(contact)) {
        alert('Contact must contain only numbers.');
        return;
    }
    cells[0].innerText = id;
    cells[1].innerText = name;
    cells[2].innerText = cls;
    cells[3].innerText = address;
    cells[4].innerText = contact;

    saveStudents();
}

function deleteStudent(button) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = button.parentElement.parentElement;
        row.remove();
        saveStudents();
    }
}
