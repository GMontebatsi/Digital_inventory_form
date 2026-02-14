import { getSubmissions } from '@/lib/storage';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const submissions = await getSubmissions();
        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
}
