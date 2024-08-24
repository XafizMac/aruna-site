"use client";

// Регистрация
import { auth } from "@/firebase";
import { Button, Input, Text, useToasts } from "@geist-ui/core";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setToast } = useToasts({ placement: "topRight" });
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    await createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        if (response !== undefined) {
          await createNewUser();
          router.push("/signin");
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
  }

  const createNewUser = async () => {
    try {
      await axios.post("/api/user/create", {
        username,
        email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex flex-col items-start gap-2 bg-white dark:border dark:border-neutral-700 dark:bg-neutral-800/30 p-12 rounded-lg shadow-2xl">
        <Text className="text-xl mb-3">Sign Up</Text>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          width={"100%"}
          placeholder="Username"
          className="input"
          crossOrigin={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
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
          onClick={handleSubmit}
          loading={loading}
          htmlType="submit"
          width={"100%"}
          type="secondary-light"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Sign Up
        </Button>
        <Text small>
          <Link className="" href={"/signin"}>
            Already have an account?
          </Link>
        </Text>
      </form>
    </div>
  );
}
