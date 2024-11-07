// pages/index.js
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="text-black bg-black1 text-whites" style={{paddingTop: "80px", minHeight: "100vh" }}>
      <Header />
      <div className="">
        <h1>Hello, Next.js with Dark Mode!</h1>
        <p>This is the landing page.</p>
      </div>
    </div>
  );
}
