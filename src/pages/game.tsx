import { Inter } from "next/font/google";
import Player from "@/components/Player";
import OptionsContainer from "@/components/OptionsContainer";
import { sanityClient } from "../../sanity";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Progress } from "rsuite";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  posts: any;
  postCount: any;
}

export default function Home({ posts, postCount }: Props) {
  const [isCorrect, setIsCorrect] = useState(0);
  // Pour isCorrect, Pas de réponse = 0, bonne réponse = 1, mauvaise réponse = 2
  const [score, setScore] = useState(0);
  const [confirm, setConfirm] = useState(false);
  let timer: any;

  const [currentClip, setCurrentClip] = useState(null) as any;
  const [selected, setSelected] = useState(null) as any;
  const router = useRouter();

  const pages = [];
  let [time, setTime] = useState(100);

  const handleNextClip = () => {
    const index = posts.indexOf(currentClip);

    setCurrentClip(posts[index + 1], setIsCorrect(0), setConfirm(false)), 3000;
    resetTimer();
  };
  const resetTimer = () => {
    setTime(100);
  };

  useEffect(() => {
    posts?.length > 0 && setCurrentClip(posts[0]);
  }, [posts]);
  const handleAnswer = () => {
    const index = posts.indexOf(currentClip);
    if (time <= 0) {
      setIsCorrect(3);
    } else if (selected !== posts[index].answer) {
      setConfirm(true);
      setIsCorrect(2);
    } else if (selected === posts[index].answer) {
      setConfirm(true);
      setIsCorrect(1);
      setScore(+1);
    }

    setSelected(null);
  };
  let timerInterval: any;
  const playTimer = () => {
    if (time === 100) {
      timerInterval = setInterval(() => {
        setTime(time--);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTime(100);
  };

  for (let i = 0; i < postCount; i++) {
    pages.push(i + 1);
  }
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-6">
      <h1 className="mt-6 text-5xl font-bold underline decoration-[#efd807]">
        Valorant Clutcher
      </h1>
      <section className="flex space-y-5 space-x-28 justify-center items-center w-full">
        <div className="w-24 inline-block ">
          <span className="text-2xl font-bold relative top-16 left-[34px]">
            {time}
          </span>
          <Progress.Circle
            percent={time}
            strokeColor="#ffc107"
            showInfo={false}
          />
        </div>
        <Player
          post={currentClip}
          confirm={confirm}
          stopTimer={stopTimer}
          playTimer={playTimer}
        />
        <span>Score: {score}/10</span>
      </section>
      <section className="w-full max-w-2xl flex justify-center items-center">
        <OptionsContainer
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          setSelected={setSelected}
          selected={selected}
          post={currentClip}
          confirm={confirm}
        />
      </section>

      <section className="w-[30%]">
        {/* <div className="flex justify-center">
          <ul className="flex items-center space-x-5 text-lg">
            {pages.map((page: any) => (
              <li className="" key={page}>
                {page}
              </li>
            ))}
          </ul>
        </div> */}
        {selected && posts.indexOf(currentClip) === posts.length - 1 ? (
          <Link href="/results">
            <button
              // onClick={handleAnswer}
              type="button"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
            >
              Show results
            </button>
          </Link>
        ) : (
          selected && (
            <button
              onClick={handleAnswer}
              type="button"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
            >
              Confirm
            </button>
          )
        )}
        {confirm && (
          <button
            onClick={handleNextClip}
            className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
          >
            Next clip
          </button>
        )}

        <div className="flex w-full text-center align-center justify-center">
          {isCorrect === 1 && (
            <span className="text-green-400">Bonne réponse!</span>
          )}
          {isCorrect === 2 && (
            <span className="text-red-400">Mauvaise réponse...</span>
          )}
          {isCorrect === 3 && (
            <span className="text-red-600">You ran out of time !</span>
          )}
        </div>
        <div className="flex flex-col space-y-3 w-full py-5 justify-center items-center mx-auto">
          <ul className="flex items-center space-x-5 text-lg w-full justify-center ">
            {pages.map((page: any) => (
              <li
                className={`w-12 h-2 rounded-sm
                  ${page === posts.indexOf(currentClip) + 1 && "bg-gray-100"}
                       ${
                         page < posts.indexOf(currentClip) + 1 && "bg-[#efd807]"
                       }
                            ${
                              page > posts.indexOf(currentClip) + 1 &&
                              "bg-gray-600"
                            }
                  `}
                key={page}
              ></li>
            ))}
          </ul>
          <span>
            {posts.indexOf(currentClip) + 1}
            {"/"}
            {posts.length}
          </span>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async ({ params, locales, query }: any) => {
  let min = 0;
  let max = 1;

  if (query.page != null && query.page != 1) {
    min = query.page * 1 - 1;
    max = query.page * 1;
  }
  const postQuery = `*[_type == "post"]
 {
videoTitle,
video,
info,
option1,
option2,
option3,
option4,
answer,
publishedAt,
secondsUntilPause,

}`;
  const postCountQuery = `  count(*[_type == 'post'])`;
  const postCount = await sanityClient.fetch(postCountQuery);

  const posts = await sanityClient.fetch(postQuery);

  return {
    props: {
      posts,
      postCount,
    },
  };
};
