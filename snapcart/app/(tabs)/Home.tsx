import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, FlatList, ActivityIndicator,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPaginatedProducts } from "@/common/config/product";
import { Product } from "@/common/models/types";
import NewArrival from "@/common/components/NewArrival";
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/common/context/AuthContext';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext)
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { products: newProducts, lastVisible: newLastVisible } = await getPaginatedProducts(10, lastVisible);
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setLastVisible(newLastVisible);
    } catch (error:any) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      if (searchQuery) {
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [searchQuery, products]);

  const loadMore = () => {
    if (!loading && lastVisible) {
      fetchProducts();
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable onPress={() => router.navigate('productitemscreen')} key={item.id} style={{ flex: 1, margin: 5 }}>
      <NewArrival
        title={item.title}
        image={item.image}
        description={item.description}
        price={item.price}
        brand={item.brand}
      />
    </Pressable>
  );

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color="black" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#666666"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-outline" size={22} color="black" />
            </Pressable>
          ) : null}
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome {user ? user.name: 'user'}</Text>
        <Text style={styles.subWelcomeText}>To Snapcart 🛒</Text>
      </View>

      <View style={styles.newArrivalsContainer}>
        <View style={styles.newArrivalsHeader}>
          <Text style={styles.newArrivalsText}>New Arrivals</Text>
          <Pressable onPress={() => router.navigate('productitemscreen')}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
  searchInput: {
    paddingHorizontal: 10,
    flex: 1,
  },
  welcomeContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  subWelcomeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#888888',
  },
  newArrivalsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  newArrivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newArrivalsText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  viewAllText: {
    fontSize: 14,
    color: 'black',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
export default Home;
