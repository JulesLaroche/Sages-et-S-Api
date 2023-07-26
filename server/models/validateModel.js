const connection = require('../config/database');

const addValidation = (service_id, user_id, participant_id, callback) => {
    const query = 'INSERT INTO validate (service_id, user_id, participant_id, validated) VALUES (?, ?, ?, ?)';
    connection.query(query, [service_id, user_id, participant_id, true], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getServiceValidations = (service_id, callback) => {
    const query = 'SELECT * FROM validate WHERE service_id = ?';
    connection.query(query, [service_id], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

module.exports = {
    addValidation,
    getServiceValidations,
};
