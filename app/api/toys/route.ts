import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const toysDir = path.join(process.cwd(), 'public', 'toy');

    // Check if directory exists
    if (!fs.existsSync(toysDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read directory and filter for image files
    const files = fs.readdirSync(toysDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error reading toys directory:', error);
    return NextResponse.json({ files: [] });
  }
}
