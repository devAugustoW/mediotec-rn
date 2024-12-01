import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Statistics() {
    // Dados mockados para exemplo
    const statistics = {
        presenca: '85%',
        mediaGeral: '8.5',
        disciplinas: [
            { nome: 'Matemática', media: '9.0' },
            { nome: 'Português', media: '8.5' },
            { nome: 'História', media: '8.0' },
            { nome: 'Geografia', media: '8.8' },
            { nome: 'Ciências', media: '9.2' },
        ]
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Desempenho Escolar</Text>

            {/* Card de Presença */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Frequência</Text>
                <Text style={styles.statNumber}>{statistics.presenca}</Text>
                <Text style={styles.statDescription}>de presença nas aulas</Text>
            </View>

            {/* Card de Média Geral */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Média Geral</Text>
                <Text style={styles.statNumber}>{statistics.mediaGeral}</Text>
                <Text style={styles.statDescription}>média de todas as disciplinas</Text>
            </View>

            {/* Médias por Disciplina */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Médias por Disciplina</Text>
                {statistics.disciplinas.map((disciplina, index) => (
                    <View key={index} style={styles.disciplinaRow}>
                        <Text style={styles.disciplinaName}>{disciplina.nome}</Text>
                        <Text style={styles.disciplinaMedia}>{disciplina.media}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    statNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 8,
    },
    statDescription: {
        fontSize: 14,
        color: '#666',
    },
    disciplinaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    disciplinaName: {
        fontSize: 16,
        color: '#333',
    },
    disciplinaMedia: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2196F3',
    },
});