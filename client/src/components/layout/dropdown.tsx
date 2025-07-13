"use client";

import Link from "next/link";
import type { LinkProps } from "@/types";
import { useEffect, useState } from "react";
import { randomText } from "@/utils/random-text";

interface DropdownComponentProps {
  links: LinkProps[];
}

export default function Dropdown({ links }: DropdownComponentProps) {
  const [animatedTexts, setAnimatedTexts] = useState<string[]>(
    links.map(() => ""),
  );

  useEffect(() => {
    links.forEach((link, index) => {
      randomText(
        link.text,
        (text) => {
          setAnimatedTexts((prev) => {
            const updatedTexts = [...prev];
            updatedTexts[index] = text;
            return updatedTexts;
          });
        },
        20,
      );
    });
  }, [links]);

  return (
    <ul className="mt-1.5 text-lg lg:text-2xl xl:text-3xl absolute">
      {links.map((link, index) => (
        <li
          key={link.id}
          className="px-1.5 border first:border-t-0 border-b-0 last:border-b border-white hover:text-[#00ff00]"
        >
          {link.isExternal ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="audioMenuCat"
            >
              {animatedTexts[index] || link.text}
            </a>
          ) : (
            <Link href={link.href} className="audioMenuCat">
              {animatedTexts[index] || link.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
