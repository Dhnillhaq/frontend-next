// app/production-lines/ProductionLinesTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleProductionLineStatus } from "@/services/productionLineService";
import { ProductionLine } from "@/types/ProductionLine";

type Props = {
  initialProductionLines: ProductionLine[];
};

export default function ProductionLinesTableClient({ initialProductionLines }: Props) {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>(initialProductionLines);
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const action = currentStatus ? "menonaktifkan" : "mengaktifkan";
    const ok = confirm(`Yakin mau ${action} production line ini?`);
    if (!ok) return;

    try {
      setIsToggling(id);
      const updatedLine = await toggleProductionLineStatus(id, !currentStatus);
      
      // Pastikan updatedLine memiliki semua field yang diperlukan
      if (updatedLine && updatedLine.id) {
        setProductionLines((prev) => prev.map((pl) => pl.id === id ? { ...pl, ...updatedLine } : pl));
      } else {
        // Fallback: refresh seluruh data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert(`Gagal ${action} production line`);
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
        {productionLines.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada production line
            </td>
          </tr>
        ) : (
          productionLines.map((pl, index) => (
            pl && pl.id ? (
              <tr key={`line-${pl.id}`} style={{ opacity: pl.isActive ? 1 : 0.6 }}>
              <td>{index + 1}</td>
              <td>{pl.lineCode}</td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: pl.isActive ? "#22c55e" : "#6b7280",
                    color: "white",
                  }}
                >
                  {pl.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td>
                <div className="groups-actions">
                  <Link
                    href={`/production-lines/edit/${pl.id}`}
                    className="groups-button groups-button--edit"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="groups-button"
                    style={{
                      backgroundColor: pl.isActive ? "#ef4444" : "#22c55e",
                      color: "white",
                    }}
                    onClick={() => handleToggleStatus(pl.id, pl.isActive)}
                    disabled={isToggling === pl.id}
                  >
                    {isToggling === pl.id 
                      ? "Loading..." 
                      : pl.isActive ? "Nonaktifkan" : "Aktifkan"}
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
