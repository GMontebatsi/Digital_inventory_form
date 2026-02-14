import { saveSubmission } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const submission = await saveSubmission(body);
        return NextResponse.json({ success: true, submission });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ success: false, error: 'Failed to save submission' }, { status: 500 });
    }
}
