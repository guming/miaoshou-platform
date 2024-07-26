"use client";

import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";
import Banner from "./Banner";
import React from "react";

type TNavBar = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const NavBar = ({ isCollapsed, onResetWidth }: TNavBar) => {
  const params = useParams();
  const document = undefined

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          {/* <Publish initialData={document} /> */}
        </div>
      </nav>

      {document.isArchived && <Banner documentId={document.id} />}
    </>
  );
};

export default NavBar;
