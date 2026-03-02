const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Spreadsheet ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your Google Sheets API key
const APPOINTMENTS_TAB = 'Appointments';
const SETTINGS_TAB = 'Settings';

document.addEventListener("DOMContentLoaded", () => {
    loadDoctors();
    loadClinics();
    loadDates();
});

function loadDoctors() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Settings?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        let doctors = data.values[1]; // Adjust based on your spreadsheet structure
        let doctorDropdown = document.getElementById('doctorDropdown');
        if (doctors.length > 1) {
            doctorDropdown.innerHTML = `<select onchange="loadDoctorImage(this.value)">${doctors.map(doctor => `<option value="${doctor}">${doctor}</option>`).join('')}</select>`;
        } else {
            doctorDropdown.innerHTML = doctors[0];
            loadDoctorImage(doctors[0]);
        }
    });
}

function loadClinics() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Settings?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        let clinics = data.values[2]; // Adjust based on your spreadsheet structure
        let clinicDropdown = document.getElementById('clinicDropdown');
        clinicDropdown.innerHTML = `<select onchange="updateAddress(this.value)">${clinics.map(clinic => `<option value="${clinic}">${clinic}</option>`).join('')}</select>`;
    });
}

function updateAddress(selectedClinic) {
    // Logic to fetch and display address based on the selected clinic
}

function loadDates() {
    let dateSelect = document.getElementById('dateSelect');
    let today = new Date();
    let options = [
        { text: "Today", value: today.toDateString() },
        { text: "Tomorrow", value: new Date(today.setDate(today.getDate() + 1)).toDateString() },
        { text: "Day After Tomorrow", value: new Date(today.setDate(today.getDate() + 2)).toDateString() },
    ];
    dateSelect.innerHTML = options.map(option => `<option value="${option.value}">${option.text}</option>`).join('');
}

function loadDoctorImage(doctor) {
    // Logic to fetch Doctor's image URL from the Spreadsheet
}

document.getElementById('submitBtn').addEventListener('click', () => {
    // Logic to handle form submission, including token generation
    showPasswordPrompt();
});

function showPasswordPrompt() {
    // Show password prompt on clicking top bar
    document.getElementById('passwordPrompt').style.display = "block";
}

document.getElementById('passwordSubmit').addEventListener('click', () => {
    const password = document.getElementById('adminPassword').value;
    checkPassword(password);
});

function checkPassword(password) {
    // Fetch and compare the password from the spreadsheet
    // Redirect or handle wrong password logic
}
