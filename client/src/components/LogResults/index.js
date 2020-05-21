import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import { REMOVE_LOG, SET_CURRENT_HIKE } from "../../utils/actions";

function LogResults() {
    const [state, dispatch] = useStoreContext();

    const removeHike = (hikeToRemoveID, hikeToRemove ) => {
        API.removeLogHike(state.googleId, hikeToRemove)
            .then(() => {
                dispatch({
                    type: REMOVE_LOG,
                    log: hikeToRemoveID
                });
            })
            .catch(err => console.log(err));
    };

    const setCurrentHike = (hike) => {
        console.log(hike);
        dispatch({
            type: SET_CURRENT_HIKE,
            currentHike: hike
        });
    };

    return (
        <div>
            <ul className="hikeResultList cards">
                {state.log.length > 0 && state.log.map((hike, index) => (
                    <li key={index} className="hikeListItem cards_item">
                        <div className="card">
                            <div className="card_image">
                                <img className="card-img-top" src={hike.img} alt={hike.name} />
                            </div>
                            <div className="card_content is-centered">
                                <h2 className="card_title">{hike.name}</h2>
                                <p className="card_text">Location: {hike.location} </p>
                                <p className="card_text">Distance: {hike.length} miles</p>
                                <p className="card_text">Elevation Gain: {hike.ascent} feet</p>
                                <Link to={"/hike_details/" + hike.id}><button className="btn card_btn bucketlist-add" 
                                onClick={() => {setCurrentHike( 
                                    {
                                        id: hike.id, 
                                        name: hike.name, 
                                        location: hike.location,  
                                        latitude: hike.latitude,
                                        longitude: hike.longitude,
                                        length: hike.length, 
                                        ascent: hike.ascent, 
                                        img: hike.img,
                                        summary: hike.summary,
                                        url: hike.url,
                                        trailType: hike.trailType,
                                        description: hike.description
                                    }
                                )}}>Details</button></Link>
                                <button className="btn card_btn remove-hike" onClick={() => removeHike(hike.id, hike)
                                }> Remove Hike </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default LogResults;

