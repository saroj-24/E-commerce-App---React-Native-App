import { View, Text, Pressable, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '@/common/assets/constants/Color';
import { Ionicons } from "@expo/vector-icons";
import Button from '@/common/components/Button';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DatePickerComponent} from '@/common/components';
import usePasswordVisibility from '@/common/hooks/usePasswordVisibility';
import RNPickerSelect from 'react-native-picker-select';
import dayjs from 'dayjs';
import { signupWithEmailAndPassword } from '@/common/hooks/useAuth';
import { ProgressBar } from 'react-native-paper';
import useProgressBar from '@/common/hooks/useProgressBar';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  date: Yup.string()
    .test('is-valid-date', 'Invalid date', value => dayjs(value, 'YYYY-MM-DD', true).isValid())
    .required('Date is required'),
  gender: Yup.string().required('Gender is required')
});

const SignUpScreen = () => {
  const router = useRouter();
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const { loading, startLoading, stopLoading } = useProgressBar();

  const handleSignup = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    date: string;
    gender: string;
  }) => {
    startLoading(); 
    const { name, email, password, confirmPassword, date, gender } = values;
    const res = await signupWithEmailAndPassword(name, email, password, confirmPassword, date, gender);
    stopLoading(); 
    if (res?.success) {
      router.replace('Home');
    } else {
      alert(res.error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 18 }}>
          <View style={{ marginVertical: 18 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 10,
              color: COLORS.headline
            }}>
              Hi Welcome To Snapcart 🛒
            </Text>

            <Text style={{
              fontSize: 16,
              color: COLORS.green
            }}>Signup With Snapcart and Shop with snapcart</Text>
          </View>

          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', date: '', gender: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 6
                  }}>Name</Text>

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
                      placeholder='Enter your name'
                      placeholderTextColor={COLORS.black}
                      onChangeText={handleChange('name')}
                      keyboardType='default'
                      onBlur={handleBlur('name')}
                      value={values.name}
                      style={{
                        width: "100%"
                      }}
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text style={{ color: 'red' }}>{errors.name}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 6
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
                <View style={{ marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 6
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
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={{
                        width: "100%"
                      }}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: 12
                      }}
                    >
                      {
                        isPasswordVisible ? (
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

                <View style={{ marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 6
                  }}>Confirm Password</Text>

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
                      placeholder='Re-enter your password'
                      placeholderTextColor={COLORS.black}
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      style={{
                        width: "100%"
                      }}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: 12
                      }}
                    >
                      {
                        isPasswordVisible ? (
                          <Ionicons name="eye" size={24} color={COLORS.black} />
                        ) : (
                          <Ionicons name="eye-off" size={24} color={COLORS.black} />
                        )
                      }
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 10 }}>
                  <DatePickerComponent
                    label="Date of Birth"
                    date={values.date}
                    onDateChange={(date) => setFieldValue('date', date)} />

                  {errors.date && touched.date && (
                    <Text style={{ color: 'red' }}>{errors.date}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 2
                  }}>Select Gender</Text>
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
                    <RNPickerSelect
                      onValueChange={(value) => setFieldValue('gender', value)}
                      items={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Others', value: 'Others' },
                      ]}
                      style={{
                        inputIOS: {
                          height: 48,
                          borderColor: COLORS.black,
                          borderWidth: 1,
                          borderRadius: 8,
                          paddingHorizontal: 10,
                          paddingLeft: 22,
                          color: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center'
                        },
                        inputAndroid: {
                          height: 48,
                          borderColor: COLORS.black,
                          borderWidth: 1,
                          borderRadius: 8,
                          paddingHorizontal: 10,
                          paddingLeft: 22,
                          color: COLORS.black,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }
                      }}
                    />
                  </View>
                  {errors.gender && touched.gender && (
                    <Text style={{ color: 'red' }}>{errors.gender}</Text>
                  )}
                </View>

                {loading ? (
                  <ProgressBar indeterminate={true} color={COLORS.primary} style={{ marginVertical: 18, justifyContent:'center' }} />
                ) : (
                  <Button
                    title="Signup"
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
            marginVertical: 20
          }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account ? </Text>
            <Pressable
              onPress={() => router.replace('login')}
            >
              <Text style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6
              }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignUpScreen;
