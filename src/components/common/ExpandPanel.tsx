import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ExpandPanelRefType =
  | undefined
  | {
      toggleCollapse: () => void;
    };

const ExpandPanel = forwardRef<
  ExpandPanelRefType,
  HTMLMotionProps<'div'> & {
    isVisible?: boolean;
  }
>(({ className, children, isVisible: isVisibleProp, ...rest }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  // const toggleCollapse = useCallback(() => {
  //   setIsExpanded((prev) => !prev);
  // }, []);

  // useImperativeHandle(ref, () => {
  //   return {
  //     toggleCollapse,
  //   };
  // }, [toggleCollapse]);

  return (
    <AnimatePresence>
      {isVisibleProp && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={twMerge('overflow-hidden', className)}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ExpandPanel.displayName = 'ExpandPanel';

export default ExpandPanel;
