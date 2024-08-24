import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from './lib/prisma';
import axios from 'axios';
import checkAdminStatus from './utils/checkAdminStatus';

export default async function Middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const path = request.nextUrl.pathname;

    const isAdmin = await checkAdminStatus(token?.value);


    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // if (path === "/admin" && user?.role === "ADMIN") {
    //     return NextResponse.next();
    // } else if (path === "/admin" && user?.role !== "ADMIN") {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
    return NextResponse.next();
}

export const config = {
    matcher: ['/it', '/english', '/tutors', '/books', '/admin'],
}