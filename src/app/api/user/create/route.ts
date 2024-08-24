import { useGlobalContext } from "@/context";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function POST(request: NextRequest) {
    const res = await request.json();
    const { email, username } = res;

    try {
        const response = await db.user.create({
            data: {
                username,
                email,
                status: "INACTIVE",
                role: "USER",
                subscriptions: {
                    create: [{
                        price: 2.99,
                        duration: 30
                    }]
                }
            }
        })
        return NextResponse.json({ response }, { status: 201 });
    }
    catch (error: any) {
        return NextResponse.json({ statusText: "Error", error: error.message }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}