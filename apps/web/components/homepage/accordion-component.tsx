"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "Miao Editor vs. Notion: Which Is Better For College Notes?",
    answer:
      "if your primary focus is notetaking, especially if you're studying a wide variety of academic subjects, Miao Editor is the better option.",
  },
  {
    question: "Want a Better Way to Take Notes for STEM Classes?",
    answer:
      "Unlike generic note-taking apps, Miao Editor was designed for students like you—who need a tool that works at the speed of thought. No more handwriting for math and physics classes, since you can type out the symbols and equations faster and neater.",
  },
];

export function AccordionComponent() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Pill badge */}
          <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Everything you need to know about the Miao Platform. Can&apos;t find the answer you&apos;re looking for?
            Reach out to our team.
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 px-2"
              >
                <AccordionTrigger className="hover:no-underline py-4 px-2">
                  <span className="font-medium text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
