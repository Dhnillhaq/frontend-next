import { Shift } from "@/types/Shift";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchShifts(): Promise<Shift[]> {
  const res = await fetch(`${BASE_URL}/shifts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch shifts");
  return res.json();
}

export async function fetchShiftById(id: number): Promise<Shift> {
  const res = await fetch(`${BASE_URL}/shifts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch shift");
  return res.json();
}

export async function createShift(data: { shiftNumber: number }) {
  const res = await fetch(`${BASE_URL}/shifts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to create shift");
  }

  return res.json();
}

export async function updateShift(
  id: number,
  data: Partial<Shift>
): Promise<Shift> {
  const res = await fetch(`${BASE_URL}/shifts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update shift");
  }

  return res.json();
}

export async function toggleShiftStatus(id: number, isActive: boolean): Promise<Shift> {
  const res = await fetch(`${BASE_URL}/shifts/${id}/toggle-status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });

  if (!res.ok) {
    throw new Error("Failed to update shift status");
  }

  return res.json();
}
