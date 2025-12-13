import { Operation, OperationInput } from "@/types/Operation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchOperations(): Promise<Operation[]> {
  const res = await fetch(`${BASE_URL}/operations`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch operations");
  const json = await res.json();
  return json.data;
}

export async function fetchOperationById(id: number): Promise<Operation> {
  const res = await fetch(`${BASE_URL}/operations/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch operation");
  const json = await res.json();
  return json.data;
}

export async function createOperation(data: OperationInput) {
  const res = await fetch(`${BASE_URL}/operations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to create operation");
  }

  return res.json();
}

export async function updateOperation(
  id: number,
  data: OperationInput
): Promise<Operation> {
  const res = await fetch(`${BASE_URL}/operations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update operation");
  }

  return res.json();
}

export async function toggleOperationStatus(id: number, isActive: boolean): Promise<Operation> {
  const res = await fetch(`${BASE_URL}/operations/${id}/toggle-status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });

  if (!res.ok) {
    throw new Error("Failed to update operation status");
  }

  return res.json();
}
