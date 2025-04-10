import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DataTransferAnimation() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 2000); // 每 2 秒切换一次动画状态
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* 左侧电脑 */}
      <Card className="w-40 h-28 flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardContent className="text-black dark:text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-blue-500"
          >
            <path d="M4 3h16c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2h-5l1 2h3v2H6v-2h3l1-2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zM4 16h16V5H4v11z"></path>
          </svg>
        </CardContent>
      </Card>

      {/* 传输带动画 */}
      <div className="relative w-32 h-4 mx-4 flex items-center overflow-hidden">
        <motion.div
          className="w-[200%] h-[2px] border-dashed border-2 border-blue-500"
          animate={{
            x: ["0%", "-50%"], // 向左滚动，模拟传输带
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY, // 无限循环
            duration: 1, // 每次滚动时长
            ease: "linear",
          }}
        />
      </div>

      {/* 右侧电脑 */}
      <Card className="w-40 h-28 flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardContent className="text-black dark:text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-12 h-12 text-blue-500"
          >
            <path d="M4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zM4 16h16V5H4v11z"></path>
            <path d="M4 9h16"></path>
          </svg>
        </CardContent>
      </Card>
    </div>
  );
}
