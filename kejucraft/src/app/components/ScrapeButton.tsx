import Image from "next/image";
import { useState } from "react";

export default function ScrapeButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleScrape = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("http://localhost:8080/api/scrape", {
        method: "POST",
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("✅ Scraping berhasil!");
    } catch (err: any) {
      setStatus("❌ Gagal scraping: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <div className="relative w-[60px] h-[60px]">
      {/* Pop-up Notification */}
      {status && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 rounded shadow z-10 whitespace-nowrap">
          {status}
        </div>
      )}
      <button
        onClick={handleScrape}
        className="bg-[#6B6B6B] w-[60px] h-[60px] rounded flex items-center justify-center hover:brightness-110 transition"
        disabled={loading}
        title="Lakukan scraping data"
      >
        <Image src="/images/scrape.jpeg" alt="Scrape" width={50} height={50} />
      </button>
    </div>
  );
}
