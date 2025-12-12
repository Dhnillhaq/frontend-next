// app/shifts/ShiftsTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteShift } from "@/services/shiftService";
import { Shift } from "@/types/Shift";

type Props = {
  initialShifts: Shift[];
};

export default function ShiftsTableClient({ initialShifts }: Props) {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const ok = confirm("Yakin mau menghapus shift ini?");
    if (!ok) return;

    try {
      setIsDeleting(id);
      await deleteShift(id);
      setShifts((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus shift");
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
        {shifts.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada shift
            </td>
          </tr>
        ) : (
          shifts.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.shiftNumber}</td>
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
                    className="groups-button groups-button--delete"
                    onClick={() => handleDelete(s.id)}
                    disabled={isDeleting === s.id}
                  >
                    {isDeleting === s.id ? "Deleting..." : "Delete"}
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
