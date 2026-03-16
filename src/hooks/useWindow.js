import { useState, useEffect, useCallback } from 'react';

export const useDraggable = (initialPosition = { x: 0, y: 0 }, disabled = false) => {
  const [position, setPosition] = useState(initialPosition);

  const updatePosition = useCallback((newPosition) => {
    if (!disabled) {
      setPosition(newPosition);
    }
  }, [disabled]);

  return {
    position,
    updatePosition
  };
};

export const useWindowMaximized = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = useCallback(() => {
    setIsMaximized(prev => !prev);
  }, []);

  const minimize = useCallback(() => {
    setIsMaximized(false);
  }, []);

  return {
    isMaximized,
    toggleMaximize,
    minimize
  };
};

export const useStartMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const startMenu = document.querySelector('.start-menu');
      if (isOpen && startMenu && !startMenu.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return { isOpen, toggle, open, close };
};
