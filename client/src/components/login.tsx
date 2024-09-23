import { Button } from "@mantine/core";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=7fdbf6834a4e468884cdd348bfb49e14&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  const handleButtonClick = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <div>
      <Button variant="filled" color="green" onClick={handleButtonClick}>
        Login with Spotify
      </Button>
    </div>
  );
}
