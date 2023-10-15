// Define the API endpoint for your Node.js backend
const API_URL = 'http://localhost:3000/patients';

// Function to fetch patient data from the backend
async function fetchPatientData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to create a Chart.js chart
function createChart(data) {
    const labels = data.map(patient => patient.name);
    const bodyTemperatures = data.map(patient => patient.body_temperature);
    const heartRates = data.map(patient => patient.heart_rate);

    const ctx = document.getElementById('dataChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Body Temperature',
                    data: bodyTemperatures,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Heart Rate',
                    data: heartRates,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fetch and display patient data
fetchPatientData()
    .then(data => {
        createChart(data);
    });

// Function to handle form submission
document.getElementById('patientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const body_temperature = parseFloat(document.getElementById('body_temperature').value);
    const heart_rate = parseInt(document.getElementById('heart_rate').value);
    const frequent_sickness = document.getElementById('frequent_sickness').checked;

    // POST request to add a new patient
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            body_temperature,
            heart_rate,
            frequent_sickness,
        }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error adding patient');
        }
    })
    .then(() => {
        // After successfully adding a patient, refresh the chart
        return fetchPatientData();
    })
    .then(data => {
        createChart(data);
    })
    .catch(error => {
        console.error('Error adding patient:', error);
    });

    // Clear the form fields
    this.reset();
});
