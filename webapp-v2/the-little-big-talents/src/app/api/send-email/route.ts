import { NextRequest, NextResponse } from 'next/server';
import { sendLessonRequestConfirmation } from './mailgun';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ success: await sendLessonRequestConfirmation(body.name, body.email) });
}
