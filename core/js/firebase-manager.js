/**
 * Firebase Manager
 * Handles all Firebase initialization and operations
 */

class FirebaseManager {
  constructor(config, cityId) {
    this.config = config;
    this.cityId = cityId;
    this.app = null;
    this.db = null;
    this.auth = null;
    this.storage = null;
    this.currentUser = null;
  }

  /**
   * Initialize Firebase services
   */
  async initialize() {
    try {
      // Initialize Firebase app
      this.app = firebase.initializeApp(this.config);

      // Initialize services
      this.db = firebase.firestore();
      this.auth = firebase.auth();
      this.storage = firebase.storage();

      // Setup auth state listener
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
        this.onAuthStateChanged(user);
      });

      console.log('Firebase initialized successfully');
      return true;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return false;
    }
  }

  /**
   * Auth state change callback (can be overridden)
   */
  onAuthStateChanged(user) {
    // Override this method to handle auth state changes
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.currentUser !== null;
  }

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email, password, userData = {}) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Create user document
      await this.db.collection('users').doc(user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...userData
      });

      return { success: true, user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      await this.auth.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Upload file to Storage
   */
  async uploadFile(path, file, onProgress = null) {
    try {
      const storageRef = this.storage.ref(path);
      const uploadTask = storageRef.put(file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) {
              onProgress(progress);
            }
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  /**
   * Delete file from Storage
   */
  async deleteFile(path) {
    try {
      const storageRef = this.storage.ref(path);
      await storageRef.delete();
      return { success: true };
    } catch (error) {
      console.error('File delete error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get Firestore reference with city filter
   */
  getCityCollection(collectionName) {
    return this.db.collection(collectionName).where('cityId', '==', this.cityId);
  }

  /**
   * Add document to collection
   */
  async addDocument(collectionName, data) {
    try {
      const docRef = await this.db.collection(collectionName).add({
        ...data,
        cityId: this.cityId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add document error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update document
   */
  async updateDocument(collectionName, documentId, data) {
    try {
      await this.db.collection(collectionName).doc(documentId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Update document error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete document
   */
  async deleteDocument(collectionName, documentId) {
    try {
      await this.db.collection(collectionName).doc(documentId).delete();
      return { success: true };
    } catch (error) {
      console.error('Delete document error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get document by ID
   */
  async getDocument(collectionName, documentId) {
    try {
      const doc = await this.db.collection(collectionName).doc(documentId).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      console.error('Get document error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Query documents
   */
  async queryDocuments(collectionName, filters = []) {
    try {
      let query = this.db.collection(collectionName).where('cityId', '==', this.cityId);

      // Apply filters
      filters.forEach(filter => {
        query = query.where(filter.field, filter.operator, filter.value);
      });

      const snapshot = await query.get();
      const documents = [];

      snapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, data: documents };
    } catch (error) {
      console.error('Query documents error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Real-time listener for collection
   */
  listenToCollection(collectionName, filters = [], callback) {
    let query = this.db.collection(collectionName).where('cityId', '==', this.cityId);

    // Apply filters
    filters.forEach(filter => {
      query = query.where(filter.field, filter.operator, filter.value);
    });

    // Return unsubscribe function
    return query.onSnapshot(
      (snapshot) => {
        const documents = [];
        snapshot.forEach(doc => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        callback({ success: true, data: documents });
      },
      (error) => {
        console.error('Listener error:', error);
        callback({ success: false, error: error.message });
      }
    );
  }

  /**
   * Real-time listener for document
   */
  listenToDocument(collectionName, documentId, callback) {
    return this.db.collection(collectionName).doc(documentId).onSnapshot(
      (doc) => {
        if (doc.exists) {
          callback({ success: true, data: { id: doc.id, ...doc.data() } });
        } else {
          callback({ success: false, error: 'Document not found' });
        }
      },
      (error) => {
        console.error('Listener error:', error);
        callback({ success: false, error: error.message });
      }
    );
  }
}
