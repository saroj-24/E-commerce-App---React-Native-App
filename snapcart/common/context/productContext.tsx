import React, { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

export interface Product {  
  id: string;
  brand: string;
  description: string;
  image: string;
  price: string;
  title: string;
}

interface ProductContextType {
  products?: Product[]; 
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {} 
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]); 

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
