// Libraries
import authModule from '@react-native-firebase/auth';
import firestoreModule from '@react-native-firebase/firestore';

// ----------------- AUTHENTICATION ------------------------------ //
// Auth module
export const auth = authModule();

// Create user
export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign in
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const signOut = () => auth.signOut();

// Send password reset
export const sendPasswordResetEmail = email =>
  auth.sendPasswordResetEmail(email);

// Get user's UID
export const getUserUID = () => {
  if (!auth || !auth.currentUser) {
    return null;
  }
  return auth.currentUser.uid;
};

// ----------------- DATABASE ------------------------------ //

export const firestore = firestoreModule();

// USER - Create the user profile in the database and get it
export const createUserProfileDocument = async (user, additionalData = {}) => {
  if (!user) return;

  // Get a reference to the correct place in database
  const userRef = firestore.doc(`users/${user.uid}`);

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

  return getUserDocument(user.uid);
};

// USER - Get the user profile from the database
export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userDocument = await firestore
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

// EXPENSES - Get the collection of expenses
export const getExpenseCollection = async () => {
  const uid = getUserUID();
  if (!uid) return null;

  try {
    const expenseCollection = await firestore
      .collection('users')
      .doc(uid)
      .collection('expenses')
      .get();

    console.log(expenseCollection);
  } catch (err) {
    console.log(err);
  }
};

// EXPENSES - create a new expense
export const createExpenseItem = async () => {
  const uid = getUserUID();
  if (!uid) return null;

  try {
  } catch (err) {
    console.log(err);
  }
};
