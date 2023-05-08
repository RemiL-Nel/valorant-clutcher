import React, { useEffect, useState } from "react";

type Props = {
  setSelected: any;
  selected: any;
  option: any;
  isCorrect: any;
  answer: any;
  confirm: any;
};

export default function Option({
  setSelected,
  selected,
  option,
  isCorrect,
  answer,
  confirm,
}: Props) {
  // useEffect(() => {
  //   if (isCorrect === 1) {
  //     setGoodAnswer(true);
  //   } else {
  //     setGoodAnswer(false);
  //   }
  // }, [isCorrect]);
  const handleSelect = () => {
    if (confirm) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };
  return (
    <li
      onClick={() => handleSelect()}
      className={`${
        selected == option ? `bg-[#efd807] text-black` : `bg-transparent`
      } ${confirm && option == answer && `border-green-500 text-green-500`} ${
        confirm && option !== answer && `border-red-500 text-red-500`
      } max-w-md w-full border  cursor-pointer hover:border-[#efd807] rounded-md p-2 `}
    >
      {option}
    </li>
  );
}
