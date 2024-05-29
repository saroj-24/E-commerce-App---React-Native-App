import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import COLORS from '../assets/constants/Color';

// Define the Props Interface
interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
    filled?: boolean;
    style?: ViewStyle | ViewStyle[];
}

export const Button: React.FC<ButtonProps> = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: bgColor,
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, color: textColor }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        // borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Button
