"use client";

import { useGlobalContext } from "@/context";
import { auth } from "@/firebase";
import { useLangStore } from "@/store/lang_store";
import { Button, Spacer, User, useToasts } from "@geist-ui/core";
import { LogOut } from "@geist-ui/icons";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, token } = useGlobalContext();
  const { setToast } = useToasts({ placement: "topRight" });
  const router = useRouter();
  const t = useLangStore((state) => state.t);
  const setLang = useLangStore((state) => state.setLanguage);
  const lang = useLangStore((state) => state.language);

  async function handleLogout() {
    try {
      await signOut(auth);
      await axios.post("/api/logout");
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      setToast({
        text: "Sign up failed",
        delay: 2000,
        type: "error",
      });
    }
  }

  const toggleLang = () => {
    setLang(lang === "en" ? "ru" : "en");
    window.location.reload();
  };

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
      {/* By Aruna */}
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.instagram.com/arunastudy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By <p className="font-bold text-2xl">Aruna</p>
        </a>
      </div>

      {/* Menu */}
      <div className="fixed left-0 top-0 flex items-center gap-7 w-full lg:justify-end bg-gradient-to-b from-zinc-200 lg:bg-none pb-6 pt-8 backdrop-blur-2xl dark:from-inherit lg:static">
        {token ? (
          <div className="flex px-3 items-center justify-between lg:justify-end w-full gap-1">
            <User
              src={user?.photoURL}
              name={<p className="font-medium text-black dark:text-white">{user?.displayName}</p>}
            >
              <small className="text-gray-500 text-sm">{user?.email}</small>
            </User>
            <p className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer">
              <LogOut className="w-5 h-5" onClick={handleLogout} />
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* <p onClick={toggleLang} className="abort-btn">{lang === "en" ? "Ру" : "En"}</p> */}
            <Button
              auto
              onClick={() => router.push("/signin")}
              className="text-black"
              w={"max-content"}
              type="secondary"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t("header.loginbtn")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
