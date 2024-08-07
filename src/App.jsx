import React from 'react'
import HospitalDetails from './Component/HospitalDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import logo from './assets/hospital.png'
import Home from './Component/Home';


export default function App() {
  return (
    <div>
      <div style={{backgroundColor:'aliceblue'}}>
      <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div"  sx={{ display:'flex'}}>
            <img src={logo} alt=""   height={100} />
            <h5 style={{marginTop:25,fontSize:30}}>MedStart</h5>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      </div>
      <Routes>
        <Route path='/' element={ < Home />}/>
        <Route path='/hospital' element={< HospitalDetails />}/>
      </Routes>
    </div>
  )
}





