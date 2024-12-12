import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Home from './Components/Home';
import Details from './Components/Details';
import logo from './assets/Icon.png';
import Myreviews from './Components/Myreviews';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { auth } from './Firebase'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      auth.signOut().then(() => {
        setIsLoggedIn(false);
        navigate('/login'); 
      });
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div>
      <Box>
        <AppBar className='navbar' sx={{ background: 'tomato' }}>
          <Toolbar>
            <img src={logo} alt="Logo" style={{ height: 36, width: 46, padding: 10 }} />
            <Typography
              sx={{ fontWeight: 700, fontStyle: 'italic', flexGrow: 1 }}
              variant="h6"
              component="div"
            >
              Cinema Rev
            </Typography>
            <Button color="inherit" onClick={handleLoginLogout}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='iconsdiv'>
        <Grid
          className='iconImages'
          container
          direction="column"
          spacing={6}
          style={{ padding: 30, marginTop: '7%' }}
        >
          <Box
            className='line'
            sx={{
              borderLeft: '2px solid grey',
              height: '700px',
              position: 'absolute',
              left: '17%',
              transform: 'translateX(-50%)',
              top: '10%',
            }}
          />
          <Grid item xs={1}>
            <HomeIcon
              className='homeicon'
              onClick={() => navigate('/')}
              sx={{ width: 90, height: 50, color: 'blue', cursor: 'pointer' }}
            />
          </Grid>
          <Grid item>
            <ReviewsIcon
              onClick={() => navigate('/details')}
              sx={{ width: 90, height: 50, color: 'aqua', cursor: 'pointer' }}
            />
          </Grid>
          <AccountBoxIcon
            sx={{
              width: 90,
              height: 50,
              color: 'tomato',
              cursor: 'pointer',
              ml: 6,
              mt: 5,
            }}
            onClick={() =>
              navigate('/myreviews', {
                state: {
                  review: {
                    poster_path: 'somePosterPath',
                    title: 'Some Movie Title',
                  },
                },
              })
            }
          />
        </Grid>
      </div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<Details />}/>
        <Route path="/myreviews" element={ <Myreviews />} />
      </Routes>
    </div>
  );
}

export default App;
