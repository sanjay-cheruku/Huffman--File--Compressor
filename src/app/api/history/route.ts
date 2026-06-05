import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, originalSize, compressedSize } = body;

    const ratio = ((originalSize - compressedSize) / originalSize) * 100;

    const history = await prisma.compressionHistory.create({
      data: {
        fileName,
        originalSize,
        compressedSize,
        ratio,
      },
    });

    return NextResponse.json({ success: true, data: history }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to save history' }, { status: 500 });
  }
}
