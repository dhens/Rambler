import axios from "axios";
export default {
    getLocation: function(searchLocation) {
        return axios.get("https://us1.locationiq.com/v1/search.php?key=" + process.env.REACT_APP_LOCATION_API_KEY + "&q=" + searchLocation + "&format=json")
    },
    getTrails: function(lat, lon) {
        return axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=" + process.env.REACT_APP_REI_API_KEY)
    },
    getBucketList: function(id) {
        return axios.get("/rambler/bucketlist/" + id);
    },
    addToBucketList: function(id, bucketListHike) {
        return axios.put('/api/user/' + id, bucketListHike)
    }
}