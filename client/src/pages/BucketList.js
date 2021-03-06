import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_BUCKETLIST } from "../utils/actions";
import API from '../utils/API';
import BucketResults from "../components/BucketResults";
import takeAHike from "../assets/takeAHike.png";
import bucket from "../assets/bucket.jpg";

function BucketList() {
    const [state, dispatch] = useStoreContext();
    // on page load get the database data for user bucketlist
    useEffect(() => {
        generateBucketListData();
    }, []);
    // gets bucketlist for user from mondodb
    const generateBucketListData = () => {
        API.getUserList(state.googleId)
            .then((hikes) => {
                let bucketListHikes = hikes.data.bucketlist
                dispatch({
                    type: UPDATE_BUCKETLIST,
                    bucketList: bucketListHikes
                });
            })
            .catch(err => console.log(err));
    };
// if user has nothing in bucket list display go hike! image
    return (
        (state.bucketList.length > 0) 
        ? 
        <div>
            <img id="bucketListImage" src={bucket} />
            <BucketResults />
        </div>
        :
        <div>
        <h2>Add some hikes to your Bucket List!</h2>
        <div className="take-a-hike-img">
            <img id="emptyLog" src={takeAHike} />
        </div>        
        </div>
    );
};

export default BucketList;
