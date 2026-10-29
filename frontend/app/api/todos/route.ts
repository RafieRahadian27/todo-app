import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "@/lib/tasks";
import { todoService } from "@/services/todoService";
import { ApiResponse } from "@/types/api-todo";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limitParam = searchParams.get("limit");
  const skipParam = searchParams.get("skip");

  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const skip = skipParam ? parseInt(skipParam, 10) : 0;
    try {
    const result = await getTasks({ limit, skip });

    const responsePayload: ApiResponse = {
      success: true,
      message: "Tasks berhasil diambil dari DummyJSON API",
      count: result.tasks.length,
      total: result.total,
      data: result,
      timestamp: new Date().toISOString(),
    };

     return NextResponse.json(responsePayload, { status: 200 });
} catch (error) {
    console.error("[API /todos] GET Error:", error);

    const errorResponse: ApiResponse = {
      success: false,
      message: "Gagal mengambil data tasks",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.todo || typeof body.todo !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Field 'todo' wajib diisi dengan string.",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const todo = await todoService.createTodo(
      body.todo,
      body.userId ?? 1
    );

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil membuat task baru melalui DummyJSON API (Simulasi)",
        data: todo,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat task baru",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}