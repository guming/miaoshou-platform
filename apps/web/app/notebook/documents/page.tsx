"use client";

import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import ToolsBar from "./_components/ToolsBar"

const DocumentsPage = () => {
  // const user = await currentUser();
  const router = useRouter();
  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNote", {
        name: "Untitle",
      });
      return response.data;
    },
  });
  const handleCreate = () => {
    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("created new note:", { note_id });
        // uploadImage.mutate(note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert("Failed to create new notebook");
      },
    });
  }
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="h-full flex flex-row items-center justify-center space-y-4">
      <div className="w-full h-full p-4 flex flex-col items-center justify-center">
        <Image src={"/empty.png"} height={300} width={300} alt="Empty" />
        <h2 className="text-lg font-medium">
          Welcome to &apos; 妙手
        </h2>
        <Button onClick={handleCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a note
        </Button>
        <button 
          onClick={toggleSidebar} 
          className="fixed top-4 right-8 bg-blue-500 text-white p-2 rounded"
          >
          {isSidebarVisible ? '隐藏侧边栏' : '显示侧边栏'}
        </button>
      </div>
      {isSidebarVisible && (
        <ToolsBar />
      )}
     
    </div>
  );
};

export default DocumentsPage;

