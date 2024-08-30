import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ListaEntradas = () => {
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    const fetchEntradas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/entradas');
        setEntradas(response.data);
      } catch (error) {
        console.error('Error fetching entradas:', error);
      }
    };

    fetchEntradas();
  }, []);

  const editarEntrada = (id) => {
    // Lógica para editar la entrada
    Alert.alert(`Editar entrada con ID: ${id}`);
  };

  const eliminarEntrada = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/entradas/${id}`);
      setEntradas(prevEntradas => prevEntradas.filter(entrada => entrada._id !== id));
    } catch (error) {
      console.error('Error deleting entrada:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item._id}</Text>
      <Text style={styles.itemText}>Tipo: {item.tipoEntrada}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.itemText}>DNI: {item.dni}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => editarEntrada(item._id)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => eliminarEntrada(item._id)}
        >
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entradas}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#8E0E00',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ListaEntradas;
