const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const http = require("http");

const app = express();
const port = 3001;

global.access_token = "";

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = "http://localhost:3000/auth/callback";

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.get("/auth/login", (req, res) => {
  let scope = "streaming user-read-email user-read-private";
  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("/");
    }
  });
});

app.get("/auth/token", (req, res) => {
  res.json({ access_token: access_token });
});

// Create HTTP Server
const server = http.createServer(app);

// Websocket
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Change this for production
  },
});

io.on("connection", (socket) => {
  console.log("Websocket connection established");
  socket.on("input", (message) => {
    socket.broadcast.emit("input", message);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
