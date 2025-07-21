import { motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";

interface CompactNavbarButtonsProps {
  onExpandClick: () => void;
}

const buttonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const containerVariants = {
  initial: { y: -20 },
  animate: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

export default function CompactNavbarButtons({ onExpandClick }: CompactNavbarButtonsProps) {
  return (
    <motion.div 
      className="relative z-30 w-full flex items-center justify-end h-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
    >
      <div className="flex items-center gap-2 pr-4">
        <motion.a
          href="#"
          variants={buttonVariants}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
          <button className="relative min-w-[120px] px-5 py-1.5 bg-gradient-to-r from-blue-600/90 to-blue-400/90 hover:from-blue-600 hover:to-blue-400 text-white rounded-full transition-all duration-300 text-sm font-semibold backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
            Try Free
          </button>
        </motion.a>
        
        <motion.button
          variants={buttonVariants}
          onClick={onExpandClick}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
          <div className="relative w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/15 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 shadow-lg">
            <IoMdMenu className="text-white text-lg" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
} 