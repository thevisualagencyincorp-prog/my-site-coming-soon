"use client";
import { useState, useEffect } from "react";

export function BSODWindow() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const bsodSteps = [
    "Initializing BSOD protocol...",
    "Gathering error information...",
    "Analyzing system failure...",
    "Attempting to recover...",
    "System recovery failed...",
    "Preparing error dump...",
    "Writing crash log...",
    "Contacting support...",
    "Error: Support not available...",
    "System halt initiated...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const newProgress = prev + Math.random() * 8;
        setCurrentStep(Math.floor((newProgress / 100) * bsodSteps.length));
        return newProgress;
      });
    }, 300);

    const onKey = (_e: KeyboardEvent) => {
      // Any key exits BSOD (more faithful to the prompt)
      window.dispatchEvent(new CustomEvent("closeBSODWindow"));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Blue Screen Prank"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10000,
        background: "#0000aa",
        color: "#fff",
        fontFamily: "Courier New, monospace",
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      {/* CRT scanline overlay (lightweight + gated) */}
      <div className="bsod-scanlines" aria-hidden />
      {/* BSOD Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          borderBottom: "2px solid #fff",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#fff",
          }}
        >
          Windows
        </div>
        <div
          style={{
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          <span className="bsod-flicker">
            A fatal exception 0E has occurred at 0028:C0011E36 in VxD VMM(01) +
            00010E36. The current application will be terminated.
          </span>
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          * Press any key to terminate the current application
          <span className="bsod-blink" style={{ marginLeft: 4 }}>_</span>
          <br />* Press CTRL+ALT+DEL again to restart your computer. You will
          lose any unsaved information in all applications.
        </div>
      </div>

      {/* Progress Section (moved under the press-any-key message) */}
      <div
        style={{
          background: "#000055",
          padding: "15px",
          border: "1px solid #fff",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          System Recovery in Progress...
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          <span>{bsodSteps[currentStep] || bsodSteps[0]}</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#000",
            border: "1px solid #fff",
            overflow: "hidden",
          }}
        >
          <div
            className="bsod-barber bsod-progressInner"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* Error Details */}
      <div style={{ flex: 1, marginBottom: "30px" }}>
        <div
          style={{
            fontSize: "12px",
            lineHeight: "1.4",
            marginBottom: "20px",
          }}
        >
          Error: 0E : 0028:C0011E36
          <br />
          VxD: VMM(01) + 00010E36
          <br />
          <br />
          The Agency OS™ has encountered a problem and needs to close.
          <br />
          We are sorry for the inconvenience.
          <br />
          <br />
          If you were in the middle of something, the information you were
          working on might be lost.
          <br />
          <br />
          Please tell Microsoft about this problem.
          <br />
          <br />
          The instruction at &quot;0x00000000&quot; referenced memory at
          &quot;0x00000000&quot;.
          <br />
          The memory could not be &quot;read&quot;.
          <br />
        </div>

        {/* Technical Info */}
        <div
          style={{
            fontSize: "11px",
            lineHeight: "1.3",
            opacity: "0.8",
          }}
        >
          *** STOP: 0x0000000E (0xC0000005, 0x00000000, 0x00000000, 0x00000000)
          <br />
          <br />
          IRQL_NOT_LESS_OR_EQUAL
          <br />
          <br />
          If this is the first time you&apos;ve seen this Stop error screen,
          restart your computer.
          <br />
          If this screen appears again, follow these steps:
          <br />
          <br />
          Check to make sure any new hardware or software is properly installed.
          <br />
          If this is a new installation, ask your hardware or software
          manufacturer for any Windows updates you might need.
          <br />
          <br />
          If problems continue, disable or remove any newly installed hardware
          or software.
          <br />
          Disable BIOS memory options such as caching or shadowing.
          <br />
          If you need to use Safe Mode to remove or disable components, restart
          your computer, press F8 to select Advanced Startup Options, and then
          select Safe Mode.
          <br />
          <br />
          Technical information:
          <br />
          <br />
          *** STOP: 0x0000000E (0xC0000005, 0x00000000, 0x00000000, 0x00000000)
          <br />
          <br />
          Beginning dump of physical memory
          <br />
          Physical memory dump complete
          <br />
          Contact your system administrator or technical support group for
          further assistance.
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          opacity: "0.7",
          borderTop: "1px solid #fff",
          paddingTop: "15px",
        }}
      >
        The Agency OS™
        <br />
        Copyright © 2024 The Visual Agency Inc. All rights reserved.
        <br />
        <br />
        Press any key to return to desktop
        <br />
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("closeBSODWindow"))}
          style={{
            marginTop: 12,
            padding: "8px 14px",
            color: "#0000aa",
            background: "#fff",
            border: "2px solid #fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Return to Desktop
        </button>
      </div>

      {/* Completion CTA overlay */}
      {progress >= 100 && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("closeBSODWindow"))}
            style={{
              padding: "12px 18px",
              color: "#0000aa",
              background: "#fff",
              border: "2px solid #fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Recovery complete — Return to Desktop
          </button>
        </div>
      )}

      {/* Fun Easter Egg */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "10px",
          opacity: "0.5",
        }}
      >
        🐛 Gotcha! You&apos;ve been pranked! But we had you going didnt we? ;)
      </div>
    </div>
  );
}
