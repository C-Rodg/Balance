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

    try {
      const userDocument = await this.firestore
        .collection('users')
        .doc(uid)
        .get();

      return {
        uid,
        ...userDocument.data(),
      };
    } catch (err) {
      console.log(err);
    }
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
      try {
        await userRef.set({
          email,
          createdAt,
          ...additionalData,
        });
      } catch (err) {
        console.log(err);
      }
    }

    return this.getUserDocument();
  };

  // EXPENSES - get expense collection reference
  getExpensesCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/expenses`);
  };

  // EXPENSES - get expense collection reference
  getBudgetsCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/budgets`);
  };

  // EXPENSES - get expense collection reference
  getCategoriesCollectionRef = () => {
    const uid = this.getUserUID();
    if (!uid) return null;
    return this.firestore.collection(`users/${uid}/categories`);
  };

  // EXPENSES - get the collection of expenses
  // getExpenseCollection = async () => {
  //   const uid = this.getUserUID();
  //   if (!uid) return null;

  //   try {
  //     const expenseCollection = await this.firestore
  //       .collection('users')
  //       .doc(uid)
  //       .collection('expenses')
  //       .get();

  //     console.log(expenseCollection);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // EXPENSES - create a new expense
  // createExpenseItem = async () => {
  //   const uid = this.getUserUID();
  //   if (!uid) return null;

  //   // TEST
  //   const expense = {
  //     createdAt: new Date(),
  //     expenseDate: '2019-10-24',
  //     expenseTitle: 'Chipotleee & Guaco',
  //     categoryId: 'alcohol-glass-cocktail-materialcommunityicons',
  //     amount: 896,
  //   };

  //   try {
  //     const docRef = await this.firestore
  //       .collection('users')
  //       .doc(uid)
  //       .collection('expenses')
  //       .add(expense);
  //     console.log('DOC REF IS:');
  //     console.log(docRef);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
}
