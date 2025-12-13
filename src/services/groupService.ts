import { Group } from "@/types/Group";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGroups(): Promise<Group[]> {
  const res = await fetch(`${BASE_URL}/groups`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch groups");
  return res.json();
}

export async function fetchGroupById(id: number): Promise<Group> {
  const res = await fetch(`${BASE_URL}/groups/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch group");
  return res.json();
}

export async function createGroup(data: { name: string }) {
  const res = await fetch(`${BASE_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to create group");
  }

  return res.json();
}

export async function updateGroup(
  id: number,
  data: Partial<Group>
): Promise<Group> {
  const res = await fetch(`${BASE_URL}/groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update group");
  }

  return res.json();
}

export async function toggleGroupStatus(id: number, isActive: boolean): Promise<Group> {
  const res = await fetch(`${BASE_URL}/groups/${id}/toggle-status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });

  if (!res.ok) {
    throw new Error("Failed to update group status");
  }

  return res.json();
}
