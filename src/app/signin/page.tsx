"use client";
// Войти
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { Button, Input, Text, useToasts } from "@geist-ui/core";
import Link from "next/link";
import { useGlobalContext } from "@/context";
import { User } from "@/types/auth";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const { setToast } = useToasts({ placement: "topRight" });
  const router = useRouter();
  const { setUser } = useGlobalContext();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        if (response !== undefined) {
          const token =  await response.user.getIdTokenResult();
          await axios.post("/api/login");
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(response.user));
          setUser(response?.user as User);
          console.log(response.user);
          // router.push("/");
        } else {
          setToast({
            text: "Sign up failed",
            delay: 2000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.error("SignIn Error:", error);
        setToast({
          text: "Sign up failed",
          delay: 2000,
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex flex-col items-start gap-2 bg-white p-12 rounded-lg shadow-2xl">
        <Text className="text-xl mb-3">Sign In</Text>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          width={"100%"}
          placeholder="Email"
          className="input"
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full"
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Button
          onClick={handleSignIn}
          loading={loading}
          htmlType="submit"
          width={"100%"}
          type="secondary"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Login
        </Button>
        <Text small>
          <Link className="" href={"/signup"}>
            Don't have an account?
          </Link>
        </Text>
      </form>
    </div>
  );
};

export default SignIn;
