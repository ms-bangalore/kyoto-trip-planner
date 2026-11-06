"use client";

import { useEffect, useRef, useState } from "react";
import StayCard from "@/components/StayCard";
import ExperienceCard from "@/components/ExperienceCard";
import FoodCard from "@/components/FoodCard";
import ThinkingDots from "@/components/ThinkingDots";
import { fetchTripPlan, BUDGET_USD } from "@/lib/mockResponse";
import type { TripCard } from "@/lib/types";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; kind: "thinking" }
  | { id: number; role: "assistant"; kind: "cards"; cards: TripCard[] }
  | { id: number; role: "assistant"; kind: "error"; request: string };

let nextId = 1;

function tripTotal(cards: TripCard[]) {
  return cards.reduce((sum, c) => {
    if (c.cardType === "stay") return sum + c.details.totalUsd;
    if (c.cardType === "experience") return sum + c.details.totalUsd;
    return sum + c.details.estCostUsd;
  }, 0);
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function plan(request: string) {
    setBusy(true);
    const thinkingId = nextId++;
    setMessages((m) => [...m, { id: thinkingId, role: "assistant", kind: "thinking" }]);

    let cards: TripCard[] = [];
    try {
      cards = await fetchTripPlan();
    } catch {
      cards = [];
    }

    // Never leave the thread blank: no cards (or broken data) = friendly error bubble.
    setMessages((m) =>
      m.map((msg) =>
        msg.id !== thinkingId
          ? msg
          : cards.length === 3
            ? { id: thinkingId, role: "assistant", kind: "cards", cards }
            : { id: thinkingId, role: "assistant", kind: "error", request },
      ),
    );
    setBusy(false);
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { id: nextId++, role: "user", text }]);
    setInput("");
    plan(text);
  }

  function retry(errorId: number, request: string) {
    if (busy) return;
    setMessages((m) => m.filter((msg) => msg.id !== errorId));
    plan(request);
  }

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      <header className="flex items-center gap-3 border-b border-stone-200 bg-white px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF385C] text-lg font-bold text-white">
          K
        </div>
        <div>
          <h1 className="font-semibold leading-tight">Kyoto Trip Planner</h1>
          <p className="text-xs text-stone-500">Plan your whole weekend in one chat · 11–13 Apr 2025</p>
        </div>
      </header>

      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {messages.length === 0 && (
          <div className="rounded-2xl bg-white p-4 text-sm text-stone-600 shadow-sm">
            Hi! Tell me about your Kyoto weekend and I&apos;ll pick a stay, an experience and a food
            spot for you. Try: <span className="font-medium text-stone-800">&ldquo;Plan a weekend in Kyoto for two&rdquo;</span>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-stone-900 px-4 py-2.5 text-white">
                  {msg.text}
                </p>
              </div>
            );
          }
          if (msg.kind === "thinking") {
            return (
              <div key={msg.id} className="inline-block rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                <ThinkingDots />
              </div>
            );
          }
          if (msg.kind === "error") {
            return (
              <div key={msg.id} className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white p-4 shadow-sm">
                <p className="text-sm">
                  Sorry, I couldn&apos;t put your Kyoto weekend together just now. Let&apos;s give it another go.
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => retry(msg.id, msg.request)}
                    disabled={busy}
                    className="rounded-full bg-[#FF385C] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    Try again
                  </button>
                </div>
              </div>
            );
          }
          const total = tripTotal(msg.cards);
          return (
            <div key={msg.id} className="space-y-3">
              <p className="text-sm text-stone-600">
                Here&apos;s your Kyoto weekend for two: ${total} of your ${BUDGET_USD} budget.
              </p>
              {msg.cards.map((c) =>
                c.cardType === "stay" ? (
                  <StayCard key="stay" d={c.details} />
                ) : c.cardType === "experience" ? (
                  <ExperienceCard key="exp" d={c.details} />
                ) : (
                  <FoodCard key="food" d={c.details} />
                ),
              )}
            </div>
          );
        })}
        <div ref={endRef} />
      </main>

      <form onSubmit={send} className="flex gap-2 border-t border-stone-200 bg-white p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          placeholder={busy ? "Planning your trip…" : "Describe your Kyoto trip"}
          className="flex-1 rounded-full border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-stone-500 disabled:bg-stone-100 disabled:text-stone-400"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded-full bg-stone-900 px-5 text-sm font-semibold text-white disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
