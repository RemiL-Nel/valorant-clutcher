/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";

interface IFormInput {
  nickname: string;
  email: string;
  password: string;
}
type Props = {
  user: any;
};

export default function login({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitted(true);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            const { token, user } = result;
            dispatch(loginSuccess({ token, user }));
            router.push("/");
          });
        } else if (res.status === 400) {
          setError("Invalid logs");
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
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">
            {" "}
            {locale === "en" ? "Sign in" : "Connectez vous"}
          </h1>
          <p className="text-sm dark:text-gray-400">
            {locale === "en"
              ? "Sign in to access your account"
              : "Connectez vous pour accéder à votre compte."}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                {" "}
                {locale === "en" ? "Nickname" : "Pseudonyme"}
              </label>
              <input
                {...register("nickname", { required: true })}
                type="text"
                name="nickname"
                id="nickname"
                placeholder="leroyJenkins"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm">
                  {" "}
                  {locale === "en" ? "Password" : "Mot de passe"}
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  {locale === "en"
                    ? "Forgot password ?"
                    : "Mot de passe oublié ?"}
                </a>
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
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-[#efd807] dark:text-gray-900"
              >
                {locale === "en" ? "Sign in" : "Connexion"}
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              {locale === "en"
                ? "Don't have an account yet ?"
                : "Pas encore de compte ?."}
              <Link href="register">
                <span className="hover:underline dark:text-[#efd807]">
                  {" "}
                  {locale === "en" ? "Sign up" : "Inscrivez vous"}
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
