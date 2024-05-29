// DatePickerComponent.tsx
import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import dayjs from 'dayjs';

interface DatePickerComponentProps {
  label: string;
  date: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  date,
  onDateChange,
  placeholder = "Select date",
  minDate = "1900-01-01",
  maxDate = dayjs().format('YYYY-MM-DD')
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onValueChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      onDateChange(formattedDate);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
        {label}
      </Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text>{date || placeholder}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          minimumDate={new Date(minDate)}
          maximumDate={new Date(maxDate)}
          onChange={onValueChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingLeft: 22,
    justifyContent: 'center'
  }
});

export default DatePickerComponent;
