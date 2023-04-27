/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};

export default function index({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="flex flex-col w-full  items-center">
      <div className="w-full  mx-auto space-y-12">
        <div className="relative w-full h-[700px]">
          <Image
            src="/val_banner.jpg"
            alt="valorant Banner"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-[rgb(36,36,36)] ">
            <div className=" py-24 top-0 left-0 w-full h-full  mx-auto flex items-center flex-col">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl text-center">
                  {locale === "en" ? "Welcome to" : "Bienvenue sur"}
                  <br /> Valorant Clutcher
                </h1>
              </div>
              <div className="dark:text-gray-100 text-center">
                <p>
                  {" "}
                  {locale === "en"
                    ? "The best site to improve your gamesense."
                    : "Le meilleur site pour améliorer ton gamesense."}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap justify-center py-6 space-x-2 border-t border-dashed dark:border-[#fff9c8]">
                  <a className="px-3 py-1 rounded-sm  dark:bg-[#efd807] dark:text-gray-900">
                    #Improvement
                  </a>
                  <a className="px-3 py-1 rounded-sm  dark:bg-[#efd807] dark:text-gray-900">
                    #Coaching
                  </a>
                  <a className="px-3 py-1 rounded-sm  dark:bg-[#efd807] dark:text-gray-900">
                    #Gamesense
                  </a>
                </div>
                <section className="">
                  <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                    <h1 className="text-5xl font-bold leading-none text-center">
                      {locale === "en" ? "Wanna try ?" : "Envie d'essayer ?"}
                    </h1>
                    <p>
                      {" "}
                      {locale === "en"
                        ? "Your score can only be saved if you created an account"
                        : "Ton score sera sauvegardé seulement si tu as créé un compte!"}
                    </p>
                    <Link href="/game">
                      <button className=" px-8 py-3 text-lg font-semibold rounded dark:bg-[#efd807] text-gray-800">
                        {locale === "en"
                          ? "Start your first game"
                          : "Commence ta première partie"}
                      </button>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className=" font-semibold text-2xl">
          {" "}
          {locale === "en" ? "How to play ?" : "Comment jouer ?"}
        </h4>
        <ul className="ml-4 space-y-1 list-disc">
          <li>
            <a className="">
              {locale === "en"
                ? "You will have videos to watch, it will stop at some point."
                : "Vous allez avoir des vidéos à regarder, elles s'arrêteront à un certain moment."}
            </a>
          </li>
          <li>
            <a className="">
              {locale === "en"
                ? "There will be 4 options, you will have to pick the best one."
                : "Il y aura 4 options, vous devrez choisir la meilleure d'entre elles."}
            </a>
          </li>
          <li>
            <a className="">
              {locale === "en"
                ? "Your score will be saved, and you will be able to see your statistics on your profile."
                : "Votre score sera sauvegardé, et vous  serez en capacité de voir vos statistiques sur votre profil."}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
