"use client";
import EditFollow from "@/components/ui/edit-follow/edit-follow";

const EditFollowPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">ติดตามเรา</h1>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <EditFollow name="facebook" />
        <EditFollow name="line" />
        <EditFollow name="instagram" />
      </div>
    </div>
  );
};

export default EditFollowPage;
