// src/app/shifts/edit/[id]/page.tsx
import { fetchShiftById } from "@/services/shiftService";
import EditShiftForm from "./EditDeleteForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditShiftPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const shift = await fetchShiftById(id);

  return (
    <div className="groups-container">
      <h1 className="groups-title">Edit Shift</h1>
      <p className="groups-subtitle">ID: {resolvedParams.id}</p>

      <EditShiftForm shift={shift} />
    </div>
  );
}
