import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
  timeout?: number;
}

export const useScrollTo = () => {
  const navigate = useNavigate();

  const scrollTo = useCallback(async (elementId: string, options: ScrollOptions = {}) => {
    try {
      const { offset = 80, behavior = 'smooth', timeout = 100 } = options;

      // Check if we're on the correct page
      const currentPath = window.location.pathname;
      const targetPath = '/';
      
      if (currentPath !== targetPath) {
        // Navigate to home page first
        navigate(targetPath);
        
        // Wait for navigation and DOM update
        await new Promise(resolve => setTimeout(resolve, timeout));
      }

      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id "${elementId}" not found`);
        return;
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });

      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${elementId}`);

      // Set focus for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });

      // Remove focus outline after animation
      const handleBlur = () => {
        element.removeAttribute('tabindex');
        element.removeEventListener('blur', handleBlur);
      };
      element.addEventListener('blur', handleBlur);

    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }, [navigate]);

  return scrollTo;
};