const {pool} = require("../dbcon");

// Retrieve all properties
async function retrieveProperties() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Properties");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Retrieve a property
async function retrieveProperty( city_unique_id ) {
    let conn;
    try {
        let sql = "SELECT * FROM Properties WHERE city_unique_id = ?";
        let inserts = [city_unique_id];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a property
async function createProperty( capacity, price_per_night, city_unique_id,
    style, host_unique_id, street_address_property ) {
    let conn;
    try {
        let sql = "INSERT INTO Properties(capacity, price_per_night, city_unique_id, style, host_unique_id, street_address_property) VALUES (?, ?, ?, ?, ?, ?)";
        let inserts = [capacity, price_per_night, city_unique_id,
            style, host_unique_id, street_address_property];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveProperties= retrieveProperties;
exports.retrieveProperty = retrieveProperty;
exports.createProperty = createProperty;
