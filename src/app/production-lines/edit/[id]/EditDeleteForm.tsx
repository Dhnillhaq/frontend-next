"use client";

import { useState } from "react";
import { updateProductionLine } from "@/services/productionLineService";
import { ProductionLine } from "@/types/ProductionLine";
import { useRouter } from "next/navigation";

type Props = {
  productionLine: ProductionLine;
};

export default function EditProductionLineForm({ productionLine }: Props) {
  const router = useRouter();
  const [lineCode, setLineCode] = useState(productionLine.lineCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateProductionLine(productionLine.id, { lineCode });
      router.push("/production-lines");
      router.refresh();
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
    <div>
      {/* Status Badge */}
      <div style={{ marginBottom: 16 }}>
        <span
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "600",
            backgroundColor: productionLine.isActive ? "#22c55e" : "#6b7280",
            color: "white",
          }}
        >
          Status: {productionLine.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div
          style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
        >
          <input
            type="text"
            placeholder="Line Code"
            value={lineCode}
            onChange={(e) => setLineCode(e.target.value)}
            required
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
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/production-lines")}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Batal
          </button>
        </div>

        {error && (
          <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
        )}
      </form>
    </div>
  );
}
