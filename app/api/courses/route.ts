import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  ) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[Courses]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}