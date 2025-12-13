"use client";

import { useState, useEffect } from "react";
import { updateOperation } from "@/services/operationService";
import { fetchGroups } from "@/services/groupService";
import { fetchShifts } from "@/services/shiftService";
import { fetchProductionLines } from "@/services/productionLineService";
import { Operation } from "@/types/Operation";
import { Group } from "@/types/Group";
import { Shift } from "@/types/Shift";
import { ProductionLine } from "@/types/ProductionLine";
import { useRouter } from "next/navigation";

type Props = {
  operation: Operation;
};

export default function EditOperationForm({ operation }: Props) {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([]);
  
  const [formData, setFormData] = useState({
    operation_date: operation.operationDate.split('T')[0],
    group_id: operation.groupId,
    shift_id: operation.shiftId,
    production_line_id: operation.productionLineId,
    temperature: operation.temperature,
    weight: operation.weight,
    quality: operation.quality,
    input_method: operation.inputMethod,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMasterData() {
      const [groupsData, shiftsData, linesData] = await Promise.all([
        fetchGroups(),
        fetchShifts(),
        fetchProductionLines(),
      ]);
      setGroups(groupsData);
      setShifts(shiftsData);
      setProductionLines(linesData);
    }
    loadMasterData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateOperation(operation.id, formData);
      router.push("/operations");
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
            backgroundColor: operation.isActive ? "#22c55e" : "#6b7280",
            color: "white",
          }}
        >
          Status: {operation.isActive ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Tanggal Operasi
          </label>
          <input
            type="date"
            value={formData.operation_date}
            onChange={(e) => setFormData({ ...formData, operation_date: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Group
          </label>
          <select
            value={formData.group_id}
            onChange={(e) => setFormData({ ...formData, group_id: Number(e.target.value) })}
            required
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
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Shift
          </label>
          <select
            value={formData.shift_id}
            onChange={(e) => setFormData({ ...formData, shift_id: Number(e.target.value) })}
            required
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
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Production Line
          </label>
          <select
            value={formData.production_line_id}
            onChange={(e) => setFormData({ ...formData, production_line_id: Number(e.target.value) })}
            required
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
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Suhu (°C)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="300"
            value={formData.temperature}
            onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Berat (kg)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Kualitas
          </label>
          <select
            value={formData.quality}
            onChange={(e) => setFormData({ ...formData, quality: e.target.value as 'OK' | 'NOT_OK' })}
            required
          >
            <option value="">Pilih Kualitas</option>
            <option value="OK">OK</option>
            <option value="NOT_OK">NOT OK</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: "0.875rem" }}>
            Metode Input
          </label>
          <select
            value={formData.input_method}
            onChange={(e) => setFormData({ ...formData, input_method: e.target.value as 'MANUAL' | 'OCR' })}
            required
          >
            <option value="">Pilih Metode</option>
            <option value="MANUAL">MANUAL</option>
            <option value="OCR">OCR</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{ whiteSpace: "nowrap" }}
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/operations")}
          style={{ whiteSpace: "nowrap" }}
        >
          Batal
        </button>
      </div>

      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem", marginTop: 8 }}>{error}</p>
      )}
    </form>
    </div>
  );
}
