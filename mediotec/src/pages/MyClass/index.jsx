import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function MyClass() {
  // Estados para controlar os dados e o estado da tela
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Função que formata o nome da turma para exibição
  const formatClassName = (classItem) => {
    const turmaToAno = {
      "Turma I": "1º Ano",
      "Turma II": "2º Ano",
      "Turma III": "3º Ano",
    };

    const anoLabel = turmaToAno[classItem.name] || "1º Ano";
    return `${anoLabel} (${classItem.year})`;
  };

  // Função que busca as disciplinas de uma turma específica
  const fetchDisciplines = async (classId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `https://4.228.217.50/api/classes/${classId}/subjects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

			// Verifica os dados da API e atualiza o estado
      if (response.data && response.data.data && response.data.data.subjects) {
        setDisciplines(response.data.data.subjects);

      } else {
        setDisciplines([]);
				
      }
      setLoading(false);

    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      setDisciplines([]);
      setLoading(false);
    }
  };

  // Effect que busca as turmas do usuário ao carregar o componente
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const userData = await AsyncStorage.getItem("userData");
        const userId = JSON.parse(userData).id;
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          `https://4.228.217.50/api/users/${userId}/classes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data && response.data.data.classes) {
          const fetchedClasses = response.data.data.classes;
          setClasses(fetchedClasses);
          // Seleciona a primeira turma por padrão e busca suas disciplinas
          if (fetchedClasses.length > 0) {
            setSelectedClass(fetchedClasses[0].id);
            fetchDisciplines(fetchedClasses[0].id);
          }
        } else {
          setClasses([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar classes:", error);
        setError("Não foi possível carregar as classes");
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Effect que busca as disciplinas quando uma nova turma é selecionada
  useEffect(() => {
    if (selectedClass) {
      fetchDisciplines(selectedClass);
    }
  }, [selectedClass]);

  // Função que navega para os detalhes da disciplina selecionada
  const handleDisciplinePress = (discipline) => {
    navigation.navigate("DisciplineDetails", { discipline });
  };

  // Renderiza o indicador de loading
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  // Renderiza mensagem de erro se houver
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minhas turmas</Text>

      {classes && classes.length > 0 ? (
        <View style={styles.classContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            {classes.map((classItem) => (
              <Picker.Item
                key={classItem.id}
                label={formatClassName(classItem)}
                value={classItem.id}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <View style={styles.classContainer}>
          <Text style={styles.classText}>Nenhuma turma encontrada</Text>
        </View>
      )}

      <View style={styles.disciplinesContainer}>
        <Text style={styles.subtitle}>Disciplinas</Text>
        {disciplines.length > 0 ? (
          disciplines.map((discipline) => (
            <TouchableOpacity
              key={discipline.id}
              style={styles.disciplineItem}
              onPress={() => handleDisciplinePress(discipline)}
            >
              <Text style={styles.disciplineText}>{discipline.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.disciplineItem}>
            <Text style={styles.disciplineText}>
              Nenhuma disciplina encontrada
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  classContainer: {
    // Mudado de turmaContainer
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  classContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    overflow: "hidden", // Importante para o borderRadius funcionar com o Picker
  },
  classText: {
    // Mudado de turmaText
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  disciplinesContainer: {
    // Mudado de disciplinasContainer
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  disciplineItem: {
    // Mudado de disciplinaItem
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  disciplineText: {
    // Mudado de disciplinaText
    fontSize: 16,
    color: "#444",
  },
});
