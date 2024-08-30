import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Picker } from 'react-native';
import axios from 'axios';

// Importaciones específicas para web
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';

// Importaciones específicas para móvil
import DateTimePicker from '@react-native-community/datetimepicker';

const FormularioEntradas = ({ navigation }) => {
  const [tipoEntrada, setTipoEntrada] = useState('general');
  const [cantidad, setCantidad] = useState(1);
  const [dni, setDni] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleSubmit = async () => {
    if (dni.length > 8 || !/^\d+$/.test(dni)) {
      alert('El DNI debe ser un número de hasta 8 dígitos.');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
      alert('El precio debe ser un número válido.');
      return;
    }

    try {
      const data = {
        tipoEntrada,
        cantidad,
        dni,
        precio: parseFloat(precio), // Convierte precio a número
        fecha,
      };
      console.log('Enviando datos:', data);
      
      const response = await axios.post('http://localhost:5000/entradas', data);
  
      if (response.status === 200) {
        alert('Entrada registrada exitosamente');
        if (navigation) {
          navigation.goBack();
        }
      } else {
        alert('Error al registrar la entrada');
      }
    } catch (error) {
      console.error('Error registrando la entrada:', error);
      alert('Error registrando la entrada');
    }
  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowFecha(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Entradas</Text>
        
        <Text style={styles.label}>Tipo de Entrada:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoEntrada}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoEntrada(itemValue)}
          >
            <Picker.Item label="General" value="general" />
            <Picker.Item label="Premium" value="premium" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="DNI (máximo 7 dígitos)"
          value={dni}
          onChangeText={setDni}
          keyboardType="numeric"
          maxLength={7}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        {Platform.OS === 'web' ? (
          <>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Fecha:</Text>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                dateFormat="dd/MM/yyyy"
                customInput={
                  <TouchableOpacity style={styles.datePickerInput} onClick={() => setShowFecha(true)}>
                    <Text style={styles.dateText}>{fecha.toLocaleDateString()}</Text>
                    <AiOutlineCalendar size={20} color="#333" />
                  </TouchableOpacity>
                }
              />
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setShowFecha(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>Fecha: {fecha.toDateString()}</Text>
            </TouchableOpacity>
            {showFecha && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fecha}
                mode="date"
                display="default"
                onChange={onChangeFecha}
              />
            )}
          </>
        )}

        <View style={styles.cantidadContainer}>
          <Text style={styles.cantidadLabel}>Cantidad:</Text>
          <TouchableOpacity onPress={disminuirCantidad} style={styles.cantidadButton}>
            <Text style={styles.cantidadButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.cantidadInput}
            value={String(cantidad)}
            onChangeText={(text) => setCantidad(Number(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={aumentarCantidad} style={styles.cantidadButton}>
            <Text style={styles.cantidadButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  dateInput: {
    height: 40,
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  datePickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 40,
  },
  dateText: {
    fontSize: 16,
    marginRight: 5,
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cantidadLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  cantidadButton: {
    padding: 10,
    backgroundColor: '#8E0E00',
    borderRadius: 5,
  },
  cantidadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cantidadInput: {
    height: 40,
    width: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#8E0E00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioEntradas;
