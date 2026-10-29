import { NextRequest, NextResponse } from "next/server";
import { getTaskById } from "@/lib/tasks";
import { ApiResponse } from "@/types/api-todo";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const taskId = parseInt(id, 10);

   try {
    const task = await getTaskById(taskId);

    if (!task) {
      const notFoundPayload: ApiResponse = {
        success: false,
        message: `Task dengan ID ${id} tidak ditemukan di DummyJSON.`,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(notFoundPayload, { status: 404 });
    }

    const successPayload: ApiResponse = {
      success: true,
      message: `Task ID ${id} berhasil diambil.`,
      data: task,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(successPayload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Gagal mengambil task ID ${id}.`,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}