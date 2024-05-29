export type RootStackParamList = {
    Home: undefined;
    ProductListScreen: undefined;
    DetailScreen: { id: string };

  };
  interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }
export interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  brand: string;
}

  
