const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();


let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

// Question 1
app.get('/patients', (req, res) => {
    connection.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Question 2
app.get('/providers', (req, res) => {
    connection.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Question 3
app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name; // Expecting a query parameter, e.g., ?first_name=John
    if (!firstName) {
        return res.status(400).send({ error: 'First name is required' });
    }
    connection.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Question 4
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty; // Expecting a query parameter, e.g., ?specialty=Cardiology
    if (!specialty) {
        return res.status(400).send({ error: 'Specialty is required' });
    }
    connection.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
