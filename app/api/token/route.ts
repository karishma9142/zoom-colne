import { tokenProvider } from "@/actions/stream.actions";

export async function GET() {
  try {
    const token = await tokenProvider();
    return Response.json({ token });
  } catch (error) {
    console.error("TOKEN ERROR:", error); 
    return new Response("Unauthorized", { status: 401 });
  }
}
