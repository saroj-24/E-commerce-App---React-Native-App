import React, {useEffect, useState} from 'react';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './onboarding';
import store from '@/common/redux/store';
import {setCart} from '@/common/redux/cartSlice'

const LoadCartData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          dispatch(setCart(JSON.parse(savedCart)));
        }
      } catch (error) {
        console.error('Failed to load cart data', error);
      }
    };
    loadCart();
  }, [dispatch]);
  return null;
};

const App = () => {
  return (
    <Provider store={store}>
      <LoadCartData />
      <OnboardingScreen />
    </Provider>
  );
};
export default App;

