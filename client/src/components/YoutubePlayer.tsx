"use client";

import YouTube from "react-youtube";

type YouTubePlayerProps = {
  videoId: string;
};

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const opts = {
    height: "550",
    width: "978", 
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubePlayer;
