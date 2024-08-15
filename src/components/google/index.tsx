import { useGlobalContext } from "@/context";
import { auth, githubAuthProvider, googleAuthProvider } from "@/firebase";
import { User } from "@/types/auth";
import { Button, Link, Loading, Modal, Text } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";

export default function SignInWithGoogleAndGithub() {
  const { token, setToken, user, setUser, loading, setLoading } =
    useGlobalContext();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const userToken = await result.user.getIdTokenResult();
      console.log(userToken.token);
      localStorage.setItem("token", JSON.stringify(userToken.token));
      localStorage.setItem("user", JSON.stringify(result.user));
      console.log(userToken.token);
      setToken(userToken.token);
      setUser(result.user as User);
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const userToken = await result.user.getIdTokenResult();
      localStorage.setItem("token", JSON.stringify(userToken.token));
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(userToken.token);
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
        <div className="flex flex-col items-center gap-11">
          <Text className="font-extrabold md:text-[36px] text-[24px] lg:text-[48px] text-center">
            Welcome back, <span className="primary">{user?.displayName}</span>
            <br />
            <Text className="text-center font-normal text-xl">
              Get your long-awaited need in one click
            </Text>
          </Text>
          <div className="flex items-center gap-3">
            <Text className="text-xl font-semibold">2,99$/month</Text>
            <button className="primary-btn">Get Started</button>
          </div>
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
            <p
              onClick={() => handleSignInWithGithub()}
              className="group rounded-lg border border-transparent px-4 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <Github className="w-[50px] h-[50px]" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
