/**
 * Utility Functions
 * Common helper functions used across the application
 */

const Utils = {
  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function calls
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Format phone number for display
   */
  formatPhoneNumber(phone) {
    if (!phone) return '';
    // Format Ivorian phone: +225 XX XX XX XX XX
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+225 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    }
    return phone;
  },

  /**
   * Validate email
   */
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Validate Ivorian phone number
   */
  isValidIvorianPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    // Ivorian numbers: 10 digits starting with specific prefixes
    return /^(01|02|03|05|07|08|09)\d{8}$/.test(cleaned);
  },

  /**
   * Format currency (XOF - West African CFA franc)
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Format number with thousands separator
   */
  formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
  },

  /**
   * Format date
   */
  formatDate(date, format = 'long') {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);

    if (format === 'short') {
      return d.toLocaleDateString('fr-FR');
    }

    if (format === 'long') {
      return d.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    if (format === 'time') {
      return d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    if (format === 'datetime') {
      return `${d.toLocaleDateString('fr-FR')} ${d.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }

    return d.toLocaleDateString('fr-FR');
  },

  /**
   * Get relative time (e.g., "il y a 2 heures")
   */
  getRelativeTime(date) {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diff = now - d;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 30) return `Il y a ${days}j`;
    if (months < 12) return `Il y a ${months} mois`;
    return `Il y a ${years} an${years > 1 ? 's' : ''}`;
  },

  /**
   * Sanitize HTML to prevent XSS
   */
  sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
      }
    } catch (error) {
      console.error('Copy to clipboard error:', error);
      return false;
    }
  },

  /**
   * Share content (Web Share API)
   */
  async share(data) {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return { success: true };
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share error:', error);
        }
        return { success: false, error: error.message };
      }
    } else {
      // Fallback: copy link to clipboard
      const copied = await this.copyToClipboard(data.url || data.text || '');
      return {
        success: copied,
        error: copied ? null : 'Share not supported'
      };
    }
  },

  /**
   * Show toast notification
   */
  showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Add styles
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      backgroundColor: type === 'success' ? '#10B981' :
                       type === 'error' ? '#EF4444' :
                       type === 'warning' ? '#F59E0B' : '#3B82F6',
      color: 'white',
      fontWeight: '600',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: '9999',
      animation: 'slideIn 0.3s ease-out'
    });

    document.body.appendChild(toast);

    // Remove after duration
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Lazy load images
   */
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  /**
   * Get query parameter from URL
   */
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  /**
   * Set query parameter in URL
   */
  setQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
  },

  /**
   * Remove query parameter from URL
   */
  removeQueryParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
  },

  /**
   * Scroll to element
   */
  scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Local storage helpers
   */
  storage: {
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Storage get error:', error);
        return null;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Storage set error:', error);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Storage remove error:', error);
        return false;
      }
    },

    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error('Storage clear error:', error);
        return false;
      }
    }
  },

  /**
   * Favorites management
   */
  favorites: {
    add(businessId) {
      const favorites = Utils.storage.get('favorites') || [];
      if (!favorites.includes(businessId)) {
        favorites.push(businessId);
        Utils.storage.set('favorites', favorites);
      }
    },

    remove(businessId) {
      let favorites = Utils.storage.get('favorites') || [];
      favorites = favorites.filter(id => id !== businessId);
      Utils.storage.set('favorites', favorites);
    },

    has(businessId) {
      const favorites = Utils.storage.get('favorites') || [];
      return favorites.includes(businessId);
    },

    getAll() {
      return Utils.storage.get('favorites') || [];
    },

    clear() {
      Utils.storage.set('favorites', []);
    }
  }
};

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
