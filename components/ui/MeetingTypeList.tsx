'use client'

import Image from "next/image";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState , setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const createMeeting = () => {
        
    }

    return (
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


        <HomeCard icon="/icons/add-meeting.svg" title="New Meeting" 
        discription="Start an instant meeting" background="#FC7532" 
        onClickHandler={()=>setMeetingState('isJoiningMeeting')}/>

        
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