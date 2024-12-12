import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating, Stack } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc } from "firebase/firestore";

const IMAGE_API = "https://image.tmdb.org/t/p/w500/";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [similarmovies, setSimilarmovies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [review, setReview] = useState(""); 
  const { id, poster_path, title, overview } = location.state || {};
  const [reviews, setReviews] = useState([]);
  const [rating, setRating]= useState([])

  useEffect(() => {
    if (id && poster_path && title && overview) {
      const movieDetails = { id, poster_path, title, overview };
      localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
    }
  }, [id, poster_path, title, overview]);


  useEffect(() => {
    if (!id) return;

    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=968ca3e64bfb589dfa090695ff0af111`
        );
        setSimilarmovies(response.data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=968ca3e64bfb589dfa090695ff0af111`);
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchSimilarMovies();
    fetchMovieReviews(); 
  }, [id]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmitReview = () => {
    const username = localStorage.getItem("username");
    const newReview = {
      id: reviews.length + 1,
      author: username || "no name",
      content: review,
      rating: rating,
      poster_path: poster_path, 
      title: title,
    };
  
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    savedReviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(savedReviews));
  
    setReview("");
    setRating();
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setDialogOpen(false);
  };

  const storedMovie = localStorage.getItem("movieDetails");
  const movieData = storedMovie ? JSON.parse(storedMovie) : null;
  

  useEffect(() => {
    const firebaseFunction = async () => {
      const username = localStorage.getItem("username") || "no name"; 
      const documentReference = doc(db, "users", username);
      try {
        await setDoc(documentReference, {
          name: username,
          review: review,
          rating: rating,
        });
        console.log("Review successfully saved to Firestore!");
      } catch (error) {
        console.error("Error saving review to Firestore:", error);
      }
    };
  
    if (review) {
      firebaseFunction(); 
    }
  }, [review, rating]);
  

  return (
    <div style={{ padding: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Card
            sx={{
              maxWidth: 300,
              mt: -49,
              ml: 28,
              height: 350,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
            className="mainImg"
              component="img"
              height="230"
              sx={{ width: 170, margin: "0 auto", padding: 1 }}
              image={`${IMAGE_API}${poster_path}`}
              alt={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {overview}
              </Typography>
            </CardContent>
          </Card>

          <Button
          className="reviewbtn"
        onClick={handleOpenDialog}
        variant="contained"
        sx={{
          marginTop: "20px",
          backgroundColor: "tomato",
          color: "white",
          ml: "25%",
          mt: "2%",
        }}
      >
        Post Review
      </Button>

      <Dialog fullWidth open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Write your review here</DialogTitle>
        <DialogContent>
          <TextField
            id="review"
            label="Your Review"
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <Stack spacing={1} sx={{ px: 2 }}>
          <Rating onChange={(e)=>setRating(e.target.value) } style={{ marginLeft: "15%" }} name="half-rating" defaultValue={2.5}  />
        </Stack>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitReview} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
        </Dialog>

          <div className="similarmovie">
            <Typography variant="h5" style={{ width: "100%", marginBottom: "10px"}}>
              Similar Movies
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {similarmovies.map((movie) => {
                if (!movie.id) return;
                return (
                  <Card
                    key={movie.id}
                    className="similarcard"
                    style={{ margin: "10px", border: "none" }}
                    onClick={() => navigate(`/details`, { state: movie })}
                  >
                    <CardMedia
                      component="img"
                      height="210"
                      image={`${IMAGE_API}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" style={{fontSize:'0.9rem'}}>
                        {movie.title}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Grid>
        <Grid item xs={5}>
        <div className="reviewdiv">
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
            Reviews
        </Typography>
        {reviews.map((review) => {
         return (
            <div
               key={review.id}
               style={{ marginBottom: "15px", border: "1px solid lightgrey", padding: 5 }}
              onClick={() =>
               navigate("/myreviews", {
              state: {id, poster_path:review.poster_path, title, review: review.content, rating: review.rating},
             })
          }
           >
        <Typography
          style={{ display: "flex", margin: "0.5rem" }}
          variant="h6"
          gutterBottom
          component="div"
        >
          <Avatar alt={review.author} src="/static/images/avatar/3.jpg" />
          {review.author}
        </Typography>
        <hr />
        <Typography variant="body1">{review.content}</Typography>
        <Typography>{review.rating} /5</Typography>
      </div>
    );
  })}
</div>

</Grid>

      </Grid>
    </div>
  );
};

export default Details;
