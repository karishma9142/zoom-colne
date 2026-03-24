import { ReactNode, useEffect, useState } from "react";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User
} from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({children} : {children : ReactNode}) => {
    const [videoClient , setVideoClient] = useState<StreamVideoClient>();

    useEffect(() => {

    } , [])
  return (
    <StreamVideo client={videoClient}>
     
    </StreamVideo>
  );
};

