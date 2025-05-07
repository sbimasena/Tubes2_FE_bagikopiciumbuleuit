'use client'
import Image from "next/image";
import React from "react";
import CustomButton from "@/src/components/CustomButton";
import Main from "@/src/site/main/page";

const Landing = () => {
  return (
    <div
    className="relative min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/landing-bg.jpeg')" }}
    >
    <div className="absolute inset-0 bg-white/2 backdrop-blur-xs" />
        <div className="relative z-10 flex flex-col items-center left-[40px] top-[80px] min-h-screen">
            <Image src="/images/Title.png" width={1000} height={1000} alt="title" />
        </div>
        <div className="absolute left-1/2 bottom-45 flex-col transform -translate-x-1/2 flex gap-8">
            <CustomButton type="search" link="/site/main/page" className="w-[733px] h-[74px]">Breadth-First Search</CustomButton>
            <CustomButton type="search" className="w-[733px] h-[74px]">Depth-First Search</CustomButton>
            <CustomButton type="search" className="w-[733px] h-[74px]">Bidirectional Search</CustomButton>
            <div className="flex flex-row gap-17">
                <CustomButton type="search" className="w-[333px] h-[74px]">How to Play</CustomButton>
                <CustomButton type="search" className="w-[333px] h-[74px]">About</CustomButton>
            </div>

        </div>
        <div className="absolute bottom-4 left-4 text-white text-sm text-[36px]" style={{fontFamily : 'Minecraft'}}>
        Tugas Besar Stima 2.0
        </div>
        <div className="absolute bottom-4 right-4 text-white text-sm text-[36px]" style={{fontFamily : 'Minecraft'}}>
        Kelompok Bagi Kopi Ciumbuleuit
        </div>
    </div>
  );
}

export default Landing;
