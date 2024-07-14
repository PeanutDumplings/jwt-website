import { decodeJwt, SignJWT } from "jose";
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

  const decoded = decodeJwt(jwt);

  return NextResponse.json({
    success: true,
    message: "Successfully decoded JWT",
    data: decoded,
  });
}
