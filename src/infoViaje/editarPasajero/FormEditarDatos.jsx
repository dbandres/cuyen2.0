import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function FormEditarDatos({ setInputChanged, formValues, setFormValues, newDate, setNewDate }) {

  const fechaMax = new Date(2019, 0, 1);
  const fechaMin = new Date(2000, 0, 1)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleInputChange = (inputName, text) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [inputName]: text,
    }));

    // Indicar que algún input ha cambiado
    setInputChanged(true);
  };

  useEffect(() => {
    if (date.getFullYear() < 2024) {
      // Dividir la cadena por la barra "/"
      // Crear un objeto Date
      const fechaObjeto = new Date(date);

      // Obtener el nombre abreviado del mes
      const mesesAbreviados = [
        "ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"
      ];
      const nombreMesAbreviado = mesesAbreviados[fechaObjeto.getUTCMonth()];

      // Formatear la fecha en el formato deseado
      const fechaFormateada = `${fechaObjeto.getUTCDate()}/${nombreMesAbreviado}/${fechaObjeto.getUTCFullYear()}`;
      setNewDate(fechaFormateada)
    }
  }, [date])

  const inputImages = {
    dni: require('../../assets/badge.png'),
    nombre: require('../../assets/account.png'),
    apellido: require('../../assets/account.png'),
    fechaNac: require('../../assets/calendar_month.png'),
  };

  return (
    <View style={{ width: "90%", height: 200 }}>
      {Object.keys(formValues).map(inputName => (
        <View key={inputName} style={styles.inputContainer}>
          <Image source={inputImages[inputName]} style={styles.icon} />
          {
            inputName === "dni" ?
              <TextInput
                value={formValues[inputName]}
                onChangeText={text => handleInputChange(inputName, text)}
                keyboardType={'numeric'} // Teclado numérico
                style={{ width: "90%", color: "#564C71" }}
              />
              :
              inputName === "fechaNac" ?
                <>
                  <TouchableOpacity style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => setOpen(true)}>
                    {
                      newDate ?
                        <Text style={{
                          paddingLeft: 10,
                          alignItems: "center",
                          fontWeight: "600",
                          fontSize: 14,
                          lineHeight: 16,
                          borderRadius: 8,
                          color: "#564C71"
                        }}>
                          {newDate}
                        </Text>
                        :
                        <Text style={{
                          paddingLeft: 0,
                          alignItems: "center",
                          fontWeight: "600",
                          fontSize: 14,
                          lineHeight: 16,
                          borderRadius: 8,
                          color: "#564C71"
                        }}>
                          {formValues[inputName]}
                        </Text>
                    }
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                      mode="date"
                      title="Seleccione su fecha de nacimiento"
                      confirmText="Confirmar"
                      cancelText="Cancelar"
                      locale="es"
                      maximumDate={fechaMax}
                      minimumDate={fechaMin}
                    />
                  </TouchableOpacity>
                </>
                :
                <TextInput
                  value={formValues[inputName]}
                  onChangeText={text => handleInputChange(inputName, text)}
                  style={{ width: "90%", color: "#564C71" }}
                />
          }
        </View>
      ))
      }
    </View >
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: width * 0.8,
    height: 40,
    borderWidth: 1,
    borderColor: "#CDD1DF",
    borderRadius: 10,
    paddingLeft: 10
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});