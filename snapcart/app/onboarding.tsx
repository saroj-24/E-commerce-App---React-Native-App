import React, {useCallback,} from 'react';
import { Image,Text,TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';


SplashScreen.preventAutoHideAsync();
 
const OnboardingScreen = () => {
  const router = useRouter();

  const Done = ({ ...props }) => {
    const { onPress } = props;
    return (
      <TouchableOpacity style={{ marginHorizontal: 25 }} onPress={onPress}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 16, color: '#fff' }}>Done</Text>
      </TouchableOpacity>
    );
  };

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('@/common/assets/fonts/Roboto-Bold.ttf'),
    'Inter-Medium': require('@/common/assets/fonts/Roboto-Medium.ttf'),
    'Inter-Regular': require('@/common/assets/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Onboarding
        titleStyles={{ fontFamily: 'Inter-Regular', fontSize: 30 }}
        subTitleStyles={{ fontFamily: 'Inter-Medium', fontSize: 18 }}
        DoneButtonComponent={Done}
        onDone={() =>router.replace('login')}
        onSkip={() =>router.replace('login')}
        pages={[
          {
            backgroundColor: '#6895D2',
            image: <Image source={require('@/common/assets/images/shopping-cart.png')} />,
            title: 'Welcome to Snapcart',
            subtitle: 'Explore and shop with ease!',
          },
          {
            backgroundColor: '#6895D2',
            image: <Image source={require('@/common/assets/images/cart.png')} />,
            title: 'Find Your Favorites',
            subtitle: 'Discover products you love!',
          },
          {
            backgroundColor: '#6895D2',
            image: <Image source={require('@/common/assets/images/money.png')} />,
            title: 'Secure Checkout',
            subtitle: 'Shop with confidence!',
          },
        ]}
      />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;

