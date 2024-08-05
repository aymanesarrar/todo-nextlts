import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// our jwt secret key
const key = new TextEncoder().encode(process.env.SECRET);

const cookie: {
  name: string;
  options: Partial<ResponseCookie>;
  duration: number;
} = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

// our jwt manupulation functions
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

// this is a helper function for creating a new session, we will use this after the user logs in or signs up
export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });
  cookies().set(cookie.name, session, { ...cookie.options, expires });
}
export async function verifySession() {
  const session = await decrypt(cookies().get(cookie.name)?.value);
  if (!session?.userId) {
    return null;
  }
  return { userId: session.userId };
}
export async function deleteSession() {
  cookies().delete(cookie.name);
  redirect("/login");
}
