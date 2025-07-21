import Link from "next/link";
import { motion } from "framer-motion";

interface ListItemProps {
  item: {
    name: string;
    href: string;
    dropdown_component?: React.ReactNode;
  };
  isHovered: boolean;
  onHover: () => void;
  anyItemHovered: boolean;
}

export default function ListItem({
  item,
  isHovered,
  onHover,
  anyItemHovered,
}: ListItemProps) {
  return (
    <li
      onMouseEnter={onHover}
      className="relative h-16 flex items-center font-bricolage"
    >
      <Link
        href={item.href}
        className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
          isHovered 
            ? "text-white bg-white/10 rounded-full backdrop-blur-sm" 
            : "text-white/80"
        } ${anyItemHovered && !isHovered ? "opacity-60" : ""} hover:text-white`}
      >
        {item.name}
      </Link>
      {isHovered && (
        <motion.div
          layoutId="navbar-active-item"
          className="absolute bottom-3.5 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-400/80 to-white/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </li>
  );
} 