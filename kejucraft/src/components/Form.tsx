import Image from "next/image";
import SwitchButton from "./SwitchButton";

export default function Form() {
  return (
    <div className="w-[1400px] h-[850px] bg-[#EDEDED] rounded-2xl p-6 shadow-md mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center" style={{ fontFamily: 'Minecraft' }}>
        <div className="flex space-x-10">
          <button className="text-gray-800 text-2xl font-bold">Breadth-First Search</button>
          <button className="text-gray-400 text-2xl font-bold">Depth-First Search</button>
          <button className="text-gray-400 text-2xl font-bold">Bidirectional Search</button>
        </div>
        <button className="text-gray-600 text-2xl font-bold">X</button>
      </div>

      {/* Input Bar */}
      <div className="flex items-center justify-between w-full space-x-4" style={{ fontFamily: 'Minecraft' }}>
        <SwitchButton />

        {/* Elemen Input */}
        <div className="flex items-center space-x-2">
          <label className="text-black text-[28px]">Elemen :</label>
          <input
            type="text"
            className="bg-[#6B6B6B] text-white px-2 w-[400px] h-[48px] rounded text-[20px]"
          />
        </div>

        {/* Max Resep Input */}
        <div className="flex items-center space-x-2">
          <label className="text-black text-[28px]">Max Resep :</label>
          <input
            type="text"
            className="bg-[#6B6B6B] text-white px-2 w-[120px] h-[48px] rounded text-[20px]"
          />
        </div>

        <button className="rounded hover:brightness-110 p-1">
          <Image src="/images/search.png" width={48} height={48} alt="Search" />
        </button>
      </div>

      {/* Display Area + Pagination */}
      <div className="bg-[#6D6D6D] w-[1350px] h-[650px] rounded-md flex flex-col justify-between px-4 py-3">
        {/* Main Display Content */}
        <div className="flex-1">
          {/* Konten resep atau hasil pencarian akan masuk di sini */}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-12 text-white text-[28px]" style={{ fontFamily: 'Minecraft' }}>
          <button>{'<'}</button>
          <div className="text-xl">1</div>
          <div className="text-xl">2</div>
          <div className="text-xl">3</div>
          <button>{'>'}</button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-gray-700 text-[20px]" style={{ fontFamily: 'Minecraft' }}>
        <div>Waktu Eksekusi: 80ms</div>
        <div>Node Dikunjungi: 42</div>
        <div>Jumlah Resep: 3</div>
      </div>
    </div>
  );
}
