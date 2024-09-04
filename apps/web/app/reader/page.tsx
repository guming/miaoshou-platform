"use client";

import { useEffect } from "react";

export default function BibiReader() {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = "/bibi/index.html";
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";
    document.getElementById("bibi-container").appendChild(iframe);
  }, []);

  return (
    <div>
      <div id="bibi-container" />
    </div>
  );
}
