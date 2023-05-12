/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {};

export default function account({}: Props) {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const { token, user } = auth as any;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });

  return (
    <div className="flex justify-center items-center w-full">
      <section className="m-4 md:m-8 ">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">Well done !</h2>
          <p className="dark:text-gray-400">
            This is how you performed on this game
          </p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4"></div>
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 dark:text-[#efd807]"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="my-3 text-3xl font-semibold">Score</h3>
            <div className="space-y-1 leading-tight">
              <p>7/10</p>
            </div>
            <Link href="/game">
              <div className="flex w-60 mt-8">
                <button className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900">
                  Restart
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
