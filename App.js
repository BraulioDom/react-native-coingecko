import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TextInput, FlatList, Text, View, StyleSheet } from 'react-native';

import CoinItem from './components/CoinItem';

const App = () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [refresh, setRefresh] = useState(false)

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.cotainer}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Crytomarket</Text>
        <TextInput
          placeholder="Search a coin"
          placeholderTextColor="#858585"
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          setSearch("");
          setRefresh(false);
        }
        }
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={
          coins.filter(coin =>
            coin.name.toLowerCase().includes(search)
            || coin.symbol.toLowerCase().includes(search)
          )
        }
        renderItem={({ item }) => {
          return <CoinItem coin={item}></CoinItem>
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    marginTop: 5,
    fontSize: 20
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 50
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
    marginBottom: 20
  }
})

export default App;
