"use client";
import Link from "next/link";
import type { LinkProps } from "@/types";

interface DropdownComponentProps {
  links: LinkProps[];
}

export default function Dropdown({ links }: DropdownComponentProps) {
  return (
    <ul className="mt-1.5 text-lg lg:text-2xl xl:text-3xl absolute">
      {links.map((link) => (
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
              {link.text}
            </a>
          ) : (
            <Link href={link.href} className="audioMenuCat">
              {link.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
