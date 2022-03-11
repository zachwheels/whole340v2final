const {pool} = require("../dbcon");
async function retrieveHosts() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Hosts");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a host
async function createHost( name, phone_number, email, address_of_host ) {
    let conn;
    try {
        let sql = "INSERT INTO Hosts(name, phone_number, email, address_of_host) VALUES (?, ?, ?, ?)";
        let inserts = [name, phone_number, email, address_of_host];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveHosts= retrieveHosts;
exports.createHost= createHost;