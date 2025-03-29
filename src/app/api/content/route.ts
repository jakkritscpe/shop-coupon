import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tag = searchParams.get("tag") || "";    

    if (tag) {
        const content = await prisma.content.findUnique({
            where: { tag },
        });

        return NextResponse.json({ content }, { status: 200 });
    }

    const content = await prisma.content.findMany();
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    try {
        const { title , description, tag } = await req.json();

        if (!title || !description || !tag) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const content = await prisma.content.create({
            data: {
                title,
                description,
                tag,
            },
        });

        return NextResponse.json({ content }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { id, title, description, tag } = await req.json();

        if (!id || !title || !description || !tag) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const content = await prisma.content.update({
            where: { id },
            data: {
                title,
                description,
                tag,
            },
        });

        return NextResponse.json({ content }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { tag } = await req.json();

        if (!tag) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const content = await prisma.content.delete({
            where: { tag },
        });

        return NextResponse.json({ content }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
