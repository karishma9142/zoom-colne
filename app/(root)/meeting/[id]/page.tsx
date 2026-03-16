import React from "react";

const Meeting =async ({params} : {params : {id:string}})=>{
    const {id} = await params;
    return (
        <div>
            Meeting page #{id}
        </div>
    )
}

export default Meeting;