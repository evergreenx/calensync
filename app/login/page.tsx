"use client";
import Link from "next/link";
import Messages from "./messages";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import GHLogo from "@/app/assets/gh.svg";
import GoogleIcon from "@/app/assets/google.svg";

import FigmaIcon from "@/app/assets/figma.svg";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3, // Delay before starting the animation of children
      staggerChildren: 0.2, // Delay between each child animation
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const inputVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Login() {
  const supabase = createClientComponentClient();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const handleFetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserData(session);
    };

    handleFetchUser();
  }, []);

  const router = useRouter();

  const handleSign = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",

      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
  };

  const handleFigmaSign = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "figma",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
  };

  console.log(userData);

  if (userData) {
    return router.push("/");
  }
  return (
    <div className="flex w-full h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" flex flex-col w-full  px-8  justify-center gap-2"
      >
        <motion.form
          className=" flex flex-col justify-center gap-2 text-foreground lg:ml-[100px]"
          action="/auth/sign-in"
          method="post"
          initial={{ opacity: 0 }} // Initial state (hidden)
          animate={{ opacity: 1 }} // Animation when it becomes visible
        >
          <motion.h1 className="text-lg font-bold my-[20px]">Sign in</motion.h1>

          <motion.button
            variants={inputVariants}
            className="border rounded-full lg:w-[400px] border-[#ddd] font-medium px-6 py-3 text-black mb-2 flex justify-center items-center space-x-3"
            onClick={() => {
              handleSign();
            }}
          >
            <Image src={GHLogo} className="mr-2" width={18} alt="ghlogo" />
            Sign In with Github
          </motion.button>

          <motion.button
            variants={inputVariants}
            className="border rounded-full lg:w-[400px] border-[#ddd] font-medium px-6 py-3 text-black mb-2 flex justify-center items-center space-x-3"
            onClick={() => {
              handleSign();
            }}
          >
            <Image
              src={GoogleIcon}
              className="mr-2"
              width={18}
              alt="googleicon"
            />
            Sign In with Google
          </motion.button>

          <motion.button
            variants={inputVariants}
            className="border rounded-full lg:w-[400px] border-[#ddd] font-medium px-6 py-3 text-black mb-2 flex justify-center items-center space-x-3"
            onClick={() => {
              handleFigmaSign();
            }}
          >
            <Image
              src={FigmaIcon}
              className="mr-2"
              width={18}
              alt="googleicon"
            />
            Sign In with Figma
          </motion.button>

          <Messages />
        </motion.form>
      </motion.div>
    </div>
  );
}
