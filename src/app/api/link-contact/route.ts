import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || "";

    if (name) {
      const linkContact = await prisma.linkContact.findFirst({
        where: { name },
      });

      return NextResponse.json({ linkContact }, { status: 200 });
    }

    const linkContacts = await prisma.linkContact.findMany();
    return NextResponse.json({ linkContacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, link } = await req.json();

    console.log(name, link);

    if (!name || !link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const content = await prisma.linkContact.create({
      data: {
        name,
        link,
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
    const { name, link } = await req.json();

    if (!link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const content = await prisma.linkContact.update({
      where: { name },
      data: {
        link,
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
