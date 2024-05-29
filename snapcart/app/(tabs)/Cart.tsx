import React from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; ``
import { RootState } from '@/common/redux/store';
import { increaseQuantity,removeFromCart, removeItem } from '@/common/redux/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items); // allows you to extract data from the redux store state fro use in this component
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch(); // This hook returns a reference to the dispatch function from the redux store.

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
  };

  return (
    <View className="flex-1 p-2 bg-slate-100">
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-4 border-b bg-gray-400 rounded-md border-gray-200">
            <View className="flex-row items-center">
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
              <Text className="text-lg w-20" numberOfLines={1} >{item.title}</Text>
            </View>
            <View className="flex-row items-center ml-">
              <Pressable onPress={() => handleDecrease(item.id)} className="px-2  bg-red-50 rounded-md">
                <Text style={{ fontSize: 20 }}>-</Text>
              </Pressable>
              <Text className="px-3">{item.quantity}</Text>
              <Pressable onPress={() => handleIncrease(item.id)} className="px-2  bg-red-50 rounded-md">
                <Text style={{ fontSize: 20 }}>+</Text>
              </Pressable>
            </View>
            <Text className="text-lg mr-2">${item.price}</Text>

          </View>
        )}
      />
      <View className="p-4 bg-slate-300 rounded-md">
        <Text className="text-xl">Total Quantity: {totalQuantity}</Text>
        <Text className="text-xl">Total Price: ${totalPrice.toFixed(2)}</Text>
        <Pressable onPress={handleCheckout} className=" bg-slate-950 p-4 rounded-lg mt-4">
          <Text className="text-white text-center">Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default CartScreen;
