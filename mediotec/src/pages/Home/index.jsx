import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigation/navigationRef';
import userImg from '../../assets/user-img.png';
import Cards from '../../components/cards';
import Concepts from '../Concepts';

export default function Home() {
	const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function goToDisciplines() {
    navigate('Disciplines');
  }

  function goToConcepts() {
    navigate('Concepts');
  }

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Olá, Aluno(a)!</Text>
        <TouchableOpacity style={styles.profileIconContainer} onPress={toggleExpanded}>
          <Image source={userImg} style={styles.profileIcon} />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.optionsContainer}>
            <View style={styles.option}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar foto</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.option}>
              <Ionicons name="shield-half-outline" size={20} color="black" />
              <Text style={styles.optionText}>Alterar senha</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.option}>
              <Ionicons name="log-out-outline" size={20} color="black" />
              <Text style={styles.optionText}>Sair</Text>
            </View>
            <View style={styles.separator} />
          </View>
        )}
      </View>

      {/* Grid de disciplinas */}
      <View style={styles.gridContainer}>
        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={goToDisciplines}>
            <Cards iconName="book" label="Disciplinas" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={() => alert('Minha Turma')}>
            <Cards iconName="people" label="Minha turma" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={goToConcepts}>
            <Cards iconName="school" label="Conceitos" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={() => alert('Comunicados')}>
            <Cards iconName="chatbubbles" label="Comunicados" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={() => alert('Contatos')}>
            <Cards iconName="call" label="Contatos" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.cardTouchable} onPress={() => alert('Financeiro')}>
            <Cards iconName="cash" label="Financeiro" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginTop: 30,
  },
  greetingContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    width: '98%',
    marginVertical: 10,
    borderRadius: 30,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cardWrapper: {
    width: '30%',
    margin: 10,
    alignItems: 'center',
  },
  cardTouchable: {
    width: '100%',
    alignItems: 'center',
  },
});