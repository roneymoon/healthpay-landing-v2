import { motion } from "framer-motion";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="w-full bg-white/30 backdrop-blur-[8px] rounded-3xl shadow-lg border border-white/20 p-6"
    >
      {children}
    </motion.div>
  );
} 