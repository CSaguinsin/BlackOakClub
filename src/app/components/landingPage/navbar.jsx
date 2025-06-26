import React from "react";
import Image from "next/image";


export default function Navbar () {
    return (
        <>
        <div className="relative w-24 h-24">
            <Image
                src="/Logos/secondaryLogo.png"
                alt="SDFM 2520"
                fill
                className="object-contain"
                priority
            />
        </div>
        </>
    )
}