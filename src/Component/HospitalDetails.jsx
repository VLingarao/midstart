import React ,{useEffect,useState}  from 'react'
import { Row,Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import '../App.css';

export default function HospitalDetails() {
  const location = useLocation();
  const {name,formatted,lon,lat,categories,state,county,} = location.state;
  const [latLng,setLatLng]=useState({});
  const [address , setAddress]=useState([]);
  const [Direction,setDirection]=useState([]);

  useEffect(()=>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatLng({
          lat:position.coords.latitude,
          lng:position.coords.longitude,
        })
      })
    }
  },[])

  useEffect(()=>{
   
      const ADDRESS_API=`https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json&apiKey=9fff822558234b2588a168e4b80806c2`;
      axios.get(ADDRESS_API).then((response)=>{
      const result = response.data.results;
      const addArr=[];
      result.map((m)=>addArr.push(m.formatted));
      setAddress(addArr);
    })
    .catch((error) => {
      console.log(error);
    });
  },[latLng])




  useEffect(()=>{
    const Direction_Api=`https://api.geoapify.com/v1/routing?waypoints=${latLng.lat},${latLng.lng}|${lat},${lon}&mode=light_truck&apiKey=9fff822558234b2588a168e4b80806c2`;
    axios.get(Direction_Api).then((response)=>{
      const direction = response.data.features;
      const directArr = [];
      direction.map((feature)=>{directArr.push(feature.properties)});   
      setDirection(directArr);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[latLng.lat])


  return (
    <div style={{padding:50}}>
      <Row>
        <Col style={{border: '1px solid gray',borderRadius:'10px', margin:5}}>
  
          <div style={{margin:10,fontSize:50}}> {name} <hr className='h'/></div>
          <div style={{margin:10}}>
             <b style={{nargin:10,fontSize:20}}>User Langitude: </b> {latLng.lng}
             <br />
             <b style={{nargin:10,fontSize:20}}>User Latitute: </b>  {latLng.lat}
            <br />
             <b style={{nargin:10,fontSize:20}}>User Formatted Address: </b>
             <div>
              {address.map((d)=>
              {
              return(
                <div>
                 {d}
                </div>
              )
              })}</div>
          </div>< hr className='h' />

          <div style={{margin:10}}>
             <b style={{nargin:10,fontSize:20}}> Hospital Langitude: </b> {lon}
             <br />
             <b style={{nargin:10,fontSize:20}}>Hospital Latitute: </b>  {lat}
            <br />
             <b style={{nargin:10,fontSize:20}}>Hospital Formatted Address:  </b> <h6>{formatted}</h6>
          </div>< hr className='h' />
          <div style={{margin:10}}>
            <b style={{nargin:10,fontSize:20}}>  Hospital Website :  </b> {categories}
            <br />
            <b  style={{nargin:10,fontSize:20}}>  State : </b>{state}
            <br/>
            <b style={{nargin:10,fontSize:20}}> City : </b>{county}

          </div>
        </Col>
        <Col style={{border: '1px solid gray',borderRadius:'10px', margin:5}}>
           <b>Direction to {name}-</b>  
          <div>
                {Direction.map((v,index)=>{
                    return(
                      <div key={index}>
                          {v.legs[0].steps.map((f)=>{
                            return(
                                <ul>
                                  <li>{f.instruction.text}</li>
                                </ul> 
                            )
                          })}
                      </div>
                    )
                  })
                }
              </div>
        </Col>
      </Row>
    </div>
  )
}
