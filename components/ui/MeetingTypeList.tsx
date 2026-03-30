'use client'

import Image from "next/image";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState , setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const {user} = useUser();
    const client = useStreamVideoClient();
    const [values , setValues] = useState({
        dateTime : new Date(),
        description : '',
        link : ''
    })
    const [callDetails , setCallDetails] = useState<Call>();
    const createMeeting =async () => {
        if(!client || !user) return

        try {
            if(!values.dateTime){
                toast('please select a date and time');
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id)
            if(!call){
                throw new Error('failed to create call')
            }

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data : {
                    starts_at : startsAt,
                    custom : {
                        description : description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast('meeting created')
        } catch (error) {
            console.log(error);
            toast('failed to create')
        }
    }

    return (
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


        <HomeCard icon="/icons/add-meeting.svg" title="New Meeting" 
        discription="Start an instant meeting" background="#FC7532" 
        onClickHandler={()=>setMeetingState('isInstantMeeting')}/>

        
        <HomeCard icon="/icons/Schedule.svg" title="Schedule Meeting" 
        discription="Plan your  meeting" background="#1977F0"
        onClickHandler={() => setMeetingState('isScheduleMeeting')}/>


        <HomeCard icon="/icons/recordings.svg" title="View Recordings" 
        discription="Cheak out your recordings" background="#7A0EFD"
        onClickHandler={() => router.push('/recordings')}/>


        <HomeCard icon="/icons/join-meeting.svg" title="Join Meeting" 
        discription="via invitation link" background="#B98423"
        onClickHandler={() => setMeetingState('isJoiningMeeting')}/>

        <MeetingModal
        isOpen = {meetingState === 'isInstantMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = 'Start an Instant Meeting'
        className = 'text-center'
        buttonText = "Start Meeting"
        handleClick = {createMeeting}
        />
       </section>
    )
}

export default MeetingTypeList;