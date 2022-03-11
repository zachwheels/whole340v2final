const express = require('express')
const {retrieveCities, createCity} = require("../models/cities_model");
const {retrieveGuests, createGuest, updatePhoneNumber, deleteGuest} = require("../models/guests_model");
const {retrieveHosts, createHost} = require("../models/hosts_model");
const {retrieveProperties, retrieveProperty, createProperty} = require("../models/properties_model");
const {retrieveReservations, createReservation} = require("../models/reservations_model");
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const { retrieveGuestreviews, createGuestReview } = require('../models/guestreviews_model');
const app = express();
const port = 3000;
app.use(express.static('public'))

// Express.json middleware required for a REST API
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));

// RETRIEVE OPERATIONS
/**
 * Retrieve all cities in the collection.
 */
app.get('/cities', (req, res) => {
    retrieveCities()
        .then(cities => {
            res.status(200).json(cities);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all guests in the collection.
 */
app.get('/guests', (req, res) => {
    retrieveGuests()
        .then(guests => {
            res.status(200).json(guests);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all hosts in the collection.
 */
app.get('/hosts', (req, res) => {
    retrieveHosts()
        .then(hosts => {
            res.status(200).json(hosts);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all properties in the collection.
 */
app.get('/properties', (req, res) => {
    retrieveProperties()
        .then(properties => {
            res.status(200).json(properties);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all reservations in the collection.
 */
app.get('/reservations', (req, res) => {
    retrieveReservations()
        .then(reservations => {
            res.status(200).json(reservations);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.get('/guestreviews', (req, res) => {
    retrieveGuestreviews()
        .then(guestreviews => {
            res.status(200).json(guestreviews);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve a property in the collection.
 */
 app.get('/properties/:_city_unique_id', (req, res) => {
     // Initialize condition parameter/selection criteria/filter condition
     retrieveProperty( req.params['_city_unique_id'] )
        .then(property => {
            res.status(200).json(property);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

// CREATE OPERATIONS
/**
 * Create a property in the collection.
 */
app.post('/properties', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createProperty(req.body.capacity, req.body.price_per_night, req.body.city_unique_id,
                    req.body.style, req.body.host_unique_id, req.body.street_address_property)
        .then(property => {
            res.status(201).json(property);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.post('/cities', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createCity(req.body.name, req.body.state, req.body.number_of_properties)
        .then(cities => {
            res.status(201).json(cities);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.post('/guests', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createGuest(req.body.phone_number, req.body.name, req.body.address_of_guest,
                req.body.email)
        .then(guest => {
            res.status(201).json(guest);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.post('/hosts', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createHost(req.body.name, req.body.phone_number, req.body.email,
        req.body.address_of_host)
        .then(host => {
            res.status(201).json(host);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.post('/reservations', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createReservation(req.body.guest_unique_id, req.body.total_price, req.body.property_unique_id,
        req.body.date_arrive, req.body.date_leave)
        .then(reservations => {
            res.status(201).json(reservations);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.post('/guestreviews', (req, res) => {
    // Initialize condition parameter/selection criteria/filter condition
    createGuestReview(req.body.review, req.body.property_unique_id, req.body.guest_unique_id)
        .then(guestreview => {
            res.status(201).json(guestreview);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});


// UPDATE OPERATIONS
/**
 * Update a guest's phone number in the collection.
 */
app.put('/guests/:_guest_unique_id', (req, res) => {
    // Initialize condition parameter/user object to be modified
    let updated_condition = {"_guest_unique_id": req.params._guest_unique_id};  // specify id of the document to be updated
    let property_to_updated = {};  // add properties to be updated
    if (req.body.phone_number !== undefined) {
        property_to_updated.phone_number = req.body.phone_number // Get new phone_number value from req boy
    }
    // Call update CRUD function in model layer
    updatePhoneNumber( updated_condition, property_to_updated )
        .then(phoneNumberUpdated => {
            if (phoneNumberUpdated === 1) {
            res.status(200).send();
            res.json({_guest_unique_id: req.params._guest_unique_id, phone_number: req.body.phone_number,
                name: req.body.name, address_of_guest: req.body.address_of_guest,
                email: req.body.email});
        } else {
                res.status(500).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

// DELETE Operations
/**
 * Delete a guest with the provided id.
 */
app.delete('/guests/:_guest_unique_id', (req, res) => {
    deleteGuest(req.params._guest_unique_id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
