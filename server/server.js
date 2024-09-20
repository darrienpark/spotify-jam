const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const code = req.body.code;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000",
    client_id: "7fdbf6834a4e468884cdd348bfb49e14",
    client_secret: "fe8934a3055149f2ace16766dc652ae6",
  });

  try {
    // Fetch request to Spotify's token endpoint
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    redirect_uri: "http://localhost:3000",
    client_id: "7fdbf6834a4e468884cdd348bfb49e14",
    client_secret: "fe8934a3055149f2ace16766dc652ae6",
    refresh_token: refreshToken,
  });

  try {
    // Make a POST request to Spotify's token endpoint
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({
        accessToken: data.access_token,
        expiresIn: data.expires_in,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

app.listen(3001);
