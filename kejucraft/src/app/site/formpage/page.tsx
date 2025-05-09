'use client'
import Image from "next/image";
import React from "react";
import Form from "@/src/app/components/Form";
import { useSearchParams } from "next/navigation";

const FormPage = () => {
    const searchParams = useSearchParams();
    const searchType = searchParams.get('type') as 'bfs' | 'dfs' | 'bi' || 'bfs'; 
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
            className="relative min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/main-bg.svg')" }}>
                <div className = "flex items-center justify-center pt-16">
                    <Form initialSearchType={searchType}/>
                </div>  
            </div>
        </div>
    )
}

export default FormPage;