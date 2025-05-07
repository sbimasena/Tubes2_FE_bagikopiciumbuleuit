import Image from "next/image";
import Landing from "../site/landing/page";
import Main from "../site/main/page";

export default function Home() {
  return (
    <div className= "w-full h-full">
      <Landing/>
      <Main/>
    </div>
  );
}
