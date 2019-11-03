// Libraries
import authModule from '@react-native-firebase/auth';
import firestoreModule from '@react-native-firebase/firestore';

export default class Firebase {
  auth = null;
  firestore = null;

  constructor() {
    this.auth = authModule();
    this.firestore = firestoreModule();
  }

  // Get user UID
  getUserUID = () => {
    if (!this.auth || !this.auth.currentUser) {
      return null;
    }
    return this.auth.currentUser.uid;
  };

  // ----------------- AUTHENTICATION ------------------------------ //
  // Create user
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Sign in
  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign out
  signOut = () => this.auth.signOut();

  // Send password reset
  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  // ----------------- DATABASE ------------------------------ //

  // USERS - Get the user document
  getUserDocument = async () => {
    const uid = this.getUserUID();
    if (!uid) return null;

    const userDocument = await this.firestore
      .collection('users')
      .doc(uid)
      .get();

    return {
      uid,
      ...userDocument.data(),
    };
  };

  // USERS - Create the user profile document if needed and then get it
  createUserProfileDocument = async (user, additionalData = {}) => {
    if (!user) return;

    // Get a reference to the correct place in database
    const userRef = this.firestore.doc(`users/${user.uid}`);

    // Go fetch the document from that location
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { email } = user; // may want to pull off photoURL, displayName at some point
      const createdAt = new Date();

      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    }

    return this.getUserDocument();
  };

  // EXPENSES - get expense collection reference
  getExpensesCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/expenses`);
  };

  // BUDGETS - get budget collection reference
  getBudgetsCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/budgets`);
  };

  // CATEGORIES - get category collection reference
  getCategoriesCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/categories`);
  };

  // CATEGORIES - create/set a new item
  setNewCategoryItem = async ({ id, ...categoryObject }) => {
    const uid = this.getUserUID();
    if (!uid || !id) return null;

    // Get a reference to the correct place in database
    const categoryRef = this.firestore.doc(`users/${uid}/categories/${id}`);

    // create the category
    return categoryRef.set(categoryObject);
  };

  // CATEGORIES - delete a custom category
  deleteCustomCategory = async id => {
    const uid = this.getUserUID();
    if (!uid) return null;

    // Get a reference to the correct place in database
    const categoryRef = this.firestore.doc(`users/${uid}/categories/${id}`);

    // NOTE: this won't resolve while offline. Will that cause problems?
    return categoryRef.delete();
  };

  // EXPENSES - create a new expense or edit an existing
  setExpenseItem = async ({ id, ...expenseObject }) => {
    const uid = this.getUserUID();
    if (!uid) return null;

    if (!id) {
      // create a new expense
      expenseObject.createdAt = new Date();
      return this.firestore
        .collection('users')
        .doc(uid)
        .collection('expenses')
        .add(expenseObject);
    } else {
      // update an exsiting
      const expenseRef = this.firestore.doc(`users/${uid}/expenses/${id}`);
      return expenseRef.set(expenseObject);
    }
  };

  // EXPENSES - delete
  deleteExpenseItem = async id => {
    const uid = this.getUserUID();
    if (!uid || !id) return null;

    // Get a reference to the correct place in database
    const expenseRef = this.firestore.doc(`users/${uid}/expenses/${id}`);

    // NOTE: this won't resolve while offline. Will that cause problems?
    return expenseRef.delete();
  };
}
