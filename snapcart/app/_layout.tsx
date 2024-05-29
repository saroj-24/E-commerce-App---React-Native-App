import { Stack } from 'expo-router/stack';
import { ProductProvider } from '@/common/context/productContext';
import { Provider } from 'react-redux';
import store from '@/common/redux/store';
import { AuthProvider } from '@/common/context/AuthContext';

export default function AppLayout() {
  return (
    <Provider store={store}>
    <ProductProvider>
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false, }}>
     <Stack.Screen name="(tabs)" />
     <Stack.Screen name="Home"/>
    </Stack>
    </AuthProvider>
    </ProductProvider>
    </Provider>
  );
}
