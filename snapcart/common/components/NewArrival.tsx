import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface NewArrivalProps {
  title: string;
  image: string;
  description: string;
  price: string;
  brand: string;
}

const NewArrival: React.FC<NewArrivalProps> = ({ title, image, description, price, brand }) => {

  const [showMore,setShowMore] = useState(false)

  const additionalProp = {
    numberOfLines: showMore ? undefined : 5
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        {/* Uncomment and use the code below if you want to add the description and show more functionality
        <Text {...additionalProp} style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text>{showMore ? "show less" : "show more"}</Text>
        </TouchableOpacity>
        */}
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
  },
});
export default NewArrival;
