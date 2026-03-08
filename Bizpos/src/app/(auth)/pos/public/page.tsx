import { POSItemSelector } from "@/app/(admin-panel)/pos/item-selector";

export default function PosPublicPage() {
  return (
    <>
      <div className="border-b bg-white px-4 py-3">
        <h1 className="text-lg font-semibold">POS</h1>
      </div>
      <POSItemSelector />
    </>
  );
}
