// app/production-lines/page.tsx
import NewProductionLineForm from "./NewProductionLineForm";
import { fetchProductionLines } from "@/services/productionLineService";
import ProductionLineTableClient from "./ProductionLinesTableClient";

export default async function ProductionLinesPage() {
  const productionLines = await fetchProductionLines();

  return (
    <div className="groups-container">
      <h1 className="groups-title">Production Lines</h1>
      <p className="groups-subtitle">
        Data ini diambil langsung dari SQL Server lewat backend Express.
      </p>

      <NewProductionLineForm />

      <div className="groups-table-wrapper">
        <ProductionLineTableClient initialProductionLines={productionLines} />
      </div>
    </div>
  );
}
