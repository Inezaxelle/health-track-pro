const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController');

// Create a new patient
router.post('/patients', PatientController.createPatient);

// List all patients
router.get('/patients', PatientController.getAllPatients);

module.exports = router;
