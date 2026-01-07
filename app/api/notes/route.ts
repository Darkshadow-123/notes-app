import { connectDB } from '@/lib/mongodb';
import Note from '@/models/Note';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    console.error('GET /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const note = new Note({
      title: body.title,
      content: body.content,
    });

    await note.save();
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('POST /api/notes error:', error);
    return NextResponse.json(
      { error: 'Failed to create note', details: String(error) },
      { status: 500 }
    );
  }
}
