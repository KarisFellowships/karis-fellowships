"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical application error:", error);
    try {
      fetch("/api/client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "global",
          message: error?.message ?? String(error),
          digest: error?.digest ?? "",
          path: typeof window !== "undefined" ? window.location.pathname : "",
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* never let reporting break the error screen */
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#1e293b", fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "3.75rem", fontWeight: 700, color: "#f06050", margin: 0 }}>
            Error
          </p>
          <h1 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 600, color: "#fff" }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "0.75rem", maxWidth: "28rem", color: "rgba(255,255,255,0.6)" }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "#0d9488",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          {error.digest && (
            <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              Reference code: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
