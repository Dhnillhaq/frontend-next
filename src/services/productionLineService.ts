import { ProductionLine } from "@/types/ProductionLine";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductionLines(): Promise<ProductionLine[]> {
  const res = await fetch(`${BASE_URL}/production-lines`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch production lines");
  return res.json();
}

export async function fetchProductionLineById(id: number): Promise<ProductionLine> {
  const res = await fetch(`${BASE_URL}/production-lines/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch production line");
  return res.json();
}

export async function createProductionLine(data: { lineCode: string }) {
  const res = await fetch(`${BASE_URL}/production-lines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to create production line");
  }

  return res.json();
}

export async function updateProductionLine(
  id: number,
  data: Partial<ProductionLine>
): Promise<ProductionLine> {
  const res = await fetch(`${BASE_URL}/production-lines/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update production line");
  }

  return res.json();
}

export async function toggleProductionLineStatus(id: number, isActive: boolean): Promise<ProductionLine> {
  const res = await fetch(`${BASE_URL}/production-lines/${id}/toggle-status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });

  if (!res.ok) {
    throw new Error("Failed to update production line status");
  }

  return res.json();
}
