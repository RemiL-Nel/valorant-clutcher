/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  videoTitle: string;
  video: string;
  info: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  publishedAt: string;
  answer: string;
  secondsUntilPause: string;
}
type Props = {
  post: any;
};

export default function postclip({}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitted(true);
    console.log(data);
    fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <div className="flex flex-col space-y-4 w-full pt-20  items-center ">
      <h1 className="text-5xl font-bold">
        {locale === "en"
          ? "Share your clip to others!"
          : "Montrez votre clip aux autres!"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col w-full items-center space-y-10
        ${submitted && "animate-pulse pointer-events-none"}`}
      >
        <div className="w-[30%] text-center">
          <label className="block mb-2 text-sm">
            {locale === "en" ? "Video title" : "Titre de la vidéo"}
          </label>
          <input
            {...register("videoTitle", { required: true })}
            type="text"
            placeholder="Raze bind 1v2........"
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="w-[30%] text-center">
          <label className="block mb-2 text-sm">
            {locale === "en" ? "Video URL" : "URL de la vidéo"}
          </label>
          <input
            {...register("video", { required: true })}
            type="url"
            placeholder="https://youtube.com/......."
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="w-[30%] text-center">
          <label className="block mb-2 text-sm">
            {locale === "en"
              ? " Timecode where the video should be stopped (seconds after beginning)"
              : "Timecode où la vidéo devra s'arrêter (en secondes après le début)"}
          </label>
          <input
            {...register("secondsUntilPause", { required: true })}
            type="number"
            placeholder="30"
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="w-[30%] text-center">
          <label className="block mb-2 text-sm">
            {locale === "en"
              ? "Informations about the clip"
              : "Informations à propos du clip"}
          </label>
          <textarea
            {...register("info", { required: true })}
            placeholder="Example: the spike is planted, i know Jett is A Main  etc.. etc.."
            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <label className="text-center">
          Options <br />{" "}
          {locale === "en"
            ? "Check the right answer"
            : "Cochez la bonne réponse"}
        </label>
        <div className="w-[600px] grid grid-cols-2 gap-6">
          <div className="flex space-x-4">
            <input
              type="radio"
              className="w-6"
              value="1"
              {...register("answer")}
            />
            <input
              {...register("option1", { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="In this situation, we should...."
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="radio"
              className="w-6"
              value="2"
              {...register("answer")}
            />
            <input
              {...register("option2", { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="In this situation, we should...."
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="radio"
              className="w-6"
              value="3"
              {...register("answer")}
            />
            <input
              {...register("option3", { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="In this situation, we should...."
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="radio"
              className="w-6"
              value="4"
              {...register("answer")}
            />
            <input
              {...register("option4", { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="In this situation, we should...."
            />
          </div>
        </div>
        <div className="flex flex-col p-5">
          {errors.videoTitle && (
            <span className="text-red-500">
              - The video title field is required
            </span>
          )}
          {errors.video && (
            <span className="text-red-500">
              - The video url field is required
            </span>
          )}
          {errors.info && (
            <span className="text-red-500">- The info field is required</span>
          )}
          {errors.option1 && (
            <span className="text-red-500">
              - The first option field is empty
            </span>
          )}
          {errors.option2 && (
            <span className="text-red-500">
              - The second option field is empty
            </span>
          )}
          {errors.option3 && (
            <span className="text-red-500">
              - The third option field is empty
            </span>
          )}
          {errors.option4 && (
            <span className="text-red-500">
              - The fourth option field is empty
            </span>
          )}
          {errors.answer && (
            <span className="text-red-500">
              - You did not checked the right answer !
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-80 px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
        >
          {locale === "en" ? "Post your clip!" : "Postez votre clip!"}
        </button>
      </form>
    </div>
  );
}
