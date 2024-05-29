import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const saveCartToStorage = async (cartState: CartState) => {
    try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
        console.error('Failed to save cart data', error);
    }
};

const cartSlice = createSlice({  
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartState>) => { //PayLoadAction :- carries the data necessary to update the application state
            return action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity++;
                state.totalQuantity++;
                state.totalPrice += newItem.price;
            } else {
                state.items.push(newItem);
                state.totalQuantity++;
                state.totalPrice += newItem.price;
            }
            saveCartToStorage(state);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const itemToIncrease = state.items.find(item => item.id === itemId);
            if (itemToIncrease) {
                itemToIncrease.quantity++;
                state.totalQuantity++;
                state.totalPrice += itemToIncrease.price;
              
            }
            saveCartToStorage(state);
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const itemToDecrease = state.items.find(item => item.id === itemId);
            if (itemToDecrease && itemToDecrease.quantity > 1) {
                itemToDecrease.quantity--;
                state.totalQuantity--;
            }
            saveCartToStorage(state);
        },
        removeItem(state, action: PayloadAction<string>) {
            const itemIdToRemove = action.payload;
            const itemToRemove = state.items.find(
              (item) => item.id === itemIdToRemove
            );
       
            if (itemToRemove) {
              if (itemToRemove.quantity && itemToRemove.quantity > 1) {
                itemToRemove.quantity -= 1;
                state.totalQuantity--;
                state.totalPrice -= itemToRemove.price;
                
              } else {
                state.items = state.items.filter(
                  (item) => item.id !== itemIdToRemove
                );
                state.totalQuantity--;
                state.totalPrice -= itemToRemove.price;
              }
            }
            saveCartToStorage(state);
          },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const itemToRemoveIndex = state.items.findIndex(item => item.id === itemId);
            if (itemToRemoveIndex !== -1) {
                const itemToRemove = state.items[itemToRemoveIndex];
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.items.splice(itemToRemoveIndex, 1);
            }
            saveCartToStorage(state);
        },
    },
});

export const { setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
