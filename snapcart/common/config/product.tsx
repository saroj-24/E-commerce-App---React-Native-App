import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { query, orderBy, startAfter, limit, QuerySnapshot,onSnapshot,DocumentData,QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { firestore } from './firebase';
import { Product } from "@/common/context/productContext";

interface PaginatedProducts {
  products: Product[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}
export const getPaginatedProducts = async (
  limitNumber: number,
  lastVisible: QueryDocumentSnapshot<DocumentData> | null
): Promise<PaginatedProducts> => {
  let q = query(
    collection(firestore, 'Products'),
    orderBy('title'),
    limit(limitNumber)
  );

  if (lastVisible) {
    q = query(
      collection(firestore, 'Products'),
      orderBy('title'),
      startAfter(lastVisible),
      limit(limitNumber)
    );
  }

  const snapshot = await getDocs(q);

  const products = snapshot.docs.map(doc => ({
    ...(doc.data() as Product),
    id: doc.id
  }));

  const newLastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return {
    products,
    lastVisible: newLastVisible,
  };
};

export const getProduct = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "Products");
    const productsSnapshot = await getDocs(productsRef);
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    return products;
  } catch (error: any) {
    alert(error.message);
    console.error(error);
    return [];
  }
};
export const getProductById = async (productId: any): Promise<Product | null> => {
  try {
    const productRef = doc(db, "Products", productId);
    const productSnapShot = await getDoc(productRef);
    if (productSnapShot.exists()) {
      const product = { id: productSnapShot.id, ...productSnapShot.data() } as Product;
      return product;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};
