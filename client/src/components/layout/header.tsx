"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Dropdown from "@/components/layout/dropdown";
import type { LinkProps, DropdownProps } from "@/types";
import AudioMenu from "../audio-menu";

interface HeaderProps {
  data: {
    id: number;
    link: LinkProps;
    dropdown: DropdownProps[];
  };
}

export function Header({ data }: HeaderProps) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  const navRef = useRef<HTMLDivElement>(null);
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

  if (!data) return null;
  const { link, dropdown } = data;

  const handleDropdownToggle = (idx: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === idx ? null : idx));
  };

  return (
    <header className="absolute top-0 right-0 w-full z-10">
      <nav
        ref={navRef}
        className="relative w-full text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
      >
        <ul className="flex flex-row justify-center md:justify-start w-full mt-1.5 md:mt-3.5 py-1.5 md:first:pl-3.5 border-y border-[#c8cfc9]">
          <AudioMenu />

          <li>
            <Link
              href={link.href}
              className="audioMenuMain hover:text-[#00ff00]"
            >
              {link.text}
            </Link>
          </li>

          {dropdown.map((item, idx) => (
            <li key={item.id} className="ml-4">
              <button
                onClick={() => handleDropdownToggle(idx)}
                className="audioMenuMain hover:text-[#00ff00] cursor-pointer"
              >
                {item.text}
              </button>
              {openDropdownIndex === idx && <Dropdown links={item.link} />}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
