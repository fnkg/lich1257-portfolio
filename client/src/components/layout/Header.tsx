"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Dropdown from "@/components/layout/Dropdown";
import type { LinkProps, DropdownProps } from "@/types";
import AudioMenu from "../AudioMenu";

interface HeaderProps {
  data: {
    id: number;
    link: LinkProps; // e.g. { id: 19, text: "about", href: "/about", isExternal: false }
    dropdown: DropdownProps[]; // e.g. contacts, projects, etc.
  };
}

export function Header({ data }: HeaderProps) {
  if (!data) return null;
  const { link, dropdown } = data;

  // Track which dropdown is open (null = none open)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  // Ref to the entire navigation area
  const navRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if user clicks outside navRef
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle the dropdown for a given index
  const handleDropdownToggle = (idx: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === idx ? null : idx));
  };

  return (
    <header className="absolute top-0 right-0 w-full z-10">
      <nav
        ref={navRef}
        className="relative w-full text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
      >
        <ul className="flex flex-row justify-center md:justify-start w-full mt-1.5 md:mt-3.5 py-1.5 md:first:pl-3.5 border-y border-white">
          <AudioMenu />

          <li>
            {/* About Link in the same row */}
            <Link
              href={link.href}
              className="audioMenuMain hover:text-[#00ff00]"
            >
              {link.text}
            </Link>
          </li>
          {/* Dropdowns for 'contacts' and 'projects' */}

          {dropdown.map((item, idx) => (
            <li key={item.id} className="ml-4">
              {/* Title (clickable) */}
              <button
                onClick={() => handleDropdownToggle(idx)}
                className="audioMenuMain hover:text-[#00ff00] cursor-pointer"
              >
                {item.text}
              </button>

              {/* Render dropdown if open */}
              {openDropdownIndex === idx && (
                // <div className="absolute left-0 mt-2 text-white p-2">
                <Dropdown links={item.link} />
                // </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
