import { nav_links } from "@/data/nav_links";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col p-6 mt-20">
          {nav_links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-6 space-y-3">
            <Link
              href="/login"
              className="block px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg text-center transition-colors"
            >
              Log in
            </Link>
            <Link
              href="#"
              className="block px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg text-center transition-colors"
            >
              Try Free
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 