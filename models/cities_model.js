const {pool} = require("../dbcon");
async function retrieveCities() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Cities");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a city
async function createCity( name, state, number_of_properties ) {
    let conn;
    try {
        let sql = "INSERT INTO Cities(name, state, number_of_properties) VALUES (?, ?, ?)";
        let inserts = [name, state, number_of_properties];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveCities = retrieveCities;
exports.createCity = createCity;
