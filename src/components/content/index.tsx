"use client";

import { useGlobalContext } from "@/context";
import React from "react";
import { useRouter } from "next/navigation";
import { useToasts } from "@geist-ui/core";
import SignInWithGoogleAndEmail from "../google_email";

interface Card {
  title: string;
  description: string;
  url: string;
}

const CardList: Card[] = [
  {
    title: "IT courses",
    description: "Start coding from zero in HTML/CSS & JavaScript",
    url: "/it",
  },
  {
    title: "English",
    description: "Start learning English from scratch!",
    url: "/english",
  },
  {
    title: "Books",
    description: "Find suitable books for learning English and IT technologies",
    url: "/books",
  },
  {
    title: "Online Tutorial",
    description: "Watch and develop yourself through online tutorials",
    url: "/tutors",
  },
];

export const Content = () => {
  const { token } = useGlobalContext();
  const router = useRouter();
  const { setToast } = useToasts({ placement: "topRight" });

  const startCourse = (url: string) => {
    if (token) {
      router.push(url);
    } else {
      setToast({
        text: "Please login to get started!",
        delay: 2000,
        type: "warning",
      });
    }
  };

  return (
    <React.Fragment>
      <SignInWithGoogleAndEmail />
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left cursor-pointer">
        {CardList.map((item, index) => {
          return (
            <a
              key={index}
              onClick={() => startCourse(item.url)}
              className="group component"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                {item.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {item.description}
              </p>
            </a>
          );
        })}
      </div>
    </React.Fragment>
  );
};
