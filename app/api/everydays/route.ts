import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Static list of everydays files
  // Update this list when adding new files
  const files = [
    'E_001.gif',
    'E_002.gif',
    'E_003.gif',
    'E_004.gif',
    'E_005.gif',
    'E_006.gif',
    'E_007.gif',
    'E_008.gif',
    'E_009.gif',
    'E_010.gif',
    'E_011.gif',
    'E_012.gif',
    'E_013.gif',
    'E_014.gif',
    'E_015.gif',
    'E_016.gif',
    'E_017.gif',
    'E_018.gif',
    'E_019.gif',
    'E_020.gif',
    'E_021.gif',
  ];

  return NextResponse.json({ files });
}
