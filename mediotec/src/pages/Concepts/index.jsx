import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Concepts() {
  const concepts = [
    { id: '1', subject: 'Matemática I', status: 'EXCELENTE' },
    { id: '2', subject: 'Física I', status: 'BOM' },
    { id: '3', subject: 'Biologia I', status: 'REGULAR' },
    { id: '4', subject: 'Química I', status: 'ÓTIMO' },
    { id: '5', subject: 'Matemática I', status: 'EXCELENTE' },
    { id: '6', subject: 'Matemática I', status: 'EXCELENTE' },
    { id: '7', subject: 'Matemática I', status: 'EXCELENTE' },
    { id: '8', subject: 'Matemática I', status: 'EXCELENTE' },
    { id: '9', subject: 'Matemática I', status: 'EXCELENTE' },
  ];

  // Renderiza cada item da lista de conceitos
  const renderConcept = ({ item }) => (
    <View style={styles.conceptItem}>
      <View style={styles.subjectContainer}>
        <Ionicons name="ellipse" size={16} color="#48C8FF" />
        <Text style={styles.subjectText}>{item.subject}</Text>
      </View>

      <View style={[styles.statusTag, styles[`status${item.status}`]]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Conceitos</Text>

      {/* Lista de conceitos */}
      <View style={styles.conceptsContainer}>
        <FlatList
          data={concepts}
          renderItem={renderConcept}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
    paddingHorizontal: 20,
    paddingTop: 20,
		paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conceptsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  conceptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  statusTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  // Cores específicas para cada status
  statusEXCELENTE: {
    backgroundColor: '#4CAF50', // Verde
  },
  statusBOM: {
    backgroundColor: '#FFEB3B', // Amarelo
  },
  statusREGULAR: {
    backgroundColor: '#F44336', // Vermelho
  },
  statusÓTIMO: {
    backgroundColor: '#00BCD4', // Azul claro
  },
});