'use client'
import { useState } from 'react';
import Link from 'next/link';
import DropdownMenu from '@/ui/navigation/DropdownMenu';

const NavAbout = () => {
    return (
        <>
            <li>
                <Link href="/about" className="audioMenuMain hover:text-[#00ff00]">
                    about
                </Link>
            </li>
        </>
    );
}

const NavContact = ({ contacts }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (menu) => {
        setOpenDropdown((prev) => (prev === menu ? null : menu));
    };

    const contactLinks = contacts.map(contact => ({
        key: contact.id,
        name: contact.text,
        href: contact.URL,
        target: contact.target
    }));

    return (
        <>
            <DropdownMenu
                linkName="contact"
                links={contactLinks}
                isOpen={openDropdown === 'contact'}
                onToggle={() => handleToggle('contact')}
                targetBlank={contactLinks}
            />
        </>
    )

}

const NavCategory = ({ categories }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleToggle = (menu) => {
        setOpenDropdown((prev) => (prev === menu ? null : menu));
    };

    const categoryLinks = categories.map(category => ({
        key: category.id,
        name: category.text,
        href: category.URL,
    }));

    return (
        <>
            <DropdownMenu
                linkName="projects"
                links={categoryLinks}
                isOpen={openDropdown === 'projects'}
                onToggle={() => handleToggle('projects')}
                targetBlank={false}
            />
        </>
    )
}

export {
    NavAbout, NavContact, NavCategory
}