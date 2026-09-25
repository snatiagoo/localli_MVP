"use client";

import { useState } from "react";
import { guidanceArray } from "@/lib/guidance/guidance-photos";
import { renderWithBold } from "@/lib/utils/render-with-bold";
import Image from "next/image";

export default function GuidancePage() {
  const [activeId, setActiveId] = useState(guidanceArray[0].id);

  // Falls back to the first item if activeId somehow doesn't match anything
  // — .find() always returns T | undefined, this just satisfies that.
  const activeIndex = guidanceArray.findIndex((item) => item.id === activeId);
  const activeGuidance = guidanceArray[activeIndex] ?? guidanceArray[0];

  return (
    <main className="flex flex-1">
      <nav className="w-64 shrink-0 border-r border-border flex flex-col p-4 gap-1">
        {guidanceArray.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`text-left rounded-[10px] px-4 py-3 text-sm font-semibold ${
              item.id === activeId ? "bg-primary text-white" : "hover:bg-surface"
            }`}
          >
            {item.title}
          </button>
        ))}
      </nav>

      <div className="flex-1 p-8 flex flex-row items-center justify-center gap-8 ">
        <div className="flex bg-surface rounded-2xl shadow-2xl p-8 gap-8">
            {activeGuidance.image && (
                <Image
                src={activeGuidance.image}
                alt={activeGuidance.title}
                width={1179}
                height={2556}
                className="max-h-[calc(90vh-4rem)] w-auto"
          />
            )}
            <div className="max-w-sm flex flex-col gap-3">
                <span className="text-xs font-bold tracking-wider text-accent">
                    PASO {activeIndex + 1} DE {guidanceArray.length}
                </span>
                <p className="font-display text-3xl font-bold m-0">{activeGuidance.title}</p>
                <p className="text-lg leading-relaxed text-muted m-0">
                    {renderWithBold(activeGuidance.description)}
                </p>
            </div>
        
        </div>
      </div>
    </main>
  );
}
