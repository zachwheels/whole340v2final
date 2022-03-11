const {pool} = require("../dbcon");
async function retrieveReservations() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Reservations");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a reservation
async function createReservation( guest_unique_id, total_price, property_unique_id,
                                  date_arrive, date_leave ) {
    let conn;
    try {
        let sql = "INSERT INTO Reservations(guest_unique_id, total_price, property_unique_id,\n" +
            "                                  date_arrive, date_leave) VALUES (?, ?, ?, ?, ?)";
        let inserts = [guest_unique_id, total_price, property_unique_id,
            date_arrive, date_leave];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveReservations = retrieveReservations;
exports.createReservation = createReservation;