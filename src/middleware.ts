import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function Middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    console.log(token);
    if(!token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/it', '/english', '/tutors', '/books', '/admin'],
}