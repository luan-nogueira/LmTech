import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ status: 'ok', message: 'LM Tech API operational' });
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'LM Tech API operational' });
}
