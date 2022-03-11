# Express, MariaDB, Rest API
Restful CRUD API for property management/lodging application.

## Setup
1. Clone the repository.
2. Connect to MariaDB database.
3. Build and run application with npm.

## REST API
    GET /cities/
    GET /guests/
    GET /hosts/
    GET /properties/
    GET /reservations/
    GET /properties/:city_id
    PUSH /properties/:capacity, :price_per_night, :city_unique_id, :style, :host_unique_id, :street_address_property
