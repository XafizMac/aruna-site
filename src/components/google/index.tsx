import { useGlobalContext } from "@/context";
import { auth, googleAuthProvider } from "@/firebase";
import { User } from "@/types/auth";
import { Button, Link, Loading, Modal, Text } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
export default function SignInWithGoogle() {
  
  const { token, setToken, user, setUser, loading, setLoading } =
    useGlobalContext();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("token", JSON.stringify(result.user?.accessToken));
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(result.user?.accessToken);
      setUser(result.user as User);
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading scale={5} />;
  }

  return (
    <div>
      {token ? (
        <div className="flex flex-col items-center gap-6">
          <Text className="font-extrabold md:text-[36px] text-[24px] lg:text-[48px] text-center">
            Welcome back, <span className="primary">{user?.displayName}</span>
          </Text>
          <Text className="text-center text-xl">
            Get your long-awaited need in one click
          </Text>
          <button className="primary-btn">Get Started</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Text className="font-extrabold text-xl text-center">
            Login to get started with
          </Text>
          <div className="flex gap-2 items-center">
            <p
              onClick={handleSignInWithGoogle}
              className="group rounded-lg border border-transparent px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <Image
                width={50}
                src={require("@/../public/google.png")}
                alt=""
              />
            </p>
            <p>or</p>
            <p className="group rounded-lg border border-transparent px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <Github className="w-[50px] h-[50px]" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
