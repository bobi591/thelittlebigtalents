import { NextRequest, NextResponse } from 'next/server';
import { sendLessonRequestConfirmation } from './mailgun';
import { RequestLessonData } from '@/app/components/RequestLesson/RequestLesson';

export async function POST(req: NextRequest) {
  const data: RequestLessonData = await req.json();
  return NextResponse.json({ success: await sendLessonRequestConfirmation(data) });
}
