import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || "";    

    if (name) {
        const configs = await prisma.config.findFirst({
            where: { name },
        });

        return NextResponse.json({ configs }, { status: 200 });
    }

    const config = await prisma.config.findMany();
    return NextResponse.json({ config }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try {
        const { name, value } = await req.json();

        if (!name || !value) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const config = await prisma.config.create({
            data: {
                name,
                value,
            },
        });

        return NextResponse.json({ config }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { name, value } = await req.json();

        if (!name || !value) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const config = await prisma.config.update({
            where: { name },
            data: {
                name,
                value,
            },
        });

        return NextResponse.json({ config }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
