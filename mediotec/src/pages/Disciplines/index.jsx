import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Cards from '../../components/cards';

function Disciplines() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplinas</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <Cards iconName="people" label="Matemática" />
        <Cards iconName="people" label="Física" />
        <Cards iconName="people" label="Química" />
        <Cards iconName="people" label="Biologia" />
        <Cards iconName="people" label="História" />
        <Cards iconName="people" label="Português" />
        <Cards iconName="people" label="Geografia" />
        <Cards iconName="people" label="Programação" />
        <Cards iconName="people" label="Rede de Computadores" />
        <Cards iconName="people" label="Programação" />
        <Cards iconName="people" label="Programação" />
        <Cards iconName="people" label="Programação" />
        <Cards iconName="people" label="Programação" />
        <Cards iconName="people" label="Programação" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
		margin: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20, 
  },
});

export default Disciplines;