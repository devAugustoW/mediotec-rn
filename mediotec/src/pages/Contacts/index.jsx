import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Cards from '../../components/cards';

const Contacts = () => {
	return(
		<View style={styles.container}>
			<Text style={styles.title}>Contatos</Text>
			{/* Grid de Cards*/}
			<View style={styles.gridContainer}>
				<Cards iconName="mail-outline" label="Email" />
				<Cards iconName="logo-whatsapp" label="Whatsapp" />
				<Cards iconName="call-outline" label="Telefone" />
      </View>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',

  },
	title: {
		fontSize: 18,
    fontWeight: 'bold',
		marginTop : 10,
		paddingHorizontal: 30,
	},
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});


export default Contacts;