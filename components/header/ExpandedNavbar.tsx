import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { nav_links } from "@/data/nav_links";
import ListItem from "./ListItem";
import healthpay from "@/assets/healthpay.png";

interface ExpandedNavbarProps {
  hoveredItem: string | null;
  onHover: (name: string) => void;
}

const navVariants = {
  initial: { 
    opacity: 0,
    y: -20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  initial: { 
    opacity: 0,
    y: -20
  },
  animate: { 
    opacity: 1,
    y: 0
  },
  exit: { 
    opacity: 0,
    y: -20
  }
};

export default function ExpandedNavbar({ hoveredItem, onHover }: ExpandedNavbarProps) {
  return (
    <motion.nav 
      className="relative z-30 h-full w-full flex items-center justify-between px-4"
      variants={navVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Logo section */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 shrink-0 group pl-1">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={healthpay} 
            alt="HealthPay Logo" 
            className="w-7 h-7 opacity-90 group-hover:opacity-100 transition-opacity" 
          />
          <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300">
            HealthPay
          </p>
        </Link>
      </motion.div>

      {/* Navigation Links - Desktop */}
      <motion.ul variants={itemVariants} className="hidden lg:flex items-center gap-4 mx-4">
        {nav_links.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            isHovered={hoveredItem === item.name}
            onHover={() => onHover(item.name)}
            anyItemHovered={hoveredItem !== null}
          />
        ))}
      </motion.ul>

      {/* Actions section */}
      <motion.div variants={itemVariants} className="flex items-center pr-1">
        <Link href="#" className="hidden lg:block">
          <button className="relative min-w-[120px] px-5 py-1.5 bg-gradient-to-r from-blue-600/90 to-blue-400/90 hover:from-blue-600 hover:to-blue-400 text-white rounded-full transition-all duration-300 text-sm font-semibold backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
            Try Free
          </button>
        </Link>
      </motion.div>
    </motion.nav>
  );
} 