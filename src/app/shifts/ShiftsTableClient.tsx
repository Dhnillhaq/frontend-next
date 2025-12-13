// app/shifts/ShiftsTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleShiftStatus } from "@/services/shiftService";
import { Shift } from "@/types/Shift";

type Props = {
  initialShifts: Shift[];
};

export default function ShiftsTableClient({ initialShifts }: Props) {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const action = currentStatus ? "menonaktifkan" : "mengaktifkan";
    const ok = confirm(`Yakin mau ${action} shift ini?`);
    if (!ok) return;

    try {
      setIsToggling(id);
      const updatedShift = await toggleShiftStatus(id, !currentStatus);
      
      // Pastikan updatedShift memiliki semua field yang diperlukan
      if (updatedShift && updatedShift.id) {
        setShifts((prev) => prev.map((s) => s.id === id ? { ...s, ...updatedShift } : s));
      } else {
        // Fallback: refresh seluruh data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert(`Gagal ${action} shift`);
    } finally {
      setIsToggling(null);
    }
  };

  return (
    <table className="groups-table">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th>Nama</th>
          <th style={{ width: "100px" }}>Status</th>
          <th style={{ width: "200px" }}>
            Aksi{" "}
            <span 
              onClick={() => alert('💡 Data tidak dihapus permanen\n\nData hanya dinonaktifkan untuk menjaga integritas data dan riwayat operasi. Data yang dinonaktifkan tetap tersimpan di database dan bisa diaktifkan kembali kapan saja.')}
              style={{ cursor: 'pointer', fontSize: '1rem', opacity: 0.7 }}
              title="Klik untuk info lebih lanjut"
            >
              ℹ️
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {shifts.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada shift
            </td>
          </tr>
        ) : (
          shifts.map((s, index) => (
            s && s.id ? (
              <tr key={`shift-${s.id}`} style={{ opacity: s.isActive ? 1 : 0.6 }}>
                <td>{index + 1}</td>
                <td>{s.shiftNumber}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      backgroundColor: s.isActive ? "#22c55e" : "#6b7280",
                      color: "white",
                    }}
                  >
                    {s.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td>
                  <div className="groups-actions">
                    <Link
                      href={`/shifts/edit/${s.id}`}
                      className="groups-button groups-button--edit"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="groups-button"
                      style={{
                        backgroundColor: s.isActive ? "#ef4444" : "#22c55e",
                        color: "white",
                      }}
                      onClick={() => handleToggleStatus(s.id, s.isActive)}
                      disabled={isToggling === s.id}
                    >
                      {isToggling === s.id 
                        ? "Loading..." 
                        : s.isActive ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  </div>
                </td>
              </tr>
            ) : null
          ))
        )}
      </tbody>
    </table>
  );
}