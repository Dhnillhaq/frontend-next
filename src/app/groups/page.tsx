// app/group/page.tsx
import NewGroupForm from "./NewGroupForm";
import { fetchGroups } from "@/services/groupService";
import GroupTableClient from "./GroupsTableClient";

export default async function GroupsPage() {
  const groups = await fetchGroups();

  return (
    <div className="groups-container">
      <h1 className="groups-title">Groups</h1>
      <p className="groups-subtitle">
        Data ini diambil langsung dari SQL Server lewat backend Express.
      </p>

      <NewGroupForm />

      <div className="groups-table-wrapper">
        <GroupTableClient initialGroups={groups} />
      </div>
    </div>
  );
}
