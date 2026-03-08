"use client";
import { deleteCartProduct } from "@/services/cart";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const CartDelete = ({ cardId }: { cardId: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteCartProduct(cardId);
      router.refresh();
      toast.success("Deleted cart");
    } catch (err) {
      console.error("Failed to  delete cart", err);
      toast.error("Failed to  delete cart.");
    }
  };

  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <button onClick={handleDelete} className="text-white cursor-pointer ">
        <RiDeleteBin6Line className="bg-[#C9302C]  h-7 w-7 p-1" />
      </button>
    </div>
  );
};

export default CartDelete;
