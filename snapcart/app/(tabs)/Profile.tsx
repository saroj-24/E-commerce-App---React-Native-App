import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'
import Button from '@/common/components/Button';
import useProgressBar from '@/common/hooks/useProgressBar';
import React, { useEffect, useState } from 'react';
import { logout } from '@/common/hooks/useAuth';
import COLORS from '@/common/assets/constants/Color';
import { auth, db } from '@/common/config/firebase'
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const Profile = () => {
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useProgressBar();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<{ name: string; email: string; gender: string; dob: string } | null>(null);

  const handlesignout = async () => {
    startLoading();
    const res = await logout();
    stopLoading();
    if (res?.success) {
      alert('logout successfully')
      router.replace('login')
    } else {
      alert("Error while logingout")
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as { name: string; email: string; gender: string; dob: string });
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
      <Image source={require('@/common/assets/images/shopcart.png')} style={styles.image} />
      <Text style={styles.titleText}> Hi Welcome to Snapcart 🛒</Text>
      </View>
      <View style={styles.textView}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData?.name}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData?.email}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{userData?.gender}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{userData?.dob}</Text>
        </View>

      </View>
      <Button
        title="Logout"
        filled
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          marginTop: 16,
          width: "100%",
          marginBottom: 2,
          borderColor: COLORS.black,
          backgroundColor: COLORS.profilecolor

        }}
        onPress={handlesignout}
      />

    </SafeAreaView>
  );
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 30,
    
  },
  textView:{
       display:'flex',
       marginTop:30,
       
  },
  profileContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer:{
       position:'relative',
  },
  image: {
    width: "100%",
    height: 150,

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  value: {
    fontSize: 16,
    color: COLORS.green,
  },
  textContainer: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
    gap: 10
  },
  titleText:{
    position:'absolute',
    top:100,
    left:35,
    fontSize:20,
    textAlign:'center',
    backgroundColor:'#E5E0FF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5

  }
});
