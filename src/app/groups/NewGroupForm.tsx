"use client";

import { useState } from "react";
import { createGroup } from "@/services/groupService";

export default function NewGroupForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createGroup({ name });

      setName("");
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
      <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Tambah Group</h2>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1,
            minWidth: 150,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
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
