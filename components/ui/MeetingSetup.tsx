"use client"

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./button";

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete : (value : boolean) => void}) => {
    const [isMicCamToggledOn , setIsMicCamTaggledOn] = useState(false);
    const call = useCall();

    if(!call){
        throw new Error('usecall must be used within StreamCall componenet')
    }
    useEffect(() => {
        if(isMicCamToggledOn){
            call?.microphone.disable();
            call?.camera.disable();
        }else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    } ,[isMicCamToggledOn , call?.camera,call?.microphone])
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-2xl font-bold ">
                Setup
            </h1>

            <VideoPreview className="h-96 w-96"/>

            <div className="flex flex-col h-16 items-center justify-center gap-2">
                <label className="felx items-center justify-center gap-2 font-medium">
                    <input 
                    type="checkbox"
                    checked={isMicCamToggledOn}
                    onChange={(e) => setIsMicCamTaggledOn(e.target.checked)}
                    />
                    join with mic and camera off
                </label>
                <DeviceSettings/>
                <Button className="rounded-md bg-green-500 p-5"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}>
                    Join meeting 
                </Button>
            </div>
        </div>
    )
}

export default MeetingSetup;