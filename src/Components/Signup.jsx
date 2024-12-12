import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginImg from "../assets/Login.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [error, setError] = useState(""); 

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential);
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="login">
      <div className="loginpart">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              className="loginimg"
              src={LoginImg}
              alt="login"
              style={{
                width: "85%",
                height: "80%",
                objectFit: "cover",
                padding: "60px",
                margin: "1rem",
                marginTop: "-3%",
                marginLeft: "5%",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="form">
              <Stack spacing={2} sx={{ width: 400, ml: 15, mt: -15 }}>
                <TextField
                  id="username"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  fullWidth
                />
                <TextField
                  id="useremail"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  fullWidth
                />
                <TextField
                  id="userpassword"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  fullWidth
                />
              </Stack>
              {error && <p className="error">{error}</p>} 
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister} 
                sx={{ marginTop: 2, marginLeft: 18, width: "50%" }}
              >
                Signup
              </Button>
              <div className="club">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Login here
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Signup;