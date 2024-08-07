import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';


export default function Home(){
  const [place, setPlace]=useState([]);
  const [latLng,setLatLng]=useState({});
  const navigate = useNavigate();
  
  useEffect(()=>{
    if('geolocation' in navigator){
          navigator.geolocation.getCurrentPosition((position)=>{
            setLatLng({
              lat:position.coords.latitude,
              lng:position.coords.longitude,
            });
            console.log(latLng);
          })
              
        }   
  },[])

  useEffect(()=>{
        
        const hospital =`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.5154568,17.5330679&limit=20&apiKey=9fff822558234b2588a168e4b80806c2`;
        
        axios.get(hospital).then((resp)=>{
        const featuresArr=resp.data.features;
        const names =[];
        featuresArr.map((feature)=>names.push(feature.properties));
        setPlace(names);
      })
      .catch((error) => {
        console.log(error);
    });
  },[latLng])

  return (
    <div>
      <div style={{display:'flex',flexWrap:'wrap',padding:40 ,backgroundColor:'lightblue'}}>
        {place.map((p,index)=>{
          return(
            <Card  key={index}  onClick={()=>navigate('/hospital',{state:p})} sx={{ width:500 ,margin:10,marginTop:0,borderRadius:'10px'}}>
              <CardContent>
                <Typography  component={'span'}  sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  <div>
                    <b style={{fontSize:25}}> {p.name}</b> <hr className='h'/>
                    {p.formatted}
                  </div>
                </Typography>
              </CardContent>
            </Card>
            )
          })
        }
      </div>
    </div>
  )
}
