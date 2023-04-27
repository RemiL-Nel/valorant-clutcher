/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sanityClient } from "../../sanity";

interface IFormInput {
  nickname: string;
  email: string;
  password: string;
}
type Props = {
  user: any;
};

export default function register({ user }: Props) {
  const [error, setError] = useState("");
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
    fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            router.push("/");
          });
        } else if (res.status === 400) {
          setError("User exists");
        }
        setSubmitted(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col max-w-md w-[350px] p-6 rounded-md sm:p-10  dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">
            {" "}
            {locale === "en" ? "Sign up." : "Inscrivez vous."}
          </h1>
          <p className="text-sm dark:text-gray-400">
            {" "}
            {locale === "en" ? "Create your account." : "Créez votre compte."}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className={`space-y-12 ng-untouched ng-pristine ng-valid ${
            submitted && "animate-pulse pointer-events-none"
          }`}
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                {" "}
                {locale === "en" ? "Nickname." : "Pseudonyme."}
              </label>

              <input
                {...register("nickname", { required: true })}
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Nick Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">
                {" "}
                {locale === "en" ? "Email adress." : "Adresse e-mail."}
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">
                {locale === "en"
                  ? "Confirm email adress"
                  : "Confirmez votre adresse e-mail"}
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm">
                  {" "}
                  {locale === "en" ? "Password." : "Mot de passe"}
                </label>
              </div>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm">
                  {" "}
                  {locale === "en"
                    ? "Confirm password"
                    : "Confirmez le mot de passe"}
                </label>
              </div>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-col p-5">
              {errors.nickname && (
                <span className="text-red-500">
                  - The name field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  - The email field is required
                </span>
              )}
              {errors.password && (
                <span className="text-red-500">
                  - The password field is required
                </span>
              )}
            </div>
          </div>
          <div className="">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
              >
                {locale === "en" ? "Create account" : "Créez votre compte"}
              </button>
              {error.length > 0 && <p>{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
