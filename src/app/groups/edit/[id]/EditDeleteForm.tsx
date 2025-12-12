"use client";

import { useState } from "react";
import { updateGroup } from "@/services/groupService";
import { Group } from "@/types/Group";
import { useRouter } from "next/navigation";

type Props = {
  group: Group;
};

export default function EditGroupForm({ group }: Props) {
  const router = useRouter();
  const [name, setName] = useState(group.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateGroup(group.id, { name });
      router.push("/groups");
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
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onClick={() => router.push("/groups")}
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
