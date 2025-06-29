"use client";

import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function HeroSection() {
  const { openConnectModal } = useConnectModal();

  return (
    <section className="min-h-dvh lg:max-h-[1080px] lg:py-20 p-6 lg:px-8 bg-gradient-to-b from-slate-900 via-gray-800 to-black container mx-auto flex flex-col lg:flex-row gap-2 items-center">
      <div className="lg:max-w-xl space-y-4">
        <div>
          <p className="italic">Stake. Predict. Conquer.</p>
          <h1 className="font-bold text-3xl lg:text-5xl">
            Turn your LP tokens into skill-based battles for rewards.
          </h1>
        </div>
        <p>
          Liquid Arena lets you stake your LP positions in real-time price
          prediction duels. Outsmart your opponent, survive the price range, and
          win both LPs. No luck, just skill.
        </p>
        <Button
          onClick={openConnectModal}
          className="bg-gradient-to-r from-slate-700 to-gray-800 py-5 text-white hover:scale-105 transition-all duration-300 ease-in-out"
        >
          🔥Enter The Arena
        </Button>
      </div>
      <div className="lg:w-1/2 h-full">
        <Image
          src="/hero-section.png"
          alt="hero image"
          width={512}
          height={512}
          className="w-full h-auto mix-blend-exclusion rotate-6 saturate-50 opacity-20"
        />
      </div>
    </section>
  );
}
