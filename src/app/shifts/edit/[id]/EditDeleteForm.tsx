"use client";

import { useState } from "react";
import { updateShift } from "@/services/shiftService";
import { Shift } from "@/types/Shift";
import { useRouter } from "next/navigation";

type Props = {
  shift: Shift;
};

export default function EditShiftForm({ shift }: Props) {
  const router = useRouter();
  const [shiftNumber, setShiftNumber] = useState(shift.shiftNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateShift(shift.id, { shiftNumber });
      router.push("/shifts");
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
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        <input
          type="number"
          placeholder="Shift Number"
          value={shiftNumber}
          onChange={(e) => setShiftNumber(e.target.valueAsNumber)}
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
          onClick={() => router.push("/shifts")}
          style={{
            whiteSpace: "nowrap",
            border: "1px solid #4b5563",
            background: "transparent",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
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
  );
}
