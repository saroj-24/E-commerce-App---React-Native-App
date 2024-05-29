import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '@/common/assets/constants/Color';
import { Ionicons } from "@expo/vector-icons";
import Button from '@/common/components/Button';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ProgressBar } from 'react-native-paper';
import useProgressBar from '@/common/hooks/useProgressBar';
import { loginWithEmailAndPassword } from '@/common/hooks/useAuth';
import {AuthContext} from '@/common/context/AuthContext';

const LoginScreen = () => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { user,login,logout } = useContext(AuthContext);
  const { loading, startLoading, stopLoading } = useProgressBar();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });
  const handleSignin = async(values: { email: string, password: string }) => {
    startLoading();
    const { email, password } = values;
    const res = await loginWithEmailAndPassword(email, password);
    stopLoading();
    if (res?.success) {
      login(res.user)
      router.replace('Home');
    } else {
      alert('Invalid Email and Password');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Hi Welcome Snapcart 🛒
          </Text>

          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Choose your favorite with snapcart</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={{ marginBottom: 12 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '400',
                  marginVertical: 8
                }}>Email address</Text>

                <View style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22
                }}>
                  <TextInput
                    placeholder='Enter your email address'
                    placeholderTextColor={COLORS.black}
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={{
                      width: "100%"
                    }}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={{ color: 'red' }}>{errors.email}</Text>
                )}
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '400',
                  marginVertical: 8
                }}>Password</Text>

                <View style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22
                }}>
                  <TextInput
                    placeholder='Enter your password'
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={!isPasswordShown}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    style={{
                      width: "100%"
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => setIsPasswordShown(!isPasswordShown)}
                    style={{
                      position: "absolute",
                      right: 12
                    }}
                  >
                    {
                      isPasswordShown ? (
                        <Ionicons name="eye" size={24} color={COLORS.black} />
                      ) : (
                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                      )
                    }
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={{ color: 'red' }}>{errors.password}</Text>
                )}
              </View>

              {loading ? (
                  <ProgressBar indeterminate={true} color={COLORS.primary} style={{ marginVertical: 18, justifyContent:'center' }} />
                ) : (
                  <Button
                    title="Login"
                    filled
                    style={{
                      marginTop: 16,
                      marginBottom: 2,
                    }}
                    onPress={handleSubmit}
                  />
                )}
              </>
            )}
        </Formik>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
          <Pressable
            onPress={() => router.navigate('signup')}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default LoginScreen;
