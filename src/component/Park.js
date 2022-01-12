import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getParkPost } from '../services/parkPostServices';
// import { useGlobalState } from '../utils/stateContext';
import ParkComment from './ParkComment';
import ParkMakeComment from './ParkMakeComment';


export default function Park() {
  // const {store} = useGlobalState();
  // const { parkPosts } = store;
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const {park_id} = useParams();

  useEffect(() => {
    // getParkPost(parkPosts, id)
    getParkPost(park_id)
      .then(park => setPark(park))
      .catch(error => {
        console.log(error.response)
      })
      .finally(() => setLoading(false)
      )
  }, [park_id])
  // }, [id, parkPosts])

  if(!park) {
    return loading ? (<p>Loading...</p>): (<p>Oops, couldn't find your park.</p>) 
  }

  return (
    <>
      <ul>
        <li>
          <p></p>
          <h4>{park.park_icon} | {park.park_name}</h4>
          <p>address: {park.address_id} || Separation St, Northcote VIC 3070</p>
          <p>feature: {park.feature_id} || picnic, food nearby, nature, skatepark, playground</p>
          <p>⭐️  ⭐️  ⭐️  ⭐️ </p>
        </li>
        <br />
        <li>
          <p>cheese pair: {park.cheese_pair}</p>
          <p>wine pair: {park.wine_pair}</p>
        </li>
        <br />
        <hr />
        <li>
          <h4><strong>List Existing Comments Here</strong></h4>
        </li>
        <li>
          <ParkComment />
        </li>
        <hr />
        <li>
          <ParkMakeComment />
        </li>
        <br />
        <li>
          <strong><Link to="/parks">Back to Park List</Link></strong>
        </li>
      </ul>
    </>
  )
}
