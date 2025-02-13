import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AudioMenu from '@/ui/navigation/AudioMenu';
import { randomText } from '@/src/utils/randomText'

export default function DropdownMenu({ linkName, links, isOpen, onToggle, targetBlank }) {
    const dropdownRef = useRef(null);
    const [categoryName, setCategoryName] = useState(Array(links.length).fill(""));

    useEffect(() => {
        if (isOpen) {
            const newCategoryName = Array(links.length).fill("");
            setCategoryName(newCategoryName);

            links.forEach((link, index) => {
                randomText(link.name, (newLink) => {
                    setCategoryName((prevLink) => {
                        const updatedTexts = [...prevLink];
                        updatedTexts[index] = newLink;
                        return updatedTexts;
                    });
                }, 20);
            });
        }
    }, [isOpen, links]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onToggle(); // Close the dropdown
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onToggle]);

    const handleLinkClick = () => {
        onToggle(); // Close the dropdown when a link is clicked
    };

    return (
        <li className="ml-4" ref={dropdownRef}>
            <button className="audioMenuMain hover:text-[#00ff00] cursor-pointer" onClick={onToggle}>
                {linkName}
            </button>
            {isOpen && (
                <ul className="mt-1.5 text-lg lg:text-2xl xl:text-3xl absolute">
                    <AudioMenu />
                    {links.map((link, index) => (
                        <li key={link.key} className="px-1.5 border first:border-t-0 border-b-0 last:border-b border-white">
                            <Link
                                href={link.href}
                                target={targetBlank ? "_blank" : "_self"}
                                rel={targetBlank ? "noopener noreferrer" : ""}
                                className="audioMenuCat hover:text-[#00ff00]"
                                onClick={handleLinkClick}
                            >
                                <h3>{categoryName[index]}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}