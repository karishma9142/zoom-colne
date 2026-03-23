import MeetingTypeList from "@/components/ui/MeetingTypeList";
import React from "react";

const Home = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([] , {
        hour : '2-digit',
        minute : '2-digit',
        hour12 : true
    });
    const date = now.toLocaleDateString([] , {
        dateStyle : 'full',
    });
    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div
                className="h-[300px] w-full rounded-[20px] bg-cover flex flex-col justify-between p-7"
                style={{ backgroundImage: "url('/images/hero-background.png')" }}>
                <div>
                    <h2 className="bg-white/10 backdrop-blur-md text-white 
                        max-w-[280px] rounded py-2 text-center text-base font-normal">
                        Upcoming Meeting at : 12:30 PM
                    </h2>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold lg:text-7xl">
                        {time}
                    </h1>
                    <p className="text-[#C9DDFF] text-lg font-medium lg:text-2xl">{date}</p>
                </div>
            </div>

            <MeetingTypeList/>
        </section >
    )
}
export default Home;