"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import Menu2 from "@/components/tailwind/ui/menu";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import DropdownMenu from "./drop-down-menu";

const ActionButtons = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="pr-2">
      <div className=" items-center justify-center flex ">
        <div className="flex xl:space-x-4">
          <Link
            href={"/editor"}
            className="
            lg:flex
            items-center
            hidden
            
            "
          >
            <Button
              variant={"outline"}
              className="
            lg:flex
            items-center
            hidden
                border-none 
                text-md
                "
            >
              Demo
            </Button>
          </Link>

          <div
            className="font-thin     
        lg:flex
            items-center
            hidden"
          >
            |
          </div>
        </div>

        <div className="flex lg:space-x-4 items-center pr-4">
          <Link href={"/free"}>
            <Button
              variant={"outline"}
              className="
            lg:flex
            items-center
            hidden
                border-none 
                text-md
                "
            >
              Log in
            </Button>
          </Link>
          <div
            className="font-thin     
        lg:flex
            items-center
            hidden"
          >
            |
          </div>
          <Menu2 />
        </div>
      </div>

      {isDropdownVisible && (
        <div
          onClick={toggleDropdown}
          className="
        
             rounded-full
             xl:hidden
             "
        >
          <X className="h-5 w-5  items-center justify-center rounded-full" />
        </div>
      )}
      {!isDropdownVisible && (
        <div onClick={toggleDropdown} className="flex lg:hidden">
          <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
        </div>
      )}

      {isDropdownVisible && <DropdownMenu onClose={closeDropdown} />}
    </div>
  );
};

export default ActionButtons;
