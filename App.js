import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TextInput, FlatList, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const refreshView = async () => {
    setRefresh(true);
    setSearch("");
    await loadData();
    setRefresh(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.cotainer}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>CrytoMarket</Text>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search a coin"
            placeholderTextColor="#858585"
            style={styles.searchInput}
            onChangeText={search => setSearch(search)}
            value={search}
          />
          <Ionicons
            size={25}
            name="md-reload"
            style={styles.iconReload}
            onPress={() => refreshView()}
          />
        </View>
      </View>
      <FlatList
        refreshing={refresh}
        onRefresh={() => { refreshView() }}
        style={styles.list}
        // showsVerticalScrollIndicator={false}
        data={coins.filter((coin) =>
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
    paddingTop: 30
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
    overflow: 'hidden',
    width: '90%',
    marginBottom: 30
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  iconReload: {
    color: '#4657CE',
    marginHorizontal: 20
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
})

export default App;
