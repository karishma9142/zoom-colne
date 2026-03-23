'use client'

import Image from "next/image";

interface cardprop {
    icon: string;
    title: string;
    background: string;
    discription: string;
    onClickHandler: () => void;
}

const HomeCard = ({ icon, background, title, discription ,onClickHandler}: cardprop) => {
    return (
        <div 
            style={{ background }}
            className="px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
        onClick={onClickHandler}>
            <div className="flex justify-center items-center bg-white/10 backdrop-blur-md size-12 rounded-[12px]">
                <Image src={icon} width={27} height={27} alt="meeting" />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{discription}</p>
            </div>
        </div>
    );
};

export default HomeCard;