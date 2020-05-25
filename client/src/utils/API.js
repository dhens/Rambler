import axios from "axios";
export default {
    //location iq for lat/lon
    getLocation: function(searchLocation) {
        return axios.get("https://us1.locationiq.com/v1/search.php?key=" + process.env.REACT_APP_LOCATION_API_KEY + "&q=" + searchLocation + "&format=json")
    },
    // rei api for hike data
    getTrails: function(lat, lon, maxDistance, maxResults) {
        return axios.get("https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&maxResults=" + maxResults + "&key=" + process.env.REACT_APP_REI_API_KEY)
    },
    // openweather for hike detail weather forecast
    getWeather: function(lat, lon) {
        return axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + process.env.REACT_APP_OPENWEATHER_API_KEY)
    },
    getUserList: function(id) {
        return axios.get("/api/user/" + id);
    },
    addToBucketList: function(id, bucketListHike) {
        return axios.put('/api/user/bucketlist/' + id, bucketListHike)
    }, 
    removeBucketlistHike: function(id, hikeToRemove) {
        return axios.put("/api/user/bucketlist/remove/" + id, hikeToRemove);
    },
    addToLog: function(id, logHike) {
        return axios.put('/api/user/log/' + id, logHike)
    },
    removeLogHike: function(id, hikeToRemove) {
        return axios.put("/api/user/log/remove/" + id, hikeToRemove);
    },
    getDetails: function(url) {
        return axios.get(url);
    }
};