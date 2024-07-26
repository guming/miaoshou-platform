import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Banner = () => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async (documentId) => {
      const response = await axios.post("/api/deleteNote", {
        noteId: documentId,
      });
      return response.data;
    },
  });
//   const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    deleteNote.mutate(undefined, {
        onSuccess: () => {
          router.push("/notebook/dashboard");
        },
        onError: (err) => {
          console.error(err);
        },
      });
  };

//   const onRestore = () => {
//     const promise = restore({ id: documentId });

//     toast.promise(promise, {
//       loading: "Restoring note...",
//       success: "Note restored!",
//       error: "Failed to restore note.",
//     });
//   };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Trash!</p>
      {/* <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button> */}
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
