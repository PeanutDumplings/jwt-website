import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => {
    return NextResponse.json(
      { success: false, message: "Invalid body" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  });

  body.secret;
  if (!body.secret) {
    return NextResponse.json(
      { success: false, message: "No secret provided" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = body.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json(
      { success: false, message: "No data provided" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const algorithms = [
    "HS256",
    "HS384",
    "HS512",
    "PS256",
    "PS384",
    "PS512",
    "RS256",
    "RS384",
    "RS512",
    "ES256",
    "ES384",
    "ES512",
    "EdDSA",
  ];

  const algorithm = body.algorithm;
  if (!algorithm || !algorithms.includes(algorithm)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid algorithm",
        validAlgorithm: algorithms,
      },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const expiry = body.expiry;
  if (
    !expiry ||
    typeof expiry !== "number" ||
    expiry < 0 ||
    Number.isInteger(expiry) === false
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "No expiry provided. Expiry must be a positive integer and in seconds",
      },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const secret = new TextEncoder().encode(body.secret);
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return NextResponse.json({
    success: true,
    message: "Successfully encoded JWT",
    jwt,
  });
}
