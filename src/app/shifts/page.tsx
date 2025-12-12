// app/shifts/page.tsx
import NewShiftForm from "./NewShiftForm";
import { fetchShifts } from "@/services/shiftService";
import ShiftTableClient from "./ShiftsTableClient";

export default async function ShiftsPage() {
  const shifts = await fetchShifts();

  return (
    <div className="groups-container">
      <h1 className="groups-title">Shifts</h1>
      <p className="groups-subtitle">
        Data ini diambil langsung dari SQL Server lewat backend Express.
      </p>

      <NewShiftForm />

      <div className="groups-table-wrapper">
        <ShiftTableClient initialShifts={shifts} />
      </div>
    </div>
  );
}
