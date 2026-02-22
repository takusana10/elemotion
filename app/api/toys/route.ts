import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Static list of toy files
  // Update this list when adding new files
  const files: string[] = [];

  return NextResponse.json({ files });
}
