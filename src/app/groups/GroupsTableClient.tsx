// app/groups/GroupsTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleGroupStatus } from "@/services/groupService";
import { Group } from "@/types/Group";

type Props = {
  initialGroups: Group[];
};

export default function GroupsTableClient({ initialGroups }: Props) {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isToggling, setIsToggling] = useState<number | null>(null);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const action = currentStatus ? "menonaktifkan" : "mengaktifkan";
    const ok = confirm(`Yakin mau ${action} group ini?`);
    if (!ok) return;

    try {
      setIsToggling(id);
      const updatedGroup = await toggleGroupStatus(id, !currentStatus);
      
      // Pastikan updatedGroup memiliki semua field yang diperlukan
      if (updatedGroup && updatedGroup.id) {
        setGroups((prev) => prev.map((g) => g.id === id ? { ...g, ...updatedGroup } : g));
      } else {
        // Fallback: refresh seluruh data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert(`Gagal ${action} group`);
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
        {groups.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada group
            </td>
          </tr>
        ) : (
          groups.map((g, index) => (
            g && g.id ? (
              <tr key={`group-${g.id}`} style={{ opacity: g.isActive ? 1 : 0.6 }}>
              <td>{index + 1}</td>
              <td>{g.name}</td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: g.isActive ? "#22c55e" : "#6b7280",
                    color: "white",
                  }}
                >
                  {g.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td>
                <div className="groups-actions">
                  <Link
                    href={`/groups/edit/${g.id}`}
                    className="groups-button groups-button--edit"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="groups-button"
                    style={{
                      backgroundColor: g.isActive ? "#ef4444" : "#22c55e",
                      color: "white",
                    }}
                    onClick={() => handleToggleStatus(g.id, g.isActive)}
                    disabled={isToggling === g.id}
                  >
                    {isToggling === g.id 
                      ? "Loading..." 
                      : g.isActive ? "Nonaktifkan" : "Aktifkan"}
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
