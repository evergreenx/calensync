import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";

export default function Hero() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const words = "Knowing availablity without unnecessary discussion";

  return (
    <>
      <div className=" pt-20 pb-6">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center font-display text-3xl lg:text-4xl font-semibold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
        >
          {words.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={item}
              style={{ display: "inline-block", paddingRight: "15px" }}
            >
              {word === "" ? <span>&nbsp;</span> : word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.h1
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants1}
        className="lg:text-base text-sm text-center text-gray-400"
      >
        Introducing efficent way to organize your avaliblity with people .
        <br></br>
        Difference between time zone is no longer a problem,.
      </motion.h1>

      <div className="create my-7 flex">
        <Button className="rounded-full mx-auto p-6">Create a link</Button>
      </div>
    </>
  );
}
