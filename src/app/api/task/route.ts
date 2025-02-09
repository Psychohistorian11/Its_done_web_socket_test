import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("data: ", data);

    if (!data) {
      return NextResponse.json(
        { error: "dueTime is required field." },
        { status: 400 }
      );
    }

    const newTask = await prismadb.task.create({
      data: {
        dueTime: data,
        notified: false,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
