import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => {
    return NextResponse.json(
      { success: false, message: "Invalid body" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  });

  const jwt = body.jwt;
  if (!jwt) {
    return NextResponse.json(
      { success: false, message: "No secret provided" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!body.secret) {
    return NextResponse.json(
      { success: false, message: "No secret provided" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const secret = new TextEncoder().encode(body.secret);
    await jwtVerify(jwt, secret);

    return NextResponse.json(
      { success: true, message: "Successfully verified JWT" },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "JWT could not be verified" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
