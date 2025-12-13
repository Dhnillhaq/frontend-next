"use client";

import { useState } from "react";
import { createOperation } from "@/services/operationService";
import type { Group } from "@/types/Group";
import type { Shift } from "@/types/Shift";
import type { ProductionLine } from "@/types/ProductionLine";

type Props = {
  groups: Group[];
  shifts: Shift[];
  productionLines: ProductionLine[];
};

export default function NewOperationForm({
  groups,
  shifts,
  productionLines,
}: Props) {
  const [formData, setFormData] = useState({
    operation_date: new Date().toISOString().split("T")[0],
    group_id: "",
    shift_id: "",
    production_line_id: "",
    temperature: "",
    weight: "",
    quality: "OK",
    input_method: "MANUAL",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createOperation({
        operation_date: formData.operation_date,
        group_id: parseInt(formData.group_id),
        shift_id: parseInt(formData.shift_id),
        production_line_id: parseInt(formData.production_line_id),
        temperature: parseFloat(formData.temperature),
        weight: parseFloat(formData.weight),
        quality: formData.quality as "OK" | "NOT_OK",
        input_method: formData.input_method as "MANUAL",
      });

      // Reset form
      setFormData({
        operation_date: new Date().toISOString().split("T")[0],
        group_id: "",
        shift_id: "",
        production_line_id: "",
        temperature: "",
        weight: "",
        quality: "OK",
        input_method: "MANUAL",
      });

      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: "1.1rem", marginBottom: 12 }}>Tambah Operation</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Tanggal
          </label>
          <input
            type="date"
            value={formData.operation_date}
            onChange={(e) =>
              setFormData({ ...formData, operation_date: e.target.value })
            }
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Group
          </label>
          <select
            value={formData.group_id}
            onChange={(e) =>
              setFormData({ ...formData, group_id: e.target.value })
            }
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          >
            <option value="">Pilih Group</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Shift
          </label>
          <select
            value={formData.shift_id}
            onChange={(e) =>
              setFormData({ ...formData, shift_id: e.target.value })
            }
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          >
            <option value="">Pilih Shift</option>
            {shifts.map((s) => (
              <option key={s.id} value={s.id}>
                Shift {s.shiftNumber}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Production Line
          </label>
          <select
            value={formData.production_line_id}
            onChange={(e) =>
              setFormData({ ...formData, production_line_id: e.target.value })
            }
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          >
            <option value="">Pilih Line</option>
            {productionLines.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.lineCode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Suhu (°C)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={(e) =>
              setFormData({ ...formData, temperature: e.target.value })
            }
            required
            min="0.1"
            max="300"
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              width: "100%",
            }}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Berat (kg)
          </label>
          <input
            type="number" 
            step="0.01"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            required
            min="0.01"
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}
          >
            Kualitas
          </label>
          <select
            value={formData.quality}
            onChange={(e) =>
              setFormData({ ...formData, quality: e.target.value })
            }
            required
            style={{
              padding: "8px 10px",
              borderRadius: 8,

              width: "100%",
            }}
          >
            <option value="OK">OK</option>
            <option value="NOT_OK">NOT OK</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "8px 24px",
          borderRadius: 8,
          border: "none",
          background: loading ? "#4b5563" : "#22c55e",
          color: "black",
          fontWeight: 600,
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>

      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem", marginTop: 8 }}>
          {error}
        </p>
      )}
    </form>
  );
}
