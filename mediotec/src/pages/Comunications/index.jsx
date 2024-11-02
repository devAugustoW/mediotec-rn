import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Notice = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const notices = [
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '1h atrás',
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '2h atrás',
    },
    {
      id: '3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '3h atrás',
    },
    {
      id: '4',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '4h atrás',
    },
    {
      id: '5',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '5h atrás',
    },
    {
      id: '6',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in urna eget ligula eleifend ultricies.',
      time: '6h atrás',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  const handleOutsidePress = () => {
    if (isSearching) {
      setIsSearching(false);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Comunicados</Text>
          <View style={styles.icons}>
            <TouchableOpacity>
              <Ionicons name="filter" size={20} color="#000" />
            </TouchableOpacity>
            {isSearching ? (
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Pesquisar..."
                autoFocus
              />
            ) : (
              <TouchableOpacity style={styles.iconSpacing} onPress={() => setIsSearching(true)}>
                <Ionicons name="search" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={notices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
		paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  searchInput: {
    marginLeft: 16,
    backgroundColor: '#D3D3D3', 
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A9A9A9', 
    width: 150,
  },
  listContent: {
    paddingBottom: 16,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Notice;