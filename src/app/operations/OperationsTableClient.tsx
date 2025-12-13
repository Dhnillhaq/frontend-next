// app/operations/OperationsTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleOperationStatus } from "@/services/operationService";
import { Operation } from "@/types/Operation";

type Props = {
  initialOperations: Operation[];
};

export default function OperationsTableClient({ initialOperations }: Props) {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const action = currentStatus ? "menonaktifkan" : "mengaktifkan";
    const ok = confirm(`Yakin mau ${action} operasi ini?`);
    if (!ok) return;

    try {
      setIsToggling(id);
      const updatedOp = await toggleOperationStatus(id, !currentStatus);
      
      // Pastikan updatedOp memiliki semua field yang diperlukan
      if (updatedOp && updatedOp.id) {
        setOperations((prev) => prev.map((op) => op.id === id ? { ...op, ...updatedOp } : op));
      } else {
        // Fallback: refresh seluruh data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert(`Gagal ${action} operasi`);
    } finally {
      setIsToggling(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <table className="groups-table">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th style={{ width: "110px" }}>Tanggal</th>
          <th>Group</th>
          <th>Shift</th>
          <th>Line</th>
          <th style={{ width: "80px" }}>Suhu (°C)</th>
          <th style={{ width: "90px" }}>Berat (kg)</th>
          <th style={{ width: "90px" }}>Kualitas</th>
          <th style={{ width: "90px" }}>Input</th>
          {/* <th style={{ width: "90px" }}>Status</th> */}
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
        {operations.length === 0 ? (
          <tr>
            <td colSpan={11} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada data operasi
            </td>
          </tr>
        ) : (
          operations.map((op, index) => (
            op && op.id ? (
              <tr key={`operation-${op.id}`} style={{ opacity: op.isActive ? 1 : 0.6 }}>
              <td>{index + 1}</td>
              <td>{formatDate(op.operationDate)}</td>
              <td>{op.group?.name || '-'}</td>
              <td>Shift {op.shift?.shiftNumber || '-'}</td>
              <td>{op.productionLine?.lineCode || '-'}</td>
              <td style={{ textAlign: "right" }}>{op.temperature}</td>
              <td style={{ textAlign: "right" }}>{op.weight}</td>
              <td style={{textAlign: "center"}}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: op.quality === "OK" ? "#22c55e" : "#ef4444",
                    color: "white",
                  }}
                >
                  {op.quality}
                </span>
              </td>
              <td style={{textAlign: "center"}}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: op.inputMethod === "MANUAL" ? "#3b82f6" : "#a855f7",
                    color: "white",
                  }}
                >
                  {op.inputMethod}
                </span>
              </td>
              {/* <td>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: op.isActive ? "#22c55e" : "#6b7280",
                    color: "white",
                  }}
                >
                  {op.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </td> */}
              <td>
                <div className="groups-actions">
                  <Link
                    href={`/operations/edit/${op.id}`}
                    className="groups-button groups-button--edit"
                  >
                    Edit
                  </Link>
                  {/* <button
                    type="button"
                    className="groups-button"
                    style={{
                      backgroundColor: op.isActive ? "#ef4444" : "#22c55e",
                      color: "white",
                    }}
                    onClick={() => handleToggleStatus(op.id, op.isActive)}
                    disabled={isToggling === op.id}
                  >
                    {isToggling === op.id 
                      ? "Loading..." 
                      : op.isActive ? "Nonaktifkan" : "Aktifkan"}
                  </button> */}
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
