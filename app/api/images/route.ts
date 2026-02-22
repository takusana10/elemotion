import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Static list of image files
  // Update this list when adding new files
  const files = [
    '250739_constrain-modifier_v02_0047.png',
    '260119_egg-split_v01.png',
    'IMG_1274 (1).JPG',
    'IMG_1287.JPG',
    'IMG_1427.png',
  ];

  return NextResponse.json({ files });
}
