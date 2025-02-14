import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

/*const session = await auth();

    const userFound = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!userFound) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }*/

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const count = searchParams.get("count") === "true";

    const userId = "Cristian";

    if (count) {
      const notificationCount = await prismadb.notification.count({
        where: { userId },
      });
      return NextResponse.json({ count: notificationCount });
    }

    const notifications = await prismadb.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        task: {
          select: {
            id: true,
            icon: true,
            name: true,
            color: true,
            description: true,
          },
        },
      },
    });
    console.log("notifications", notifications);

    if (!notifications.length)
      return NextResponse.json(
        { error: "Notifications not found." },
        { status: 404 }
      );

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error getting notifications:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { notificationId } = data.notificationId;

    if (!notificationId)
      return NextResponse.json(
        { error: "Id notifications not found. " },
        { status: 404 }
      );

    await prismadb.notification.update({
      where: notificationId,
      data: { read: true },
    });
  } catch (error) {
    console.error("error pust notification ", error);
  }
}
