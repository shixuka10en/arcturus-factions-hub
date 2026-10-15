import { AlertTriangle, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

type CopyStatus = "idle" | "copied" | "failed";

type CopyServerAddressButtonProps = {
  compact?: boolean;
  variant?: "primary" | "outline";
};

async function copyText(value: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // The document-based fallback below also works when clipboard permission
      // is unavailable, which is common in previews and older browsers.
    }
  }

  if (typeof document === "undefined") return false;

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "true");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  document.body.removeChild(input);
  return copied;
}

export function CopyServerAddressButton({
  compact = false,
  variant = "primary",
}: CopyServerAddressButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== undefined) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleCopy() {
    const copied = await copyText(siteConfig.serverAddress);
    setStatus(copied ? "copied" : "failed");
    if (resetTimer.current !== undefined) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2200);
  }

  const label =
    status === "copied"
      ? "IP copied"
      : status === "failed"
        ? "Copy failed"
        : siteConfig.serverAddress;
  const Icon = status === "copied" ? Check : status === "failed" ? AlertTriangle : Copy;

  if (compact) {
    return (
      <div className="relative inline-flex items-center">
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-border bg-background/70 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary active:scale-95 px-3 sm:px-4 cursor-pointer"
          onClick={handleCopy}
          aria-label={`Copy server address ${siteConfig.serverAddress}`}
          title={
            status === "failed"
              ? `Copy failed. Server address: ${siteConfig.serverAddress}`
              : undefined
          }
        >
          <Icon
            size={18}
            className={status === "copied" ? "text-primary" : ""}
            aria-hidden="true"
          />
          <span className="hidden sm:inline">{label}</span>
        </button>
        {status === "copied" && (
          <span className="pointer-events-none absolute -bottom-7 right-0 z-50 rounded bg-primary px-2 py-0.5 text-[0.65rem] font-bold uppercase text-primary-foreground shadow-md sm:hidden whitespace-nowrap">
            IP Copied!
          </span>
        )}
      </div>
    );
  }

  const subLabel =
    status === "copied"
      ? "Copied to clipboard!"
      : status === "failed"
        ? "Click to retry"
        : "Click to copy IP";

  return (
    <button
      type="button"
      className="group relative flex w-full flex-col overflow-hidden rounded-sm border border-primary bg-primary text-primary-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:translate-y-0.5 cursor-pointer sm:w-auto"
      onClick={handleCopy}
      aria-label="Copy server IP"
      title={
        status === "failed" ? `Copy failed. Server address: ${siteConfig.serverAddress}` : undefined
      }
    >
      <div className="flex h-10 sm:h-11 items-center justify-center gap-2 px-6">
        <Icon
          size={20}
          aria-hidden="true"
          className={
            status === "copied" ? "scale-110 text-primary-foreground transition-transform" : ""
          }
        />
        <span className="font-bold uppercase tracking-wider text-sm sm:text-base">
          {siteConfig.serverAddress}
        </span>
      </div>
      <div className="flex h-[18px] sm:h-5 w-full items-center justify-center bg-[var(--deep-accent)] px-3 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-widest text-primary-foreground/90 transition-colors group-hover:bg-[var(--deep-accent)]/85">
        {subLabel}
      </div>
      {status === "failed" && (
        <span className="sr-only" role="status">
          Clipboard access failed. The server address is {siteConfig.serverAddress}.
        </span>
      )}
    </button>
  );
}
