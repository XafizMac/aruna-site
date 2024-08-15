"use client";

import { Content } from "@/components/content";
import { Header } from "@/components/header";
import { useGlobalContext } from "@/context";
import { useEffect } from "react";

export default function Home() {
  const { setToken, setUser, setLoading } = useGlobalContext();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        setToken(token);
        setUser(JSON.parse(user));
      }
    } catch (e) {
      console.log(e);
    } finally{
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0 gap-24">
      <Header />
      <Content />
      {/* Blob */}
      <div className="animate-[wiggle_40s_ease-in-out_infinite_forwards] absolute top-[50%] left-[50%] z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]" />
    </main>
  );
}
