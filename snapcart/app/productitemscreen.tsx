import { Pressable, View, ScrollView, Text ,ToastAndroid} from "react-native";
import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductContext from "@/common/context/productContext";
import { getProduct } from "@/common/config/product";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, RootStackParamList } from "@/common/models/types";
import ProductItem from "@/common/components/ProductItem";
import { addToCart } from "@/common/redux/cartSlice";
import { useDispatch } from "react-redux";

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductListScreen'>;

const ProductListScreen = () => {
  const { products, setProducts } = useContext(ProductContext);
  const dispatch = useDispatch();
  const navigation = useNavigation<ProductListScreenNavigationProp>();

  const fetchAllProducts = async () => {
    const result = await getProduct();
    if (setProducts) setProducts(result);
  };

  const goBack = () => {
    navigation.goBack();
  };
  function showToast() {
    ToastAndroid.show('Items added to Cart!', ToastAndroid.SHORT);
  }

  const handleAddToCart = (products: Product) => {

    const newCartItem = {
      id: products.id,
      title: products.title,
      price: +products.price,
      quantity: 1,
      image: products.image
    }
    dispatch(addToCart(newCartItem));
    showToast();

  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={goBack}
          className="justify-center items-center h-10 w-10 mx-4  bg-red-400 rounded-full"
        >
          <Entypo name="chevron-left" size={20} color="black" />
        </Pressable>
      ),
    });
    fetchAllProducts();
  }, [])

  return (
    <SafeAreaView>
      <Pressable
        onPress={goBack}
        className="justify-center items-center h-10 w-10 mx-4 rounded-full"
      >
        <Entypo name="chevron-left" size={30} color="black" />
      </Pressable>
      <ScrollView>
        {products?.map(products => (
          <Pressable key={products.id}>
            <ProductItem
              id={products.id}
              title={products.title}
              image={products.image}
              price={products.price}
              brand={products.brand}
              description={products.description}
              onItemAdd={() => handleAddToCart(products)}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProductListScreen;
