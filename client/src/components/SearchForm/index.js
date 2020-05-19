import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_USER_SEARCH, LOADING, UPDATE_LAT_LON, UPDATE_HIKES } from "../../utils/actions";
import DistanceBar from '../DistanceBar';
import "./style.css";
import API from "../../utils/API";
import { Collection } from "mongoose";

const cheerio = require('cheerio');

const SearchForm = () => {
    //user input
    const search_input = useRef();
    // global state and actions
    const [state, dispatch] = useStoreContext();
    // if user search is in state, generate the coordinates
    useEffect(() => {
        if (state.userSearch) {
            generateCoordinates()
            dispatch({
                type: SET_USER_SEARCH,
                userSearch: ""
            });
        };
    }, [state]);

    // if coodinates are in state, load the hikes from rei api
    useEffect(() => {
        if (state.lat) {
            loadHikes();
            dispatch({
                type: UPDATE_LAT_LON,
                lat: "",
                lon: ""
            });
        };
    }, [state]);

    const handleFormSubmit = e => {
        e.preventDefault();
        const searchValue = search_input.current.value;
        dispatch({
            type: SET_USER_SEARCH,
            userSearch: searchValue
        });
        search_input.current.value = "";
        generateCoordinates();
    };

    // takes user search input to convert to lat lon LocationIQ API 
    const generateCoordinates = () => {
        API.getLocation(state.userSearch)
            .then((res) => {
                console.log(res.data[0].lat, res.data[0].lon);
                let lat = parseFloat(res.data[0].lat).toFixed(3);
                let lon = parseFloat(res.data[0].lon).toFixed(3);
                dispatch({
                    type: UPDATE_LAT_LON,
                    lat: lat,
                    lon: lon
                })
            })
            .catch((err) => console.log(err));
    };
    // Takes converted lat and lon to make REI API call to gather hike data
    const loadHikes = () => {
        API.getTrails(state.lat, state.lon)
            .then((trails) => {
                let hikeResults = trails.data.trails
                getMoreInfo(hikeResults);
            })
            .catch(err => console.log(err));
    };

    const getMoreInfo = (hikeResults) => {
        let hikesWithDetails = []
            hikeResults.map((hike, i) => {
                API.getDetails(hike.url)
                    .then((res) => {
                        const $ = cheerio.load(res.data);
                        let type = $('.mb-quarter').html();
                        let summary = $('h3:contains("Description")').next().text();
                        let hikeData = { ...hike,  trailType : type, description : summary };
                        hikesWithDetails.push(hikeData);
                    })
                    .then(() => {
                        console.log(hikesWithDetails);
                        dispatch({
                            type: UPDATE_HIKES,
                            hikes: hikesWithDetails
                        });
                    })
                    .catch(err => console.log(err));
            });
    };

    return (
        <div class="search-area">
            <form className="searchForm" onSubmit={handleFormSubmit}>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-success"
                            ref={search_input}
                            type="text"
                            placeholder="Where is the next adventure?"
                            id="location"
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-tree"></i>
                        </span>

                    </p><button id="searchButton" className="button is-success is-light" type="submit" disabled={state.loading}>
                        Search</button>


                </div>
            </form>
        </div>

    )
}

export default SearchForm;
