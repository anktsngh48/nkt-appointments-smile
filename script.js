const APP_SCRIPT_URL = 'YOUR_WEB_APP_URL'; // Replace with your Web App URL

async function loadDoctors() {
    const response = await fetch(`${https://script.google.com/macros/s/AKfycbyV40zpSMj4Vn653zzHJYOmw6q_1D1i4mnv94MWkzu_Rdke7udyEMxDUeNY2TqPwgm3EA/exec}/getDoctors`);
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
    const response = await fetch(`${APP_SCRIPT_URL}/getClinics`);
    const clinics = await response.json();
    let clinicDropdown = document.getElementById('clinicDropdown');
    clinicDropdown.innerHTML = `<select onchange="updateAddress(this.value)">${clinics.map(clinic => `<option value="${clinic}">${clinic}</option>`).join('')}</select>`;
}

async function updateAddress(selectedClinic) {
    const response = await fetch(`${APP_SCRIPT_URL}/getAddress?clinicName=${selectedClinic}`);
    const address = await response.text(); // Assuming the return value is a text address
    document.getElementById('addressDisplay').innerText = address;
}
