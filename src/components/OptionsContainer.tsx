import React, { useState } from "react";
import Option from "./Option";

type Props = {
  setSelected: any;
  selected: any;
  isCorrect: any;
  setIsCorrect: any;
  post: any;
  confirm: any;
};

export default function OptionsContainer({
  setSelected,
  selected,
  post,
  isCorrect,
  setIsCorrect,
  confirm,
}: Props) {
  return (
    <ul className=" w-full grid grid-cols-2 gap-5">
      <Option
        confirm={confirm}
        isCorrect={isCorrect}
        setSelected={setSelected}
        selected={selected}
        option={post?.option1}
        answer={post?.answer}
      />
      <Option
        confirm={confirm}
        isCorrect={isCorrect}
        setSelected={setSelected}
        selected={selected}
        option={post?.option2}
        answer={post?.answer}
      />
      <Option
        confirm={confirm}
        isCorrect={isCorrect}
        setSelected={setSelected}
        selected={selected}
        option={post?.option3}
        answer={post?.answer}
      />
      <Option
        confirm={confirm}
        isCorrect={isCorrect}
        setSelected={setSelected}
        selected={selected}
        option={post?.option4}
        answer={post?.answer}
      />
    </ul>
  );
}
