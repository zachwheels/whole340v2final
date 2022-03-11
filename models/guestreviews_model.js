const {pool} = require("../dbcon");
async function retrieveGuestreviews() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM Guest_Reviews");
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

// Create a guest review
async function createGuestReview( review, property_unique_id, guest_unique_id ) {
    let conn;
    try {
        let sql = "INSERT INTO Guest_Reviews(reviews, property_unique_id, guest_unique_id) VALUES (?, ?, ?)";
        let inserts = [review, property_unique_id, guest_unique_id];
        conn = await pool.getConnection();
        const rows = await conn.query(sql, inserts);
        conn.end();
        return rows
    } catch (err) {
        conn.end();
        throw err;
    }
}

exports.retrieveGuestreviews = retrieveGuestreviews;
exports.createGuestReview = createGuestReview;