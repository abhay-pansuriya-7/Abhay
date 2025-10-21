import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ 
        success: false, 
        message: 'File size must be less than 2MB' 
      });
    }

    // Check file type
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        success: false, 
        message: 'File type not allowed. Only TXT, MD, PDF, DOC, DOCX files are allowed.' 
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create assets/projectDocs directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'assets', 'projectDocs');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // Return the relative path for storage in database
    const relativePath = `/assets/projectDocs/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      filePath: relativePath,
      fileName: file.name
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error uploading file' 
    }, { status: 500 });
  }
}
