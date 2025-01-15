import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoginImg from "../assets/Login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCreds = await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log(userCreds.user);
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
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
                type="password" // Ensures password input is masked
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Stack>
            {error && <p className="error">{error}</p>} {/* Display error if present */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ marginTop: 2, marginLeft: 18, width: "50%" }}
            >
              Login
            </Button>
            <div className="club">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "blue", textDecoration: "none" }}
              >
                Signup here
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
