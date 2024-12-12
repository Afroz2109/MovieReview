import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Navigate, useNavigate} from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular]= useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setToprated] = useState([]);
  const navigate= useNavigate();

  const MOVIE_API = `https://api.themoviedb.org/3/movie/now_playing?api_key=968ca3e64bfb589dfa090695ff0af111`;
  const IMAGE_API = `https://image.tmdb.org/t/p/w500/`;

  const POPULAR_MOVIE_API= `https://api.themoviedb.org/3/movie/popular?api_key=968ca3e64bfb589dfa090695ff0af111`

  const UPCOMMING_MOVIE_API=`https://api.themoviedb.org/3/movie/upcoming?api_key=968ca3e64bfb589dfa090695ff0af111`

  const TOP_RATED_MOVIE_API=`https://api.themoviedb.org/3/movie/top_rated?api_key=968ca3e64bfb589dfa090695ff0af111`

  useEffect(() => {
    axios
      .get(MOVIE_API)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(()=> {
    axios.get(POPULAR_MOVIE_API).then((response)=> {
      setPopular(response.data.results)
    })
    .catch((error) => {
      console.error(error);
    });
}, []);


useEffect(()=> {
  axios.get(UPCOMMING_MOVIE_API).then((response)=> {
    setUpcoming(response.data.results)
  })
  .catch((error) => {
    console.error(error);
  });
}, []);
 

useEffect(()=> {
  axios.get(TOP_RATED_MOVIE_API).then((response)=> {
    setToprated(response.data.results)
  })
  .catch((error) => {
    console.error(error);
  });
}, []);




  return (
    <div className='totaldiv' style={{ padding: '90px'}}>
      <Grid  container spacing={3}>
        <Grid  item xs={18 } style={{marginTop:"-6%",marginLeft:'17%'}}>
          <h2 className='headings'>Now playing:</h2>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: -1,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
           {movies.map((movie) => (
            <Card key={movie.id} sx={{ minWidth: 160, height: 290, scrollSnapAlign: 'center' }}>
            <CardActionArea onClick={() => navigate('/details', { state: movie })}>
            <CardMedia
             component="img"
            height="210"
            image={`${IMAGE_API}${movie.poster_path}`}
           alt={movie.title}
          />
          <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <h5 style={{ marginTop: -1 }}>{movie.title}</h5>
          </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
))}

        </Box>
        </Grid>
        <Grid className='popularmovies' item xs={18}>
          <h2 className='heading'>Popular Movies:</h2>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 1,
              ml:31,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {popular.map((movie) => (
              <Card className='cards' key={movie.id} sx={{ minWidth: 160, height: 295, scrollSnapAlign: 'center' }}>
                <CardActionArea onClick={() => navigate('/details', { state: movie })}                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={`${IMAGE_API}${movie.poster_path}`}
                    alt={popular.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      <h5 style={{marginTop:-1}}>{movie.title}</h5>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid className='upcomming'  item xs={18}>
          <h2 className='heading' >Up Comming:</h2>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 1,
              ml:31,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {upcoming.map((movie) => (
              <Card className='cards'  key={movie.id} sx={{ minWidth: 160, height: 295, scrollSnapAlign: 'center' }}>
                <CardActionArea onClick={() => navigate('/details', { state: movie })}  >
                  <CardMedia
                    component="img"
                    height="220"
                    image={`${IMAGE_API}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      <h5 style={{marginTop:-1}}>{movie.title}</h5>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid className='toprated'  item xs={18}>
          <h2 className='heading'>Top Rated:</h2>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 1,
              ml:31,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
           {toprated.map((movie) => (
           <Card className='cards'  key={movie.id} sx={{ minWidth: 160, height: 295, scrollSnapAlign: 'center' }}>
            <CardActionArea onClick={() => navigate('/details', { state: movie })}>
          <CardMedia
          component="img"
          height="220"
         image={`${IMAGE_API}${movie.poster_path}`}
         alt={movie.title}
        />
       <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <h5 style={{ marginTop: -1 }}>{movie.title}</h5>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
))}

          </Box>
        </Grid>
      </Grid>
    </div>
  );
  
};

export default Home;
