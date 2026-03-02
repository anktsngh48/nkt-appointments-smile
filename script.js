const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxOl7D232cMb3ZPW2GrKco_m7Cxz_cToR_BbOMffxPp-GqrVRkGOX7X33CqpIjuUZ475w/exec';  // Replace with your Web App URL

async function loadDoctors() {
    const response = await fetch(`${APP_SCRIPT_URL}?action=getDoctors`);
    const doctors = await response.json();
    let doctorDropdown = document.getElementById('doctorDropdown');

    if (doctors.length > 1) {
        doctorDropdown.innerHTML = `<select onchange="loadDoctorImage(this.value)">${doctors.map(doctor => `<option value="${doctor}">${doctor}</option>`).join('')}</select>`;
    } else {
        doctorDropdown.innerHTML = doctors[0];
        loadDoctorImage(doctors[0]);
    }
}

async function loadClinics() {
    const response = await fetch(`${APP_SCRIPT_URL}?action=getClinics`);
    const clinics = await response.json();
    let clinicDropdown = document.getElementById('clinicDropdown');
    clinicDropdown.innerHTML = `<select onchange="updateAddress(this.value)">${clinics.map(clinic => `<option value="${clinic}">${clinic}</option>`).join('')}</select>`;
}

async function updateAddress(selectedClinic) {
    const response = await fetch(`${APP_SCRIPT_URL}?action=getAddress&clinicName=${selectedClinic}`);
    const address = await response.text(); 
    document.getElementById('addressDisplay').innerText = address;
}
