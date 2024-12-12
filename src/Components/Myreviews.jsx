import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const IMAGE_API = "https://image.tmdb.org/t/p/w500/";

const MyReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editedReview, setEditedReview] = useState("");

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setUserReviews(savedReviews);
  }, []);

  const handleDelete = (index) => {
    const updatedReviews = userReviews.filter((_, i) => i !== index);
    setUserReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleEditClick = (index) => {
    setCurrentReview(userReviews[index]);
    setEditedReview(userReviews[index]?.content || "");
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const updatedReviews = userReviews.map((rev, i) =>
      i === userReviews.indexOf(currentReview) ? { ...rev, content: editedReview } : rev
    );
    setUserReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setOpenEditDialog(false);
  };

  const toggleReadMore = (index) => {
    const updatedReviews = userReviews.map((review, i) => {
      if (i === index) {
        return { ...review, isExpanded: !review.isExpanded };
      }
      return review;
    });
    setUserReviews(updatedReviews);
  };

  return (
    <div className="Alldiv">
    <Box className="Allreview" sx={{ padding: "20px", marginLeft: "5%" }}>
      <div style={{ marginTop: "-12%",marginLeft:'10%' }}>
        <h4 style={{ marginTop: "10%" }}>
          <i>Reviews given by {localStorage.getItem("username") || "Anonymous"}</i>
        </h4>
      </div>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px",width:'75%' }}>
        {userReviews.map((rev, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "90px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              minHeight: "120px",
              flex: "1 1 31%",
              marginTop:'-7%',
             
            }}
          >
            <Box sx={{ flex: 1, marginRight: "15px" }}>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Avatar alt={rev.author} src={rev.authorAvatar || "/path/to/default/avatar.jpg"} />
                <h3 style={{ margin: "0 0 0 10px" }}>{rev.author || "Anonymous"}</h3>
              </div>
              <p style={{ marginBottom: "5px" }}>
                <strong>Rating:</strong> {rev.rating || "No rating"} ★
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Review:</strong>{" "}
                {rev.isExpanded
                  ? rev.content || "No review provided."
                  : (rev.content || "No review provided.").substring(0, 100) + (rev.content?.length > 100 ? "..." : "")}
              </p>
              {rev.content?.length > 100 && (
                <Button size="small" onClick={() => toggleReadMore(index)}>
                  {rev.isExpanded ? "Read Less" : "Read More"}
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: "10px" }}
                onClick={() => handleEditClick(index)}
              >
                <EditIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Edit
              </Button>
              <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(index)}>
                <DeleteIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Delete
              </Button>
            </Box>

            <img
              src={rev.poster_path ? `${IMAGE_API}${rev.poster_path}` : "/path/to/default/poster.jpg"}
              alt={rev.title || "Movie Poster"}
              style={{
                width: "100px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight:'19px'
              }}
            />
          </Box>
        ))}
      </Box>

      <Dialog fullWidth open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Your Review</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Review"
            variant="outlined"
            value={editedReview}
            onChange={(e) => setEditedReview(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </div>
  );
};

export default MyReviews;
