import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      shortcuts.forEach(({ key, ctrlKey, callback }) => {
        if (e.key === key && e.ctrlKey === ctrlKey) {
          e.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
