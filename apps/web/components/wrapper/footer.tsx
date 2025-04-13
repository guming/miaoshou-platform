"use client";
import { Github, Twitter, WandSparkles } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    // Handle newsletter submission
    console.log(data);
    reset();
  };

  const links = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Documentation", href: "/docs" },
      { name: "Showcase", href: "/examples" },
      { name: "Pricing", href: "/pricing" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "License", href: "/license" },
    ],
  };

  return (
    <footer className="border-t bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <WandSparkles className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Miao Platform</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              An all-in-one platform designed for STEM students to easily take notes, collaborate in real-time, and
              complete assignments. It integrates text, code, equations, and scientific visualizations, making learning
              seamless and efficient. With AI Copilots and an intuitive editor, users can start right away, regardless
              of their technical skills..
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/guming/ai-editor" target="_blank">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h3>
                <ul className="mt-4 space-y-4">
                  {links.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                <ul className="mt-4 space-y-4">
                  {links.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {links.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Miaoshou.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
