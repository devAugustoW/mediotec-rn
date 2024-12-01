import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function DisciplineDetails({ route }) {
  const { discipline } = route.params;

  // Estados para controlar os dados da tela
  const [teacher, setTeacher] = useState(null);
  const [grades, setGrades] = useState({
    pa1: null,
    pa2: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Converte a nota numérica para um conceito (EXCELENTE, ÓTIMO, etc)
  const getGradeConcept = (grade) => {
    if (!grade && grade !== 0) return "-";
    if (grade >= 9) return "EXCELENTE";
    if (grade >= 7.5) return "ÓTIMO";
    if (grade >= 6) return "BOM";
    if (grade >= 4) return "REGULAR";
    return "INSUFICIENTE";
  };

  // Define a cor do fundo baseado no conceito da nota
  const getConceptStyle = (concept) => {
    switch (concept) {
      case "EXCELENTE":
        return styles.excellent;
      case "ÓTIMO":
        return styles.great;
      case "BOM":
        return styles.good;
      case "REGULAR":
        return styles.regular;
      case "INSUFICIENTE":
        return styles.insufficient;
      default:
        return styles.noGrade;
    }
  };

  // Calcula a média entre PA1 e PA2
  const calculateAverage = (pa1, pa2) => {
    if (pa1 === null || pa2 === null) return null;
    return (pa1 + pa2) / 2;
  };

  // Busca os dados do professor e notas quando o componente carrega
  useEffect(() => {
    const fetchData = async () => {
			setLoading(true);

      try {
        // Busca token e dados do usuário do armazenamento local
        const token = await AsyncStorage.getItem("token");
        const userData = await AsyncStorage.getItem("userData");
        const userId = JSON.parse(userData).id;

        // Busca informações do professor da disciplina
        const teacherResponse = await axios.get(
          `https://4.228.217.50/api/subjects/${discipline.id}/teachers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (teacherResponse.data?.data?.teachers?.[0]) {
          setTeacher(teacherResponse.data.data.teachers[0]);
        }

        // Busca as notas do aluno
        const gradesResponse = await axios.get(
          `https://4.228.217.50/api/users/${userId}/grades`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Processa as notas recebidas da API
        if (gradesResponse.data?.data?.grades) {
          const disciplineGrades = gradesResponse.data.data.grades.filter(
            (grade) => grade.subject_id === discipline.id
          );

          setGrades({
            pa1:
              disciplineGrades.find((g) => g.evaluation_type === "PA1")
                ?.grade || null,
            pa2:
              disciplineGrades.find((g) => g.evaluation_type === "PA2")
                ?.grade || null,
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Não foi possível carregar os dados");
        setLoading(false);
      }
    };

    fetchData();
  }, [discipline.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplina</Text>

      <View style={styles.disciplineCard}>
        <Text style={styles.disciplineName}>{discipline.name}</Text>
      </View>

      <View style={styles.gradesCard}>
        <Text style={styles.cardTitle}>Conceitos</Text>
        <View style={styles.gradeRow}>
          <Text style={styles.gradeLabel}>1ª PA</Text>
          <Text
            style={[
              styles.gradeValue,
              getConceptStyle(getGradeConcept(grades.pa1)),
            ]}
          >
            {getGradeConcept(grades.pa1)}
          </Text>
        </View>
        <View style={styles.gradeRow}>
          <Text style={styles.gradeLabel}>2ª PA</Text>
          <Text
            style={[
              styles.gradeValue,
              getConceptStyle(getGradeConcept(grades.pa2)),
            ]}
          >
            {getGradeConcept(grades.pa2)}
          </Text>
        </View>
        <View style={styles.gradeRow}>
          <Text style={styles.gradeLabel}>MÉDIA</Text>
          <Text
            style={[
              styles.gradeValue,
              getConceptStyle(
                getGradeConcept(calculateAverage(grades.pa1, grades.pa2))
              ),
            ]}
          >
            {getGradeConcept(calculateAverage(grades.pa1, grades.pa2))}
          </Text>
        </View>
      </View>

      <View style={styles.teachersCard}>
        <Text style={styles.cardTitle}>Professor</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : teacher ? (
          <View style={styles.teacherRow}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.teacherName}>{teacher.name}</Text>
          </View>
        ) : (
          <Text style={styles.teacherName}>Nenhum professor encontrado</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  disciplineCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  disciplineName: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  gradesCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  teachersCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  teacherName: {
    fontSize: 14,
    color: "#666",
  },
  gradeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  gradeLabel: {
    fontSize: 14,
    color: "#666",
  },
  gradeValue: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  eexcellent: {
    backgroundColor: "#4B6BF5",
    color: "#FFF",
  },
  great: {
    backgroundColor: "#1ea719",
    color: "#FFF",
  },
  good: {
    backgroundColor: "#9747FF",
    color: "#FFF",
  },
  regular: {
    backgroundColor: "#FFA947",
    color: "#FFF",
  },
  insufficient: {
    backgroundColor: "#FF4747",
    color: "#FFF",
  },
  noGrade: {
    backgroundColor: "#999",
    color: "#FFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
