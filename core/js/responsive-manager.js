/**
 * Responsive Manager
 * Handles device detection and content transformation for mobile vs desktop
 */

class ResponsiveManager {
  constructor() {
    this.isMobile = window.innerWidth < 768;
    this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    this.isDesktop = window.innerWidth >= 1024;

    this.init();
  }

  /**
   * Initialize responsive manager
   */
  init() {
    // Listen for window resize
    window.addEventListener('resize', () => {
      this.updateDeviceType();
    });

    // Listen for orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.updateDeviceType(), 100);
    });
  }

  /**
   * Update device type on resize
   */
  updateDeviceType() {
    const oldIsMobile = this.isMobile;

    this.isMobile = window.innerWidth < 768;
    this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    this.isDesktop = window.innerWidth >= 1024;

    // Trigger custom event if device type changed
    if (oldIsMobile !== this.isMobile) {
      window.dispatchEvent(new CustomEvent('deviceTypeChanged', {
        detail: { isMobile: this.isMobile, isDesktop: this.isDesktop }
      }));
    }
  }

  /**
   * Transform business data based on device
   * Mobile: Essential info only
   * Desktop: Full information
   */
  transformBusinessData(business) {
    if (this.isMobile) {
      return {
        id: business.id,
        name: business.name,
        category: business.category,
        phone: business.phone,
        address: business.address,
        location: business.location,
        hours: business.hours,
        rating: business.rating || 0,
        reviewCount: business.reviewCount || 0,
        thumbnail: business.photos && business.photos.length > 0 ? business.photos[0] : null,
        shortDescription: this.truncateText(business.description, 50),
        isOpen: this.checkIfOpen(business.hours),
        neighborhood: business.neighborhood
      };
    }

    // Desktop: return full data
    return business;
  }

  /**
   * Transform event data based on device
   */
  transformEventData(event) {
    if (this.isMobile) {
      return {
        id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        thumbnail: event.images && event.images.length > 0 ? event.images[0] : null,
        shortDescription: this.truncateText(event.description, 80),
        category: event.category
      };
    }

    return event;
  }

  /**
   * Truncate text for mobile display
   */
  truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  /**
   * Check if business is currently open
   */
  checkIfOpen(hours) {
    if (!hours || typeof hours !== 'object') return null;

    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todayHours = hours[currentDay];
    if (!todayHours) return false;
    if (todayHours.closed) return false;

    const [openHour, openMin] = todayHours.open.split(':').map(Number);
    const [closeHour, closeMin] = todayHours.close.split(':').map(Number);

    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    return currentTime >= openTime && currentTime <= closeTime;
  }

  /**
   * Get appropriate grid columns for current device
   */
  getGridColumns() {
    if (this.isMobile) return 1;
    if (this.isTablet) return 2;
    return 3;
  }

  /**
   * Get appropriate image size for device
   */
  getImageSize() {
    if (this.isMobile) return 'small';
    if (this.isTablet) return 'medium';
    return 'large';
  }

  /**
   * Should show full content?
   */
  shouldShowFullContent() {
    return !this.isMobile;
  }

  /**
   * Get touch vs click event name
   */
  getInteractionEvent() {
    return 'ontouchstart' in window ? 'touchstart' : 'click';
  }

  /**
   * Check if device supports geolocation
   */
  supportsGeolocation() {
    return 'geolocation' in navigator;
  }

  /**
   * Check if device supports PWA features
   */
  supportsPWA() {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  /**
   * Check if running as PWA (standalone mode)
   */
  isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  /**
   * Show/hide elements based on device
   */
  updateResponsiveElements() {
    const mobileOnly = document.querySelectorAll('.mobile-only');
    const desktopOnly = document.querySelectorAll('.desktop-only');

    mobileOnly.forEach(el => {
      el.style.display = this.isMobile ? 'block' : 'none';
    });

    desktopOnly.forEach(el => {
      el.style.display = this.isMobile ? 'none' : 'block';
    });
  }

  /**
   * Get user's current location
   */
  async getCurrentLocation() {
    if (!this.supportsGeolocation()) {
      return { success: false, error: 'Geolocation not supported' };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            success: true,
            data: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            }
          });
        },
        (error) => {
          resolve({
            success: false,
            error: error.message
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  /**
   * Format data for display based on device
   */
  formatForDisplay(data, type) {
    switch (type) {
      case 'date':
        return this.isMobile
          ? this.formatDateShort(data)
          : this.formatDateLong(data);

      case 'address':
        return this.isMobile
          ? this.truncateText(data, 30)
          : data;

      case 'description':
        return this.isMobile
          ? this.truncateText(data, 100)
          : data;

      default:
        return data;
    }
  }

  /**
   * Format date short (mobile)
   */
  formatDateShort(date) {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }

  /**
   * Format date long (desktop)
   */
  formatDateLong(date) {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
