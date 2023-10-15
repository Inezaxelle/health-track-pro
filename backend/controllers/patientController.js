const Patient = require('../models/patientModel');

const PatientController = {
  createPatient: (req, res) => {
    const patient = req.body;
    Patient.create(patient, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error creating patient' });
      } else {
        res.status(201).json({ message: 'Patient created successfully' });
      }
    });
  },
  getAllPatients: (req, res) => {
    Patient.getAll((err, patients) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching patients' });
      } else {
        res.json(patients);
      }
    });
  },
};

module.exports = PatientController;
