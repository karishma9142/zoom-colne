import { ReactNode } from "react";

interface meetingProp {
    isOpen : boolean;
    onClose : ()=>void;
    title : string;
    className? : string;
    buttonText : string;
    handleClick : ()=>void;
    children? :ReactNode; 
    buttonIcon? : string
}

const MeetingModal = ({isOpen , onClose , title,className,buttonText,handleClick ,children,buttonIcon} : meetingProp) => {
    return (
        <div>
            meeting modal
        </div>
    )
}

export default MeetingModal;