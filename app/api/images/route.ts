import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'image');

    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read directory and filter for image files
    const files = fs.readdirSync(imagesDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ files: [] });
  }
}
