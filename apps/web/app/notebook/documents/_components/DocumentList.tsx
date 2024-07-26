"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import React from "react";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";

type TDocList = {
    parentDocumentId?: string;
    level?: number;
    data?: string;
  };

const DocumentList = ({  level = 0, parentDocumentId }: TDocList) => {
 console.log("documentList");
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const { status, data } = useQuery({ queryKey: ['todos'], queryFn: ()=>{

    const result = axios.get("/api/fetchNotes").then((response) => {
        console.log('server response:' + JSON.stringify(response.data))
        return response.data;
    })
    return result;
  } });

  const onRedirect = (docId: string) => {
    router.push(`/notebook/documents/${docId}`);
  };
  console.log(JSON.stringify(data))
  if (data === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />{" "}
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>
      {data.data.map((doc) => (
        <div key={doc.id}>
          <Item
            id={doc.id}
            onClick={() => onRedirect(doc.id)}
            label={doc.name}
            icon={FileIcon}
            documentIcon={doc.imageUrl}
            active={params.documentId === doc.id}
            level={level}
            onExpand={() => onExpand(doc.id)}
            expanded={expanded[doc.id]}
          />
          {expanded[doc.id]}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
