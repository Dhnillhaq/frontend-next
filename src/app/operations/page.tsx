// app/operations/page.tsx
import NewOperationForm from "./NewOperationForm";
import { fetchOperations } from "@/services/operationService";
import { fetchGroups } from "@/services/groupService";
import { fetchShifts } from "@/services/shiftService";
import { fetchProductionLines } from "@/services/productionLineService";
import OperationsTableClient from "./OperationsTableClient";

export default async function OperationsPage() {
  const [operations, groups, shifts, productionLines] = await Promise.all([
    fetchOperations(),
    fetchGroups(),
    fetchShifts(),
    fetchProductionLines()
  ]);

  return (
    <div className="groups-container">
      <h1 className="groups-title">Operations</h1>
      <p className="groups-subtitle">
        Data operasi produksi dengan tracking metode input (MANUAL / OCR).
      </p>

      <NewOperationForm 
        groups={groups}
        shifts={shifts}
        productionLines={productionLines}
      />

      <div className="groups-table-wrapper">
        <OperationsTableClient initialOperations={operations} />
      </div>
    </div>
  );
}
