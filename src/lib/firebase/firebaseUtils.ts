import { auth, db, storage } from "./firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product, CartItem, Cart } from '../types';
import { initialProducts } from '../data/products';

// Auth functions
export const logoutUser = () => signOut(auth);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Firestore functions
export const addDocument = (collectionName: string, data: any) =>
  addDoc(collection(db, collectionName), data);

export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateDocument = (collectionName: string, id: string, data: any) =>
  updateDoc(doc(db, collectionName, id), data);

export const deleteDocument = (collectionName: string, id: string) =>
  deleteDoc(doc(db, collectionName, id));

// Storage functions
export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Product Operations
export const initializeProducts = async () => {
  try {
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      // Only initialize if no products exist
      for (const product of initialProducts) {
        await addProduct(product);
      }
      console.log('Products initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
    throw error;
  }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updates);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Cart Operations
export const getCart = async (userId: string): Promise<Cart | null> => {
  try {
    const cartQuery = query(collection(db, 'carts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(cartQuery);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    } as Cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

export const updateCart = async (userId: string, items: CartItem[]) => {
  try {
    const cartQuery = query(collection(db, 'carts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(cartQuery);
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'carts'), {
        userId,
        items,
        total
      });
    } else {
      const cartRef = doc(db, 'carts', querySnapshot.docs[0].id);
      await updateDoc(cartRef, {
        items,
        total
      });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};
