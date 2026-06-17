import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

const ALLOWED_ORIGINS = [
  "https://inbox-commander-eight.vercel.app",
  "https://inbox-commander-orcin.vercel.app",
];

function getCorsOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  return null;
}

function addCorsHeaders(response: Response, request: Request) {
  const origin = getCorsOrigin(request);
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return response;
}

export function OPTIONS(request: Request) {
  return addCorsHeaders(new Response(null, { status: 204 }), request);
}

export async function GET(request: Request) {
  const response = await handler.GET(request);
  return addCorsHeaders(response, request);
}

export async function POST(request: Request) {
  const response = await handler.POST(request);
  return addCorsHeaders(response, request);
}
