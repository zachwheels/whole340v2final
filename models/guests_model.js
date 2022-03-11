const {pool} = require("../dbcon");
async function retrieveGuests() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Guests");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a guest
async function createGuest( phone_number, name, address_of_guest, email ) {
    let conn;
    try {
        let sql = "INSERT INTO Guests(phone_number, name, address_of_guest, email) VALUES (?, ?, ?, ?)";
        let inserts = [phone_number, name, address_of_guest, email];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Update a guest's phone number
async function updatePhoneNumber( update_condition, property_to_updated ) {
    let conn;
    try {
        let sql = "UPDATE Guests SET phone_number = ? WHERE guest_unique_id = ?"
        let inserts = [property_to_updated.phone_number, update_condition._guest_unique_id];
        conn = await pool.getConnection();
        await conn.query(sql, inserts);
        conn.end();
        return 1
    } catch (err) {
        conn.end();
        throw err;
    }
}

// DELETE a guest
async function deleteGuest( guest_unique_id ) {
    let conn;
    try {
        let sql = "DELETE FROM Guests WHERE guest_unique_id = ?"
        let inserts = [guest_unique_id];
        conn = await pool.getConnection();
        await conn.query(sql, inserts);
        conn.end();
        return 1
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveGuests= retrieveGuests;
exports.createGuest= createGuest;
exports.updatePhoneNumber= updatePhoneNumber;
exports.deleteGuest= deleteGuest;
