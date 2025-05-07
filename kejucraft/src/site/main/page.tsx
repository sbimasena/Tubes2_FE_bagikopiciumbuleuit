'use client'
import Image from "next/image";
import React from "react";
import CustomButton from "@/src/components/CustomButton";
import Form from "@/src/components/Form"

const Main = () => {
    return (
        <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/main-bg.svg')" }}>
            <div className = "flex items-center justify-center pt-16">
                <Form/>
            </div>
            
        </div>
    )
}

export default Main;