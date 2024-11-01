import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ForgotPassword = () => {

	return (
		<View style={styles.container}>
			<Text>Tela Esqueceu a Senha</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',		
		alignItems: 'center',
	},
})

export default ForgotPassword;