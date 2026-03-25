import { ReactNode, useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    if (!apiKey) {
      throw new Error("Stream API key missing");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl, 
      },
      tokenProvider 
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser(); // ✅ cleanup
    };
  }, [user, isLoaded]);

  if (!videoClient) return null; // or loading spinner

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};