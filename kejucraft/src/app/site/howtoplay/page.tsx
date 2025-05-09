import React from "react";
import Book from "../../components/Book";

const HowToPlay = () => {
    return (
        <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/howtouse-bg.png')" }}>
            <div className="flex justify-center items-center translate-y-1/16">
                <Book/>
            </div>
            
        </div>
    )
}

export default HowToPlay;