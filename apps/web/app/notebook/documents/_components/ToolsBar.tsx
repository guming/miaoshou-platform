"use client";

import React from 'react';

const ToolsBar = () => {
  return (
    <div className="h-full flex-col p-4 items-center justify-center">
      <aside className="w-64 bg-gray-800 text-black flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold">侧边栏</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li><a href="#" className="block p-2 bg-gray-700 rounded">链接 1</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default ToolsBar;
