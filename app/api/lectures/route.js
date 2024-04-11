import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db.connect';
import Lecture from '@/app/lib/models/Lecture';// Assuming the correct path to the Lecture model

export const GET = async ({ request }) => {
    try {
        // Connect to the database
        await connectDB();

        // Fetch all lectures from the database
        const lectures = await Lecture.find();

        // Return the fetched data as JSON response
        return new NextResponse(JSON.stringify(lectures));
    } catch (error) {
        console.error('Error fetching lectures:', error.message);
        return new NextResponse("Error fetching lectures", { status: 500 });
    }
};


export const POST = async ({ request }) => {
    try {
        // Connect to the database
        await connectDB();

        // Parse the incoming request body
        const data = await request.json();

        // Create a new lecture document using the parsed data
        const newLecture = new Lecture(data);

        // Save the new lecture document to the database
        await newLecture.save();

        return new NextResponse("Lecture added successfully");
    } catch (error) {
        console.error('Error adding lecture:', error.message);
        return new NextResponse("Error adding lecture", { status: 500 });
    }
};
