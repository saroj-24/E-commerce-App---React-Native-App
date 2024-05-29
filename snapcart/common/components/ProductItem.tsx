import { Text, View, Image, Pressable,ToastAndroid ,StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
interface NewArrivalProps {
  id?: string;
  title: string;
  image: string;
  description: string;
  price: string;
  brand: string;
  onItemAdd: ()=> void
}

const ProductItem: React.FC<NewArrivalProps> = ({ id, title, image, price, brand,onItemAdd }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.brand}>{brand}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Price: ${price}</Text>
            </View>
            <Pressable
              onPress={onItemAdd}
              disabled={added}
              style={[styles.button, added ? styles.buttonDisabled : styles.buttonEnabled]}
            >
              <Text style={styles.buttonText}>{added ? 'Added to Cart' : 'Add to Cart'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 8, 
    marginLeft: 8, 
    marginBottom: 8,
    flex: 1,
  },
  card: {
    backgroundColor: '#A7F3D0',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1, 
    borderColor: '#94A3B8',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, 
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10, 
    height: 80,
    width: 80, 
    resizeMode: 'contain', 
  },
  infoContainer: {
    flex: 1,
    width: '100%', 
    padding: 8, 
  },
  title: {
    fontWeight: 'bold', 
  },
  brand: {
    fontSize: 12, 
  },
  priceContainer: {
    marginTop: 8, 
  },
  price: {
    fontSize: 12, 
  },
  button: {
    marginTop: 8,
    padding: 8, 
    borderRadius: 10, 
  },
  buttonEnabled: {
    backgroundColor: '#3B82F6', 
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default ProductItem;
