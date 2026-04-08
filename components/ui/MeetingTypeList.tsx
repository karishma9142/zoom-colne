'use client'

import Image from "next/image";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"
import { Textarea } from "./textarea";
import ReactDatePicker from 'react-datepicker'
import Loader from "./loader";
import { Input } from "./input";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>();
    const createMeeting = async () => {
        if (!client || !user) return

        try {
            if (!values.dateTime) {
                toast('please select a date and time');
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id)
            if (!call) {
                throw new Error('failed to create call')
            }

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast('meeting created')
        } catch (error) {
            console.log(error);
            toast('failed to create')
        }
    }
    if (!client || !user) return <Loader/>;
    const meetingLink = `${process.env. NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


            <HomeCard icon="/icons/add-meeting.svg" title="New Meeting"
                discription="Start an instant meeting" background="#FC7532"
                onClickHandler={() => setMeetingState('isInstantMeeting')} />


            <HomeCard icon="/icons/Schedule.svg" title="Schedule Meeting"
                discription="Plan your  meeting" background="#1977F0"
                onClickHandler={() => setMeetingState('isScheduleMeeting')} />


            <HomeCard icon="/icons/recordings.svg" title="View Recordings"
                discription="Cheak out your recordings" background="#7A0EFD"
                onClickHandler={() => router.push('/recordings')} />


            <HomeCard icon="/icons/join-meeting.svg" title="Join Meeting"
                discription="via invitation link" background="#B98423"
                onClickHandler={() => setMeetingState('isJoiningMeeting')} />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Create Meeting'
                    buttonText="Schedule Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22.4px]
                        text-[#0E79F9]">
                            Add a description
                        </label>
                        <Textarea className="border-none bg-[#252941]
                        focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }} />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22.4px]
                        text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date: Date | null) => {
                                if (date) {
                                    setValues({ ...values, dateTime: date });
                                }
                            }}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d , yyyy h:mm aa"
                            className="w-full rounded bg-[#252941] p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Created'
                    className='text-center'
                    // buttonText="Start Meeting"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast('Link copied')
                    }}
                    image={'/icons/checked.svg'}
                    buttonIcon="/icons/copy.svg"
                    buttonText='Copy Meeting Link'

                />
            )}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Type The Link Here'
                className='text-center cursor-pointer'
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input placeholder="Meeting Link" className="bg-[#252941] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => {setValues({...values , link : e.target.value})}}
                ></Input>
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList;