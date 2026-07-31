"use client";

import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";
import { PAGES } from "@/lib/pages";
import { CHATBOT_NAME } from "@/lib/site";

interface Message {
  role: "bot" | "user";
  content: ReactNode;
}

const PRESETS: { label: string; answer: ReactNode }[] = [
  {
    label: "How do I download Bet939?",
    answer: (
      <>
        Use the Android APK steps on the{" "}
        <Link href={PAGES.download.path}>Bet939 Game Download</Link> page. iPhone
        users should follow the{" "}
        <Link href={PAGES.ios.path}>Bet939 for iOS</Link> guide instead of APK
        files.
      </>
    ),
  },
  {
    label: "How do I log in?",
    answer: (
      <>
        Open the app, tap Login, and enter your registered mobile number and
        password. Full steps and troubleshooting are on the{" "}
        <Link href={PAGES.login.path}>Bet939 Login</Link> guide.
      </>
    ),
  },
  {
    label: "How do I deposit money?",
    answer: (
      <>
        Deposits are managed from the wallet section. Read the{" "}
        <Link href={PAGES.deposit.path}>Bet939 deposit guide</Link> for JazzCash,
        Easypaisa, bank transfer, and pending-payment help.
      </>
    ),
  },
  {
    label: "How do I withdraw money?",
    answer: (
      <>
        Withdrawals are submitted from the wallet section after checking balance
        and verification. See the{" "}
        <Link href={PAGES.withdrawal.path}>Bet939 withdrawal guide</Link> for
        limits and common issues.
      </>
    ),
  },
  {
    label: "Does Bet939 work on iPhone?",
    answer: (
      <>
        Yes, through the Safari installation method described on the{" "}
        <Link href={PAGES.ios.path}>Bet939 for iOS</Link> page. Do not install
        Android APK files on iPhone.
      </>
    ),
  },
  {
    label: "Can I use Bet939 on PC?",
    answer: (
      <>
        You can use a supported browser or an Android emulator. Follow the{" "}
        <Link href={PAGES.pc.path}>Bet939 for PC</Link> guide.
      </>
    ),
  },
  {
    label: "Where can I see available games?",
    answer: (
      <>
        The homepage includes a concise Available Games overview. Visit the{" "}
        <Link href={PAGES.home.path}>Bet939</Link> homepage for categories and
        selected examples.
      </>
    ),
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: (
        <>
          Hi — I am the {CHATBOT_NAME}. I can point you to download, login,
          deposit, withdrawal, iPhone, PC, and games guides on this website. I am
          not official Bet939 support and never ask for passwords, OTPs, or wallet
          PINs.
        </>
      ),
    },
  ]);
  const panelId = useId();

  useEffect(() => {
    document.body.classList.toggle("chat-open", open);
    return () => document.body.classList.remove("chat-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (preset: (typeof PRESETS)[number]) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: preset.label },
      { role: "bot", content: preset.answer },
    ]);
  };

  return (
    <div className="chatbot-root">
      {open ? (
        <div
          className="chat-panel"
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label={CHATBOT_NAME}
        >
          <div className="chat-header">
            <div>
              <strong>{CHATBOT_NAME}</strong>
              <p>Local website guide — not official Bet939 support</p>
            </div>
            <button
              type="button"
              className="chat-close"
              aria-label="Close guide assistant"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="chat-body" aria-live="polite">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-presets">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => ask(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="chat-launch"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close guide assistant" : "Open guide assistant"}
        onClick={() => setOpen((v) => !v)}
      >
        Help
      </button>
    </div>
  );
}
