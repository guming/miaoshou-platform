"use client";
import { Brush, CircuitBoard, Code, DraftingCompass, FlaskConical, Pyramid, Radical, Workflow } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const ProjectsData = [
  {
    id: 1,
    name: "/Draw",
    description: "Quick, hand-drawn like diagrams. Powered by Excalidraw.",
    svg: <Brush color="#0061ff" />,
    url: "assets/draw.png",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 2,
    name: "/Math Graph",
    description: "Embedded Desmos graphing calculator.",
    svg: <Pyramid color="#0061ff" />,
    url: "assets/math.png",
    color: "from-[#007ACC] to-[#2F74C0]",
  },
  {
    id: 3,
    name: "/Gemotry",
    description: "Embedded Desmos geometry sketcher.",
    svg: <DraftingCompass color="#0061ff" />,
    url: "assets/gemotry.png",
    color: "from-[#38BDF8] to-[#818CF8]",
  },
  {
    id: 4,
    name: "Chemistry",
    description: "Draw and edit molecules with JSME",
    svg: <FlaskConical color="#0061ff" />,
    url: "assets/chemistry.svg",
    color: "from-[#000000] to-[#3B3B3B]",
  },
  {
    id: 5,
    name: "Circuit",
    description: "Draw and edit circuit schematics.",
    svg: <CircuitBoard color="#0061ff" />,
    url: "assets/circuit.png",
    color: "from-[#6C47FF] to-[#4F37C8]",
  },
  {
    id: 6,
    name: "Code",
    description: "Syntax highlighting, multi-language support, and Runnable.",
    svg: <Code color="#0061ff" />,
    url: "assets/code.png",
    color: "from-[#FF4F00] to-[#FF8A00]",
  },
  {
    id: 7,
    name: "Math",
    description: "Auto-formatting math block. Supports pasting LaTeX, and copies into LaTeX.",
    svg: <Radical color="#0061ff" />,
    url: "assets/inlinemath.png",
    color: "from-[#0066FF] to-[#00CCFF]",
  },
  {
    id: 8,
    name: "Flow and MindMap with Mermaid",
    description: "Open-source solution for managing subscriptions and payments in your application.",
    svg: <Workflow color="#0061ff" />,
    url: "assets/mermaid.png",
    color: "from-[#0066FF] to-[#00CCFF]",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
          Block types for all scientific disciplines.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Powered by open-source technologies to ensure a rich and open editor experience.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {ProjectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {/* Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                <div className={`h-full w-full bg-gradient-to-br ${project.color}`}></div>
              </div>

              <div className="relative z-10">
                {/* Logo and External Link */}
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                    <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full">
                      {project.svg}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <Link href={project.url} target="_blank" className="block">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
                  </div>
                </Link>
                <img src={project.url} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
