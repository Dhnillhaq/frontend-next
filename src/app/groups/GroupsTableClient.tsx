// app/groups/GroupsTableClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteGroup } from "@/services/groupService";
import { Group } from "@/types/Group";

type Props = {
  initialGroups: Group[];
};

export default function GroupsTableClient({ initialGroups }: Props) {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const ok = confirm("Yakin mau menghapus group ini?");
    if (!ok) return;

    try {
      setIsDeleting(id);
      await deleteGroup(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus group");
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
        {groups.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center", padding: "0.75rem" }}>
              Belum ada group
            </td>
          </tr>
        ) : (
          groups.map((g, index) => (
            <tr key={g.id}>
              <td>{index + 1}</td>
              <td>{g.name}</td>
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
                    className="groups-button groups-button--delete"
                    onClick={() => handleDelete(g.id)}
                    disabled={isDeleting === g.id}
                  >
                    {isDeleting === g.id ? "Deleting..." : "Delete"}
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
