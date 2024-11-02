import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyClass() {
	const teachers = [
		{id: '1', nome: 'Felipe Santos de Moura'},
		{id: '2', nome: 'Felipe Santos de Moura'},
		{id: '3', nome: 'Felipe Santos de Moura'},
		{id: '4', nome: 'Felipe Santos de Moura'},
		{id: '5', nome: 'Felipe Santos de Moura'},
	];

  // Renderiza cada item da lista de professores
  const renderTeacher = ({ item }) => (
    <View style={styles.teacherItem}>
      <Ionicons name="person-circle-outline" size={24} color="#666" />
      <Text style={styles.teacherName}>{item.nome}</Text>
    </View>
  );


	return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Minha turma</Text>

      {/* Informações da Turma */}
      <View style={styles.classInfoContainer}>
        <Text style={styles.classText}>1º Ano (2024)</Text>
      </View>

      {/* Indicador entre a turma e os profess ores */}
      <View style={styles.divider} />

      {/* Lista de Professores */}
      <View style={styles.teacherContainer}>
        <Text style={styles.sectionTitle}>Professores</Text>
        <FlatList
          data={teachers}
          renderItem={renderTeacher}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};