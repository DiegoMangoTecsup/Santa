import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MuseosMenu = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Entradas')} style={styles.option}>
          <AntDesign name="ticket" size={32} color="#8E0E00" />
          <Text style={styles.optionText}>Entradas</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('GraficoVentas')} style={styles.button}>
            <Text style={styles.buttonText}>Ingresos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EntradasEgresos')} style={styles.button}>
            <Text style={styles.buttonText}>Egresos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SalonEventos')} style={styles.option}>
          <AntDesign name="home" size={32} color="#8E0E00" />
          <Text style={styles.optionText}>Salón de Eventos</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('EventosIngresos')} style={styles.button}>
            <Text style={styles.buttonText}>Ingresos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EventosEgresos')} style={styles.button}>
            <Text style={styles.buttonText}>Egresos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Donaciones')} style={styles.option}>
          <AntDesign name="gift" size={32} color="#8E0E00" />
          <Text style={styles.optionText}>Donaciones</Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('DonacionesIngresos')} style={styles.button}>
            <Text style={styles.buttonText}>Ingresos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DonacionesEgresos')} style={styles.button}>
            <Text style={styles.buttonText}>Egresos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  optionContainer: {
    width: '90%',  // Ajuste de ancho proporcional
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  option: {
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#8E0E00',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Asegura que los botones ocupen todo el ancho del contenedor
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#8E0E00',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MuseosMenu;
