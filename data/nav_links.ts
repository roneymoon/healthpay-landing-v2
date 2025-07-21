import { ReactNode } from 'react';

interface NavLink {
  name: string;
  href: string;
  dropdown_component?: ReactNode;
}

export const nav_links: NavLink[] = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Customers",
    href: "#customers",
  },
  {
    name: "FAQs",
    href: "#faqs",
  },
  {
    name: "Contact",
    href: "#contact",
  },
]; 