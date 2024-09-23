const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const tokenUrl = "https://accounts.spotify.com/api/token";
const client_id = "7fdbf6834a4e468884cdd348bfb49e14";
const client_secret = "fe8934a3055149f2ace16766dc652ae6";
const encodedCredentials = new Buffer.from(
  client_id + ":" + client_secret
).toString("base64");

app.post("/login", async (req, res) => {
  const code = req.body.code;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000",
  });

  try {
    // Fetch request to Spotify's token endpoint
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    res.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    res.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.listen(3001);
