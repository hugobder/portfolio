"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  index?: number;
}

const GRADIENTS = [
  ["oklch(0.65 0.22 28)", "oklch(0.72 0.20 44)"],   // coral
  ["oklch(0.52 0.22 252)", "oklch(0.62 0.18 230)"],  // electric blue
  ["oklch(0.78 0.17 92)", "oklch(0.68 0.16 75)"],    // sunny yellow → amber
];

export function SkillBar({ name, level, index = 0 }: SkillBarProps) {
  const [from, to] = GRADIENTS[index % 3];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">{name}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
          style={{ background: from }}
        >
          {level}%
        </span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
