import { motion } from 'framer-motion';

interface ActionButtonsProps {
  options: string[];
  onButtonClick: (option: string) => void;
}

const ActionButtons = ({ options, onButtonClick }: ActionButtonsProps) => {
  return (
    <div className="action-buttons">
      {options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => onButtonClick(option)}
          className="action-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
};

export default ActionButtons;