import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { InfoPasajero } from "../../cargaPasajero/InfoPasajero";
import { useEffect, useState } from "react";
import { FormEditarDatos } from "./FormEditarDatos";
import { MensajeAlerta } from "../../cargaPasajero/MensajeAlerta";
import { AdjuntarArchivos } from "../../cargaPasajero/AdjuntarArchivos";
import { ModalDieta } from "../../cargaPasajero/ModalDieta";


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function EditarInfoText({ pasajero }) {

  const [seteoData, setSeteoData] = useState(false)
  const [editing, setEditing] = useState(false)
  const [inputChanged, setInputChanged] = useState(false);
  const [newDate, setNewDate] = useState("")
  const [progressAttachment, setProgressAttachment] = useState({
    ficha: 0,
    dni: 0,
    carnet: 0,
    declaracion: 0,
    dieta: 0
  })

  const [modalVisible2, setModalVisible2] = useState(false);
  const [error, setError] = useState(true)

  const archivos = ["Ficha medica", "Declaración jurada", "Documento de identidad", "Carnet de obra social"];

  const [formValues, setFormValues] = useState({
    dni: pasajero[0].dni,
    nombre: pasajero[0].nombre,
    apellido: pasajero[0].apellido,
    fechaNac: pasajero[0].fechaNac,
  });
  const [adjuntos] = useState({
    ficha_med: pasajero[0].ficha_med,
    dec_jurada: pasajero[0].dec_jurada,
    image_dni: pasajero[0].image_dni,
    obra_soc: pasajero[0].obra_soc
  })

  // Función para modificar un valor específico en el estado
  const increaseProgress = (key, newValue) => {
    setProgressAttachment(prevState => ({
      ...prevState,
      [key]: newValue
    }));
  };

  // Función para obtener la suma de todos los valores en el estado
  const getSum = () => {
    const valuesArray = Object.values(progressAttachment);
    const sum = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
  };

  const openDietaModal = () => {
    setModalVisible2(true)
  }

  const closerDietaModal = () => {
    setModalVisible2(false)
  }

  useEffect(() => {
    getSum()
  }, [progressAttachment])

  useEffect(() => {
    if (pasajero[0].dieta !== null && pasajero[0].dieta !== undefined) {
      console.log('tenemos dieta!');
      if (pasajero[0].dieta.vegetariano === true) {
        console.log('es vegetariano');
        increaseProgress("dieta", 20)
        setError(false)
      }
      else if (pasajero[0].dieta.vegano === true) {
        increaseProgress("dieta", 20)
        setError(false)
      }
      else if (pasajero[0].dieta.celiaco === true) {
        increaseProgress("dieta", 20)
        setError(false)
      }
      else if (pasajero[0].dieta.intoleranteLactosa === true) {
        increaseProgress("dieta", 20)
        setError(false)
      }
      else if (pasajero[0].dieta.ningunaDietaEspecial === true) {
        increaseProgress("dieta", 20)
        setError(false)
      }
    } else {
      console.log("No tiene dieta");
    }

  }, [pasajero[0].dieta])

  const changeInputs = () => {
    setSeteoData(true)
    setEditing(true)
    setFormValues({
      dni: pasajero[0].dni,
      nombre: pasajero[0].nombre,
      apellido: pasajero[0].apellido,
      fechaNac: pasajero[0].fechaNac,
    })
  }

  const changeInputsCancel = () => {
    setSeteoData(false)
    setEditing(false)
    setInputChanged(false)
    setFormValues({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNac: '',
    })
    setNewDate("")
  }

  const handleDieta = () => {
    openDietaModal()
    setModalVisible2(true)
  }

  return (
    <View style={{ justifyContent: "center", alignItems: 'center' }}>
      <ModalDieta visible={modalVisible2} onClose={closerDietaModal} data={pasajero[0]} setError={setError} increaseProgress={increaseProgress} />
      {
        editing === false ?
          <View style={{ width: width * 0.8, justifyContent: "center", alignItems: 'center' }}>
            <InfoPasajero
              info={pasajero[0]}
            />
          </View>
          :
          <FormEditarDatos
            info={pasajero[0]}
            setInputChanged={setInputChanged}
            formValues={formValues}
            setFormValues={setFormValues}
            newDate={newDate}
            setNewDate={setNewDate}
          />
      }
      {
        seteoData === false ?
          <TouchableOpacity onPress={changeInputs} style={{ width: width * 0.8, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
              Editar datos
            </Text>
          </TouchableOpacity>
          :
          <>
            <TouchableOpacity disabled={inputChanged === true || newDate.length !== 0 ? false : true} style={{ width: width * 0.8, height: 47, borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: inputChanged === true || newDate.length !== 0 ? "#FF3D00" : "#CDD1DF", marginBottom: 15, marginTop: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>
                Guardar cambios
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeInputsCancel} style={{ width: width * 0.8, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </>
      }
      <View style={{ width: 282, height: 44, justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
        <MensajeAlerta />
      </View>
      <View style={{ width: 320, height: 96, marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
        {archivos.map((archivo, index) => (
          <AdjuntarArchivos key={index} children={archivo} increaseProgress={increaseProgress} data={pasajero[0]} adjuntos={adjuntos} />
        ))}
      </View>
      <TouchableOpacity onPress={handleDieta} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
          Ajustar Dieta especial del pasajero
        </Text>
      </TouchableOpacity>
      {
        error === true ?
          <View style={{ display: "flex", flexDirection: "row", width: 318, height: 30, alignItems: "center", marginBottom: 20 }}>
            <Image
              source={require("../../assets/Error.png")}
              style={{ width: 30, height: 30, marginLeft: 10 }}
            />
            <Text style={{ color: "#FF6363", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>
              Se requiere completar la dieta especial.
            </Text>
          </View>
          :
          <View style={{ display: "flex", flexDirection: "row", width: 318, height: 30, alignItems: "center", marginBottom: 20 }}>
            <Image
              source={require("../../assets/Vector.png")}
              style={{ width: 16, height: 16, }}
            />
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12, marginLeft: 10 }}>
              Información de dieta especial completo.
            </Text>
          </View>
      }
      <View style={{ width: 331, height: 33, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", height: 10, backgroundColor: "#E5EBFF", borderRadius: 10 }}>
          <View style={{ width: `${getSum()}%`, height: 10, backgroundColor: "#93E396", borderRadius: 10 }}>

          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <View style={{ width: 25 }}>
            <Text style={{ color: "#564C71", fontWeight: "700", fontSize: 10, lineHeight: 12 }}>
              {getSum()}%
            </Text>
          </View>
          <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>
            Completado
          </Text>
        </View>
      </View>
    </View>

  )
}