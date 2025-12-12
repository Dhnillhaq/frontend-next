// src/app/production-lines/edit/[id]/page.tsx
import { fetchProductionLineById } from "@/services/productionLineService";
import EditProductionLineForm from "./EditDeleteForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductionLinePage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const productionLine = await fetchProductionLineById(id);

  return (
    <div className="groups-container">
      <h1 className="groups-title">Edit Production Line</h1>
      <p className="groups-subtitle">ID: {resolvedParams.id}</p>

      <EditProductionLineForm productionLine={productionLine} />
    </div>
  );
}
