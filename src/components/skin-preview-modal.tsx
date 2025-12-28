import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface SkinPreviewModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SkinPreviewModal({ open, onClose, children }: SkinPreviewModalProps) {
  // 关闭时恢复滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC 键关闭
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 遮罩层 */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          {/* 内容层 */}
          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:rotate-90 transition-transform flex items-center justify-center"
              aria-label="关闭预览"
              onClick={onClose}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
