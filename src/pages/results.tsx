import Link from "next/link";
import React from "react";

type Props = {};

export default function results({}: Props) {
  return (
    <div className="flex  justify-center items-center w-full">
      <div className="flex flex-col max-w-md p-6 space-y-6 sm:w-96 sm:p-10 w-full dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-2xl text-center font-semibold">Leaderboard</h2>
        <div>
          <div className="flex w-full justify-between items-center border border-transparent border-b-gray-700">
            <h3 className="text-xl font-semibold">Player</h3>
            <span className=" text-right  text-xl font-semibold">Wins</span>
          </div>

          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <div className="flex">
                <p>1. </p> <p>Nel</p>
              </div>

              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className=" flex  w-full justify-between border border-transparent border-b-gray-700">
              <p>Nel</p>
              <span className="text-right">20</span>
            </div>
          </div>
        </div>
        <Link href="/game">
          <button
            type="button"
            className="w-full py-2 font-semibold border rounded bg-[#efd807] dark:text-gray-900 dark:border-[#efd807]/80"
          >
            Restart
          </button>
        </Link>
      </div>
    </div>
  );
}
