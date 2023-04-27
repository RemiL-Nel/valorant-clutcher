import React, { useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { logout } from "../../../slices/authSlice";

type Props = {};

export default function Header({}: Props) {
  const [shown, setShown] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const auth = useSelector((state: RootState) => state.auth.auth);
  const { token, user } = auth as any;
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logout());
  };
  return (
    <div className="fixed z-50 bg-transparent  flex w-full justify-between p-4 font-body">
      <Link href="/">
        <Image src="/radiant.png" alt="logo" width={50} height={50} />
      </Link>
      <div className="flex px-4 gap-8 items-center">
        <button
          onClick={() => setShown(!shown)}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-transparent focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Language{" "}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          onClick={() => setShown(!shown)}
          id="dropdown"
          className={`z-10 ${
            shown === true ? "block absolute top-[70px]" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <Link href={router.asPath} locale="fr">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  French
                </a>
              </li>
            </Link>
            <Link href={router.asPath} locale="en">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  English
                </a>
              </li>
            </Link>
          </ul>
        </div>

        {token ? (
          <>
            <Link href="/postclip">
              <PlusCircleIcon className="w-10 h-10 cursor-pointer" />
            </Link>
            <Link href="/account">
              <UserCircleIcon className="w-10 h-10 cursor-pointer" />
            </Link>
            <ArrowLeftOnRectangleIcon
              onClick={() => signout()}
              className="w-10 h-10 cursor-pointer hover:text-red-500"
            />
          </>
        ) : (
          <>
            <Link href="/login">
              <span> {locale === "en" ? "Sign in" : "Se connecter"}</span>
            </Link>
            <Link href="/register">
              <span> {locale === "en" ? "Register" : "S'inscrire"}</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
