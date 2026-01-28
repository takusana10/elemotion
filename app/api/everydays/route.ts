import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const everydaysDir = path.join(process.cwd(), 'public', 'everydays');

    // Check if directory exists
    if (!fs.existsSync(everydaysDir)) {
      return NextResponse.json({ files: [] });
    }

    // Read directory and filter for image/gif files
    const files = fs.readdirSync(everydaysDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.gif', '.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error reading everydays directory:', error);
    return NextResponse.json({ files: [] });
  }
}
