import React, { Component } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedText = () => {
  const line1 = "Take your first step of your";
  const line2 = "plant parenthood";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className="m-auto absolute top-[180px] left-1/2 -translate-x-1/2">
      <motion.h3
        className="text-6xl font-extralight text-left"
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
        {line1.split("").map((char, idx) => {
          return (
            <motion.span key={idx} variants={letter} className="relative">
              {char}
            </motion.span>
          );
        })}
        <br />
        {line2.split("").map((char, idx) => {
          return (
            <motion.span
              key={idx}
              variants={letter}
              className="relative before:block before:absolute before:h-6 before:top-1/2 before:-translate-y-1/2 before:-inset-x-0.5 before:bg-xlight-green"
            >
              <span className="relative">{char}</span>
              {/* {char} */}
            </motion.span>
          );
        })}
      </motion.h3>
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -10, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        <Link
          className="block mt-5 p-6 py-3 w-48 text-center rounded-full text-base font-bold bg-forest-green text-beige uppercase"
          to="/products"
        >
          Shop all
        </Link>
      </motion.div>
    </div>
  );
};

export default AnimatedText;
