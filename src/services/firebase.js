// Libraries
import authModule from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

// ----------------- DATABASE ------------------------------ //

//const firestore = firestoreModule();

// Create the user profile in the database and get it
export const createUserProfileDocument = async (user, additionalData = {}) => {
  if (!user) return;

  // Get a reference to the correct place in database
  //const userRef = await firestore.collection('users').doc(`${user.uid}`);
  const userRef = firestore().doc(`users/${user.uid}`);
  console.log('USER REF:', userRef);

  // Go fetch the document from that location
  const snapshot = await userRef.get(); // PROBLEM HERE TODO:

  console.log('AFTER SNAPSHOTTTT');
  console.log(snapshot);
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

// Get the user profile from the database
export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userDocument = await firestore()
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

//export { firestore };
