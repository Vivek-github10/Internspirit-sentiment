import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";
import { validateRegistration } from "@/utils/validation";

export async function POST(request) {
  try {
    await connectDB();

    const userData = await request.json();

    // Validate input
    const { isValid, errors } = validateRegistration(userData);
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password, // Password will be hashed by the pre-save hook
    });

    // Return success response without password
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
