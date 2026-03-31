import { cn } from "@/lib/utils";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dice1, LayoutIcon, LayoutList, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./loader";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'
const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom =!!searchParams.get('personal')
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();

    if(callingState !== CallingState.JOINING) return <Loader/>
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }
    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center
            justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2',
                    { 'block': showParticipants })}>
                    <CallParticipantsList onClose={() =>
                        setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full
            items-center justify-center gap-5 flex-wrap">
                <CallControls />

                <DropdownMenu>
                    <div className="flex items-center">

                        <DropdownMenuTrigger className="cursor-pointer
                        rounded-2xl hover:bg-[#4c535b] px-4 py-2 bg-[#19232d]">
                            <LayoutList size={20} className="text-white"/>
                        </DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent className="border-[#1B1E2D] bg-[#1B1E2D] text-white">
                        {['Grid' , 'Speaker-Left' , 'Speaker-Right'].
                        map((item , index) => (
                            <div key={index}>
                                <DropdownMenuItem className="cursor-pointer"
                                onClick={() => {
                                    setLayout(item.toLowerCase() as CallLayoutType)
                                }}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="border-x-[#1B1E2D]"/>
                            </div>
                        ))}
                        
                        
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton/>
                <button onClick={() => setShowParticipants
                    ((prev) => !prev)}>
                        <div className="cursor-pointer rounded-2xl
                        hover:bg-[#4c535b] px-4 py-2 bg-[#19232d]">
                            <User size={20}/>
                        </div>

                </button>
                {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
    )
}

export default MeetingRoom;