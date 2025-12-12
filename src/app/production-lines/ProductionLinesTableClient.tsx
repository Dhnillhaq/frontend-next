// app/production-lines/ProductionLinesTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProductionLine } from "@/services/productionLineService";
import { ProductionLine } from "@/types/ProductionLine";

type Props = {
  initialProductionLines: ProductionLine[];
};

export default function ProductionLinesTableClient({ initialProductionLines }: Props) {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>(initialProductionLines);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const ok = confirm("Yakin mau menghapus production line ini?");
    if (!ok) return;

    try {
      setIsDeleting(id);
      await deleteProductionLine(id);
      setProductionLines((prev) => prev.filter((pl) => pl.id !== id));
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus production line");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <table className="groups-table">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>No</th>
          <th>Nama</th>
          <th style={{ width: "160px" }}>Aksi</th>
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
            <tr key={pl.id}>
              <td>{index + 1}</td>
              <td>{pl.lineCode}</td>
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
                    className="groups-button groups-button--delete"
                    onClick={() => handleDelete(pl.id)}
                    disabled={isDeleting === pl.id}
                  >
                    {isDeleting === pl.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
