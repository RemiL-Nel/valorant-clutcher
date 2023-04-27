/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
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
      <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
        <img
          src="via.placeholder.com/200"
          alt=""
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user?.nickname}
            </h2>
            <p>{user?.email}</p>
            <p className="px-5 text-xs sm:text-base dark:text-gray-400"></p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            Level 1
          </div>
        </div>
      </div>
      <section className="m-4 md:m-8 ">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">Your statistics</h2>
          <p className="dark:text-gray-400">Clutcher</p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 text-[#efd807]"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h3 className="my-3 text-3xl font-semibold">Games played</h3>
            <div className="space-y-1 leading-tight">
              <p>15</p>
            </div>
          </div>
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
            <h3 className="my-3 text-3xl font-semibold">Perfect</h3>
            <div className="space-y-1 leading-tight">
              <p>4</p>
            </div>
          </div>
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
            <h3 className="my-3 text-3xl font-semibold">Average score</h3>
            <div className="space-y-1 leading-tight">
              <p>80% good answers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
