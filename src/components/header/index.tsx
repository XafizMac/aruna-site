"use client";

import { useGlobalContext } from "@/context";
import { auth } from "@/firebase";
import { Link, Modal, Tooltip, User } from "@geist-ui/core";
import { Code } from "@geist-ui/icons";
import { Globe } from "@geist-ui/icons";
import { Play } from "@geist-ui/icons";
import { LogOut } from "@geist-ui/icons";
import { signOut } from "firebase/auth";
import { useState } from "react";

export const Header = () => {
  const { user, token } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);

  const closeHandler = (event: any) => {
    setModalVisible(false);
    console.log("closed");
  };

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
      {/* Menu */}
      <div className="fixed left-0 top-0 flex items-center gap-7 w-full justify-center lg:justify-start bg-gradient-to-b from-zinc-200 lg:bg-none pb-6 pt-8 backdrop-blur-2xl dark:from-inherit lg:static">
        {token && (
          <div className="flex items-center">
            <User
              name={
                <p className="hidden font-medium text-[18px] lg:block text-black dark:text-white">
                  {user?.displayName}
                </p>
              }
              src={user?.photoURL}
            />
            <p
              onClick={() => setModalVisible(true)}
              className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer"
            >
              <LogOut onClick={handleLogout} />
            </p>
          </div>
        )}
        <ul className="flex gap-5 font-medium">
          <li className="flex items-center gap-2 hover:gap-3 transition-all text-[18px]">
            <Code className="w-4 h-4" />
            <Link
              href="#"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className=""
            >
              IT
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:gap-3 transition-all text-[18px]">
            <Globe className="w-4 h-4" />
            <Link
              href="#"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              English
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:gap-3 transition-all text-[18px]">
            <Play className="w-4 h-4" />
            <Link
              href="#"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Tutors
            </Link>
          </li>
        </ul>
      </div>

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

      {/* <Modal visible={modalVisible} onClose={() => closeHandler(event)}>
        <Modal.Content>
          <p className="text-center">Are you really wanna logout?</p>
        </Modal.Content>
        <Modal.Action onClick={handleLogout}>Yes</Modal.Action>
      </Modal> */}
    </div>
  );
};
