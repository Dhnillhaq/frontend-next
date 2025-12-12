"use client";

import { useState } from "react";
import { createProductionLine } from "@/services/productionLineService";

export default function NewProductionLineForm() {
  const [lineCode, setLineCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProductionLine({ lineCode });

      setLineCode("");
      // cara simpel: reload halaman biar data ke-refresh
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Tambah Production Line</h2>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Masukkan Line Code"
          value={lineCode}
          onChange={(e) => setLineCode(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            flex: 1,
            minWidth: 150,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#4b5563" : "#22c55e",
            color: "black",
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "Saving..." : "Simpan"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
      )}
    </form>
  );
}
