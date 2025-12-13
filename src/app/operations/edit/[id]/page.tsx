// src/app/operations/edit/[id]/page.tsx
import { fetchOperationById } from "@/services/operationService";
import EditOperationForm from "./EditDeleteForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditOperationPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const operation = await fetchOperationById(id);

  return (
    <div className="groups-container">
      <h1 className="groups-title">Edit Operation</h1>
      <p className="groups-subtitle">ID: {resolvedParams.id}</p>

      <EditOperationForm operation={operation} />
    </div>
  );
}
