import { Dimensions, Modal, Text, View } from "react-native";
import { ButtonCustom } from "../components/ButtomCustom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pasajeroPost, resetPostPasajero } from "../slices/postPasajeroSlice";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function ModalComponent({ visible, onClose, data, inputChanged, agregarPasajero }) {

  const [totalCuotas, setTotalCuotas] = useState("")
  const [fecha, setFecha] = useState("")
  const [showAlert2, setShowAlert2] = useState(false)
  const [importe, setImporte] = useState("")
  const [storedData,setStoredData] = useState('')

  const postPasajero = useSelector((state) => state.postPasajero.postPasajero)
  const loading = useSelector((state) => state.postPasajero.loading)
  const numeroContrato = useSelector((state) => state.contratoActual.numero);

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userStorage');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        setStoredData(user);
      } else {
        Alert.alert('No data found');
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage', error);
      Alert.alert('Failed to load data');
    }
  };

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={loading}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }

  useEffect(() => {
    loadData()
    if (data && data.FDP !== 'Dolares') {
      setImporte(parseInt(data?.importe))
      let total = parseInt(data?.importe) / data?.cuota
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = Math.round(parseInt(data.importe) / data?.cuota)
        setTotalCuotas((total.toLocaleString('es-ES')));
      }
    }
    else if (data && data.FDP === 'Dolares') {
      setImporte(parseInt(data?.importe))
      let total = parseInt(data?.importe) / data?.cuota
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = parseInt(data.importe) / data?.cuota
        setTotalCuotas(total.toFixed(2));
      }
    }
    if (data.fechaNac) {
      const fechaNac = data.fechaNac
      const meses = {
        ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
        jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12
      };

      if (fechaNac.includes('/')) {
        const [dia, mes, año] = data.fechaNac.split('/');
        const numeroMes = meses[mes.toLowerCase()];
        const fechaFormateada = `${año}-${numeroMes}-${dia}`;
        setFecha(fechaFormateada);
      } else {
        const [dia, mes, año] = data.fechaNac.split('-');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        setFecha(fechaFormateada);
      }
    }
  }, [data])

  const pasPost = () => {
    const dato = {
      nombre: data.username,
      apellido: data.userlastname,
      dni: data.userdni,
      email: data.useremail,
      contrato: [numeroContrato],
      rol: "Pasajero",
      estado: true,
      login: "",
      fechaNac: fecha,
      importe: importe,
      cuotas: data.cuota,
      loginId: storedData.usuario.id
    }
    dispatch(pasajeroPost(dato))
  }

  useEffect(() => {
    if (postPasajero == '200') {
      onClose()
      dispatch(resetPostPasajero())
      navigation.navigate('Información del viaje')
    }
  }, [postPasajero])

  const transparent = "rgba(0,0,0,0.5)"

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: width * 0.95, height: height * 0.5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 275, height: height * 0.1, alignItems: "center", justifyContent: "center" }}>
            {
              data.FDP !== undefined ?
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se va a dar de alta el pasajero y se crearán las cuotas del viaje.
                  ¿Desea confirmar?
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se cambiarán los datos del pasajero.
                  ¿Desea confirmar?
                </Text>
            }
          </View>
          <View style={{ width: 306, height: height * 0.24, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              {data?.username}, {data?.userlastname}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              DNI {data?.userdni}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              Fecha de Nacimiento {data?.fechaNac}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              Email {data?.useremail}
            </Text>
            {
              data.FDP === undefined ?
                null :
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${importe.toLocaleString('es-ES', { style: 'decimal' })}
                    {
                      data.FDP === 'Dolares' ? ' Dólares' : ' Pesos'
                    }
                  </Text>
                  {
                    data.FDP === 'ipc' ?
                      <View style={{ height: 65, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 13 }}>
                          Acepto que mis cuotas serán ajustadas por el índice de precios al consumidor acumulado, a partir de la cuota definida por contrato
                        </Text>
                      </View>
                      :
                      <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                        Cuotas {data?.cuota} de ${totalCuotas}
                        {
                          data.FDP === 'Dolares' ? ' Dólares' : ' Pesos'
                        }
                      </Text>
                  }
                </>
            }
          </View>
          <View style={{ height: height * 0.05, width: 331, borderRadius: 10, marginBottom: 5 }}>
            <ButtonCustom
              text="Aceptar"
              color="#FF3D00"
              register={false}
              onPress={pasPost}
            />
          </View>
          <View style={{ borderColor: "#334EA2", height: height * 0.05, width: 331, borderRadius: 10, borderWidth: 1 }}>
            <ButtonCustom
              text="Cancelar"
              color="#FFFF"
              register={true}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
      {loading ? getAlert() : null}
    </Modal>
  )
}