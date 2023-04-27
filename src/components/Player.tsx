import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  post: any;
  handleTimer: any;
  confirm: any;
};

export default function Player({ post, handleTimer, confirm }: Props) {
  const [played, setPlayed] = useState(0);

  return (
    <div className="flex flex-col text-center space-y-6 max-w-[35%]">
      <h1 className="text-3xl font-bold">{post?.videoTitle}</h1>

      <div className="flex justify-center">
        <ReactPlayer
          url={post?.video}
          playing={!confirm && played >= post?.secondsUntilPause ? false : true}
          light={!confirm && played >= post?.secondsUntilPause ? true : false}
          className="pointer-events-none"
          onProgress={(progress) => {
            setPlayed(progress.playedSeconds);
          }}
          onPause={() => {
            if (!confirm && played > 1) {
              handleTimer();
            }
          }}
          playIcon={
            <span className="font-bold text-2xl">What should you do ?</span>
          }
        />
      </div>
      <p>{post?.info}</p>
    </div>
  );
}
