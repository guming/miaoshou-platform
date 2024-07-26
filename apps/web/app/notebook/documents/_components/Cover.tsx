"use client";

import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import useLocalStorage from "@/hooks/use-local-storage";

const Cover = ({ url, preview }: { url?: string; preview?: boolean }) => {
  const coverIMage = useCoverImage();
  const params = useParams();
  const { edgestore } = useLocalStorage();
//   const [font, setFont] = useLocalStorage<string>("novel__font", "Default");
//   const removeCover = useMutation(api.documents.removeCoverImage);
  return (
    <div
      className={cn(
        "relative w-dull h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={coverIMage.onOpen}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            // onClick={async () => {
            //   if (url) {
            //     await edgestore.publicFiles.delete({
            //       url: url,
            //     });
            //   }
            //   removeCover({ id: params.documentId as Id<"documents"> });
            // }}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 mr-2" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
