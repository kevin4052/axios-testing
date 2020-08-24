require("dotenv").config();

const axios = require("axios");
const openTripApiKey = process.env.openTripApiKey;
const mapBoxApiKey = process.env.mapBoxApiKey;

const language = "en";

axios
    .get(`http://api.opentripmap.com/0.1/${language}/places/geoname?name=seattle&apikey=${openTripApiKey}`)
    .then((response) => {
        console.log(response.data);

        const {
            lat,
            lon
        } = response.data;

        axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapBoxApiKey}`)
            .then(mapBoxResponse => console.log(mapBoxResponse.data.features[0].place_name))
            .catch(err => console.log(err));
    })
    .catch((err) => console.log(err));