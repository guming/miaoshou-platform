import { Toolbar } from "markmap-toolbar";
import { Markmap } from "markmap-view";
import React, { useState, useRef, useEffect } from "react";
import { transformer } from "./markmap";
import "markmap-toolbar/dist/style.css";

const initValue = `# markmap

- beautiful
- useful
- easy
- interactive
`;

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    // Register custom buttons
    toolbar.register({
      id: "alert",
      title: "Click to show an alert",
      content: "Alert",
      onClick: () => alert("You made it!"),
    });
    toolbar.setItems([...Toolbar.defaultItems, "alert"]);
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapHooks(data) {
  console.log(data.value.value)
  const [value, setValue] = useState(data.value.value);
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement>();
  // Ref for markmap object
  const refMm = useRef<Markmap>();
  // Ref for toolbar wrapper
  const refToolbar = useRef<HTMLDivElement>();

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    console.log("create", refSvg.current);
    refMm.current = mm;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg.current]);

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <svg className="flex-1" ref={refSvg} />
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </React.Fragment>
  );
}
