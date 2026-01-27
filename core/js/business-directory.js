/**
 * Business Directory Manager
 * Handles business listing, search, and filtering
 */

class BusinessDirectory {
  constructor(firebaseManager, responsiveManager) {
    this.fb = firebaseManager;
    this.responsive = responsiveManager;
    this.currentFilters = {
      category: null,
      neighborhood: null,
      searchTerm: null,
      status: 'approved'
    };
  }

  /**
   * Get all businesses for current city
   */
  async getBusinesses(options = {}) {
    try {
      const filters = [
        { field: 'status', operator: '==', value: 'approved' }
      ];

      if (options.category) {
        filters.push({ field: 'category', operator: '==', value: options.category });
      }

      if (options.neighborhood) {
        filters.push({ field: 'neighborhood', operator: '==', value: options.neighborhood });
      }

      const result = await this.fb.queryDocuments('businesses', filters);

      if (result.success) {
        // Transform data based on device (mobile vs desktop)
        const businesses = result.data.map(business => {
          const transformedBusiness = this.responsive.transformBusinessData(business);
          // Add data-aos for animations
          return { ...transformedBusiness, dataAos: 'fade-up' };
        });
        return { success: true, data: businesses };
      }

      return result;
    } catch (error) {
      console.error('Get businesses error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get business by ID
   */
  async getBusinessById(businessId) {
    try {
      const result = await this.fb.getDocument('businesses', businessId);
      return result;
    } catch (error) {
      console.error('Get business error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Search businesses
   */
  async searchBusinesses(searchTerm) {
    try {
      // Get all businesses (we'll filter client-side for text search)
      const result = await this.getBusinesses();

      if (result.success) {
        const term = searchTerm.toLowerCase();
        const filtered = result.data.filter(business => {
          return (
            business.name.toLowerCase().includes(term) ||
            (business.description && business.description.toLowerCase().includes(term)) ||
            business.category.toLowerCase().includes(term) ||
            (business.tags && business.tags.some(tag => tag.toLowerCase().includes(term)))
          );
        });

        return { success: true, data: filtered };
      }

      return result;
    } catch (error) {
      console.error('Search businesses error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get businesses by category
   */
  async getBusinessesByCategory(category) {
    return this.getBusinesses({ category });
  }

  /**
   * Get businesses by neighborhood
   */
  async getBusinessesByNeighborhood(neighborhood) {
    return this.getBusinesses({ neighborhood });
  }

  /**
   * Get featured/recommended businesses
   */
  async getFeaturedBusinesses(limit = 6) {
    try {
      const result = await this.getBusinesses();

      if (result.success) {
        // Sort by rating and get top businesses
        const featured = result.data
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, limit);

        return { success: true, data: featured };
      }

      return result;
    } catch (error) {
      console.error('Get featured businesses error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get nearby businesses (using geolocation)
   */
  async getNearbyBusinesses(userLat, userLng, radiusKm = 5) {
    try {
      const result = await this.getBusinesses();

      if (result.success) {
        // Filter by distance
        const nearby = result.data
          .map(business => {
            if (business.location && business.location.lat && business.location.lng) {
              const distance = this.calculateDistance(
                userLat,
                userLng,
                business.location.lat,
                business.location.lng
              );
              return { ...business, distance };
            }
            return null;
          })
          .filter(business => business && business.distance <= radiusKm)
          .sort((a, b) => a.distance - b.distance);

        return { success: true, data: nearby };
      }

      return result;
    } catch (error) {
      console.error('Get nearby businesses error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format distance for display
   */
  formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
  }

  /**
   * Check if business is currently open
   */
  isBusinessOpen(hours) {
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
   * Get business hours for today
   */
  getTodayHours(hours) {
    if (!hours || typeof hours !== 'object') return null;

    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
    const todayHours = hours[currentDay];

    if (!todayHours) return null;
    if (todayHours.closed) return 'Fermé';

    return `${todayHours.open} - ${todayHours.close}`;
  }

  /**
   * Submit a new business (requires authentication)
   */
  async submitBusiness(businessData) {
    try {
      if (!this.fb.isAuthenticated()) {
        return { success: false, error: 'Authentication required' };
      }

      const data = {
        ...businessData,
        ownerId: this.fb.getCurrentUser().uid,
        status: 'pending', // Awaits admin approval
        rating: 0,
        reviewCount: 0,
        views: 0
      };

      return await this.fb.addDocument('businesses', data);
    } catch (error) {
      console.error('Submit business error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update business (owner or admin only)
   */
  async updateBusiness(businessId, updates) {
    try {
      if (!this.fb.isAuthenticated()) {
        return { success: false, error: 'Authentication required' };
      }

      return await this.fb.updateDocument('businesses', businessId, updates);
    } catch (error) {
      console.error('Update business error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Increment business views
   */
  async incrementViews(businessId) {
    try {
      const businessRef = this.fb.db.collection('businesses').doc(businessId);
      await businessRef.update({
        views: firebase.firestore.FieldValue.increment(1)
      });
      return { success: true };
    } catch (error) {
      console.error('Increment views error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get business reviews
   */
  async getBusinessReviews(businessId) {
    try {
      const filters = [
        { field: 'businessId', operator: '==', value: businessId },
        { field: 'status', operator: '==', value: 'approved' }
      ];

      return await this.fb.queryDocuments('reviews', filters);
    } catch (error) {
      console.error('Get reviews error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Submit a review
   */
  async submitReview(businessId, reviewData) {
    try {
      if (!this.fb.isAuthenticated()) {
        return { success: false, error: 'Authentication required' };
      }

      const data = {
        businessId,
        userId: this.fb.getCurrentUser().uid,
        status: 'pending',
        ...reviewData
      };

      return await this.fb.addDocument('reviews', data);
    } catch (error) {
      console.error('Submit review error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get business categories
   */
  async getCategories() {
    try {
      const result = await this.fb.queryDocuments('categories', []);
      return result;
    } catch (error) {
      console.error('Get categories error:', error);
      return { success: false, error: error.message };
    }
  }
}
