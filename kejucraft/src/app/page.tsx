'use client'
import Image from "next/image";
import CustomButton from "./components/CustomButton";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/images/landing-bg.jpeg')" }}
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 backdrop-blur-xs" />
      
      {/* Title section */}
      <div className="relative z-10 flex flex-col items-center justify-center left-10 pt-16">
        <Image src="/images/Title.png" width={800} height={800} alt="title" className="mb-2" />
      </div>
      
      <div className="relative z-20 flex flex-col items-center gap-4 mt-16 mx-auto max-w-4xl px-4">
        <CustomButton 
          link="/site/formpage"
          searchType="bfs" 
          className="w-full max-w-[733px] h-[74px] bg-gray-500/80 hover:bg-gray-600/80 flex items-center justify-center text-white text-2xl"
        >
          Breadth-First Search
        </CustomButton>
        
        <CustomButton 
          link="/site/formpage" 
          searchType="dfs"
          className="w-full max-w-[733px] h-[74px] bg-gray-500/80 hover:bg-gray-600/80 flex items-center justify-center text-white text-2xl"
        >
          Depth-First Search
        </CustomButton>
        
        <CustomButton 
          link="/site/formpage"
          searchType="bi" 
          className="w-full max-w-[733px] h-[74px] bg-gray-500/80 hover:bg-gray-600/80 flex items-center justify-center text-white text-2xl"
        >
          Bidirectional Search
        </CustomButton>
        
        {/* Bottom row buttons with proper spacing */}
        <div className="flex flex-row justify-between w-full max-w-[733px] mt-6" >
          <div title={"Mager bang maaf yak"}>
            <CustomButton 
              className="w-[333px] h-[74px] bg-gray-500/80 hover:bg-gray-600/80 flex items-center justify-center text-white text-2xl"
              
            >
              About
            </CustomButton>
          </div>

          
          <CustomButton 
            link="/site/howtoplay"
            className="w-[333px] h-[74px] bg-gray-500/80 hover:bg-gray-600/80 flex items-center justify-center text-white text-2xl"
          >
            How to Play
          </CustomButton>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="absolute bottom-6 left-6 text-white text-[36px]" style={{fontFamily: 'Minecraft'}}>
        Tugas Besar Stima 2.0
      </div>
      
      <div className="absolute bottom-6 right-6 text-white text-[36px]" style={{fontFamily: 'Minecraft'}}>
        Kelompok Bagi Kopi Ciumbuleuit
      </div>
    </div>
  );
}