// src/app/users/[id]/edit/page.tsx
import { fetchGroupById } from "@/services/groupService";
import EditGroupForm from "./EditDeleteForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGroupPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const group = await fetchGroupById(id);

  return (
    <div className="groups-container">
      <h1 className="groups-title">Edit Group</h1>
      <p className="groups-subtitle">ID: {resolvedParams.id}</p>

      <EditGroupForm group={group} />
    </div>
  );
}
