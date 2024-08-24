import { useGlobalContext } from "@/context";
import { auth, googleAuthProvider } from "@/firebase";
import { useLangStore } from "@/store/lang_store";
import { User } from "@/types/auth";
import { Loading, Text, useToasts } from "@geist-ui/core";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInWithGoogleAndEmail() {
  const t = useLangStore((s) => s.t);
  const mainItems = t("main");
  const { token, setToken, user, setUser, loading, setLoading } =
    useGlobalContext();
  const { setToast } = useToasts();
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      await axios.post("/api/login", {
        username: result.user.displayName,
        email: result.user.email,
      });
      const userToken = await result.user.getIdTokenResult();
      localStorage.setItem("token", JSON.stringify(userToken.token));
      localStorage.setItem("user", JSON.stringify(result.user));
      setToken(userToken.token);
      setUser(result.user as User);
      // window.location.reload();
    } catch (e) {
      setToast({
        text: "Login not successfull",
        delay: 1000,
        type: "warning",
      });
    }
  };

  if (loading) {
    return <Loading scale={5} />;
  }

  return (
    <div className="min-h-full">
      {token ? (
        <div className="flex flex-col items-center gap-11">
          <Text className="font-extrabold md:text-[36px] text-[24px] lg:text-[48px] text-center">
            Welcome back, <span className="primary">{user?.displayName}</span>
            <br />
            <Text className="text-center font-normal text-xl">
              Get your long-awaited need in one click
            </Text>
          </Text>
          <div className="flex items-center max-sm:flex-col gap-3">
            <Text className="text-xl font-semibold">2,99$/month</Text>
            <button className="primary-btn">Get Started</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Text
            h1
            className="font-bold text-[24px] lg:text-[48px] lg:max-w-[70%] text-center"
          >
            {mainItems?.title[0]}
            <span className="primary">{mainItems?.title[1]}</span>
          </Text>
          <Text className="text-center w-full lg:max-w-[60%]">
            Advance from beginner to expert with our premium courses, in-depth
            tutorials, and expert guidance, all crafted to help you lead with
            confidence.
          </Text>
          <div className="flex gap-2 items-center">
            <p
              onClick={handleSignInWithGoogle}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            >
              <Image
                width={30}
                src={require("@/../public/google.png")}
                alt=""
              />
              <p className="font-semibold">Register with Google</p>
            </p>
            <p
              onClick={() => router.push("/signin")}
              className="flex items-center font-semibold cursor-pointer gap-2 group rounded-full border border-transparent px-3 py-2 transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800/30"
            >
              Register with Email
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
