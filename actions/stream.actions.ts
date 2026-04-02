'use server'

import { auth } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;

export const tokenProvider = async () => {
  const { userId } =await auth(); 

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!apiKey) throw new Error("No API key");
  if (!apiSecret) throw new Error("No API secret");

  const client = new StreamClient(apiKey, apiSecret);

  const token = client.createToken(userId);

  return token;
};