import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getAPark } from '../services/parkPostServices';
import { useGlobalState } from '../config/store';
import ParkComment from './ParkComment';
import ParkMakeComment from './ParkMakeComment';
import wine from '../data/wine';
import cheese from '../data/cheese';


export const ParkPost = (props) => {
  const {store} = useGlobalState();
  // const { parkPosts } = store;
  const [park, setPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const {signedInUser} = store;

  useEffect(() => {
    // getAPark(parkPosts, id)
    getAPark(id)
      .then(park => setPark(park))
      .catch(error => {
        console.log(error.response)
      })
      .finally(() => setLoading(false)
      )
  }, [id])
  // }, [id, parkPosts])

  if(!park) {
    return loading ? (<p>Loading...</p>): (<p>Oops, couldn't find your park.</p>) 
  }

  return (
    <>
      <div className='list-container'>
          <ul>
          <li>
            <p></p>
            <h4 style={{fontWeight: "bold", fontSize: "30px"}}>{park.park_icon} {park.name}</h4>
            <p>Address: {park.address.number ? park.address.number : null} {park.address.street}, {park.address.suburb}, {park.address.postcode}</p>
            <p>Coords: {park.latitude}, {park.longitude}</p>
            <p>Category: {park.category.name}</p>
            <p>Feature: {park.feature.name}, toilets, cafe near by</p>
          </li>
          <br />
          <li>
            <h4>Pair your picnic with...</h4>
            <p>Cheese pair: {cheese[Math.floor(Math.random()*cheese.length)]}</p>
            <p>Wine pair: {wine[Math.floor(Math.random()*wine.length)]}</p>
          </li>
          <br />
          <hr />
          {/* <li>
            <h4><strong>List Existing Comments Here</strong></h4>
          </li> */}
          <li>
            <ParkComment />
          </li>
          <hr />
          <li>
            {signedInUser ? (<ParkMakeComment />) : (<p>Log in to make a comment</p>)}
            
          </li>
          <br />
          <li>
            <strong><Link to="/parks">Back to Park List</Link></strong>
          </li>
        </ul>
      </div>
    </>
  )
}
