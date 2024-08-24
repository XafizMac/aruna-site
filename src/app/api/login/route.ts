import { useGlobalContext } from "@/context";
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logged in!" });

    // Token
    const tokenLifeTime = 3600000;
    const currentTime = Date.now();
    const expirationTime = currentTime + tokenLifeTime;
    response.cookies.set('token', "loggedIn", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: expirationTime,
        path: '/',
        sameSite: 'strict',
    });

    return response;
}