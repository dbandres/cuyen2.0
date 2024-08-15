import { Text, TouchableOpacity, View, Animated, Image, Dimensions, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import DatePicker from 'react-native-date-picker'
import { UserContext } from "../context/UserContext";
import { CustomInput } from "../intoScreen/CustomInput";
import { ButtonCustom } from "../components/ButtomCustom";
import { clearState, verifyPas } from "../slices/verifyPasajero";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "./ModalComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalMessage } from "./ModalMessage";
import { DropdownFDP } from "./DropdownFDP";
import { DropdownCuotas } from "./DropdownCuotas";
import ImporteText from "./ImporteText";

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export function Form({ agregarPasajero, navigation }) {

  const { control, handleSubmit, setValue, watch, trigger } = useForm()
  const [itemsArray, setItemsArray] = useState([1])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const { userdata } = useContext(UserContext)
  const [dataPasajero, setDataPasajero] = useState("")

  let dni = watch('userdni'); // Observa el campo del DNI

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [newDate, setNewDate] = useState("")


  const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null);
  const fechaMax = new Date(2019, 0, 1);
  const fechaMin = new Date(2000, 0, 1)

  const [modalVisible, setModalVisible] = useState(false);
  const [datosTotales, setDatosTotales] = useState({})

  //numero de contrato seleccionado
  const numeroContrato = useSelector((state) => state.contratoActual.numero);

  const dispatch = useDispatch()
  const verifyPasajero = useSelector((state) => state.verifyPasajero.verifyPasajero)
  const load = useSelector((state) => state.verifyPasajero.loading)
  const status = useSelector((state) => state.verifyPasajero.status)
  const error = useSelector((state) => state.verifyPasajero.error)

  // importe texto
  const [importe, setImporte] = useState('')

  // forma de pago response
  const [FDPResponse, setFPDResponse] = useState('')

  //cuotas response
  const [cuotasResponse, setCuotasResponse] = useState('')

  //importe response
  const [importeResponse, setImporteResponse] = useState('')

  // forma de pago seleccionada
  const [FDPSeleccionado, setFDPSeleccionado] = useState('')

  // render condicional para un statu 200 en verify
  const [showDropDowns, setShowDropDowns] = useState(false)

  // estado para el view del modal message
  const [showAlert3, setShowAlert3] = useState(false)

  // texto para el status 202
  const [status202, setStatus202] = useState('')

  // estados para el primer dropdown
  const [heightAnim] = useState(new Animated.Value(50)); // Inicia con la altura mínima
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // estados para el segundo dropdown
  const [heightAnim1] = useState(new Animated.Value(50)); // Inicia con la altura mínima
  const contentRef1 = useRef(null);
  const [isExpanded1, setIsExpanded1] = useState(false);

  // ver toggles 
  const [toggleCheckBoxIPC, setToggleCheckBoxIPC] = useState(true)
  const [toggleCheckBoxDolares, setToggleCheckBoxDolares] = useState(true)

  // ver para que sirve
  const [lengthCuotas, setLengthCuotas] = useState(90)

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userStorage');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        const data = { dni, numeroContrato, id: user.usuario.id }
        dispatch(verifyPas(data))
      } else {
        Alert.alert('No data found');
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage', error);
      Alert.alert('Failed to load data');
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const getAlert = () => {
    return (
      <AwesomeAlert
        show={load}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }

  useEffect(() => {
    setValue('FDP', FDPSeleccionado.valor);
    setValue('cuota', cuotaSeleccionada)
    setValue('fechaNac', newDate)
    setValue('importe', importe)
  }, [FDPSeleccionado, newDate, cuotaSeleccionada, importe])

  const handleSubmitcarga = (data) => {
    setDatosTotales(data)
    console.log('data pasajero: ',data);
    openModal();
  }

  useEffect(() => {
    if (status === 200) {
      setShowDropDowns(true)
      setFPDResponse(verifyPasajero.financiacion.map((finan) => finan.medio_de_pago))
      setCuotasResponse(verifyPasajero.financiacion.map(finan => ({
        fdm: finan.medio_de_pago,
        cuotas: finan.cuotas
      })))
      setImporteResponse(verifyPasajero.financiacion.map(finan => ({
        importe: finan.importe,
        forma: finan.medio_de_pago
      })))
    }
    if (status === 201) {
      setShowAlert3(true)
      setStatus202(verifyPasajero)
    }
    if (status === 202) {
      setShowDropDowns(false)
      setValue('username', verifyPasajero.nombre);
      setValue('userlastname', verifyPasajero.apellido);
      setValue('useremail', verifyPasajero.correo.trim());
      setValue('idPasajero', verifyPasajero.id)
      setNewDate(verifyPasajero.fechaNac)
      setImporte(verifyPasajero.importe)
    }
    if(status === 400){
      setShowDropDowns(true)
      setFPDResponse(error.financiacion.map((finan)=>finan.medio_de_pago))
      setCuotasResponse(error.financiacion.map(finan => ({
        fdm: finan.medio_de_pago,
        cuotas: finan.cuotas
      })))
      setImporteResponse(error.financiacion.map(finan => ({
        importe: finan.importe,
        forma: finan.medio_de_pago
      })))
    }
  }, [status])

  useEffect(() => {
    if (dni !== undefined && dni.length === 8) {
      //  setShowAlert2(true)
      loadData()
    } else {
      console.log("es undefined");
      dispatch(clearState())
      setShowDropDowns(false)
      setCuotasResponse('')
      setImporteResponse('')
      setFPDResponse('')
      setFDPSeleccionado('')
      setImporteResponse('')
      setImporte('')
    }
  }, [dni])

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

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: (24 * FDPResponse.length) + 50, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded1) {
      // Mide la altura del contenido cuando se expande
      contentRef1.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim1, {
          toValue: (24 * lengthCuotas) + 50, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded1(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim1, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded1]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  const closedModalMessage = () => {
    setShowAlert3(false)
    agregarPasajero()
    dispatch(clearState())
    navigation.navigate('Información del viaje')
    setShowDropDowns(false)
  }

  return (
    <View style={{
      width: 373,
      height: showDropDowns === true ? 850 : !isExpanded && isExpanded1 || isExpanded && !isExpanded1 ? 1050 : isExpanded && isExpanded1 ? 1200 : 630,
      backgroundColor: "#FFFFFF", marginTop: 15, borderRadius: 10, justifyContent: "center", alignItems: "center"
    }}>
      <View style={{ height: 50 }}>
        <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16 }}>
          Datos del pasajero
        </Text>
      </View>
      <View style={{ width: 330, justifyContent: "center", alignItems: "center" }}>
        <CustomInput
          control={control}
          trigger={trigger}
          placeholder="Ingresa tu DNI"
          name="userdni"
          numeric="numeric"
          rules={{
            required: true,
            pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
            minLength: {
              value: 7,
              message: "El DNI ingresado no es válido."
            },
            maxLength: {
              value: 8,
              message: "El DNI ingresado no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="username"
          placeholder="Nombre"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
            minLength: {
              value: 2,
              message: "El Nombre no es válido."
            },
            maxLength: {
              value: 15,
              message: "El Nombre no es válido."
            }
          }}
        />
        <CustomInput
          control={control}
          name="userlastname"
          placeholder="Apellido"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Apellido es incorrecto" },
            minLength: {
              value: 2,
              message: "El Apellido no es válido."
            },
          }}
        />
        <View style={{
          width: "100%",
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#CDD1DF',
          borderRadius: 10,
          height: 50,
          marginBottom: 20,
        }}>
          <TouchableOpacity style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => setOpen(true)}>
            <Image source={require("../assets/calendar_month.png")} style={{ width: 18, height: 19, marginLeft: 5 }} />
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
                  paddingLeft: 10,
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 16,
                  borderRadius: 8,
                  color: "#CDD1DF",
                  marginLeft: 2
                }}>
                  Fecha de nacimiento
                </Text>
            }
          </TouchableOpacity>
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
          /* maximumDate={fechaMaxima}
          minimumDate={fechaMin} */

          />
        </View>
        <CustomInput
          control={control}
          name="useremail"
          placeholder="Email"
          trigger={trigger}
          rules={{
            required: true,
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
          }}
        />
        {
          showDropDowns === true ?
            <>
              {
                FDPResponse !== '' ?
                  <DropdownFDP
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    contentRef={contentRef}
                    heightAnim={heightAnim}
                    setFDPSeleccionado={setFDPSeleccionado}
                    FDPSeleccionado={FDPSeleccionado}
                    FDPResponse={FDPResponse}
                  />
                  : null
              }
              {

                cuotasResponse !== '' ?
                  <DropdownCuotas
                    isExpanded1={isExpanded1}
                    setIsExpanded1={setIsExpanded1}
                    contentRef1={contentRef1}
                    heightAnim1={heightAnim1}
                    cuotaSeleccionada={cuotaSeleccionada}
                    setCuotaSeleccionada={setCuotaSeleccionada}
                    FDPSeleccionado={FDPSeleccionado}
                    cuotasResponse={cuotasResponse}
                    setLengthCuotas={setLengthCuotas}
                  />
                  : null

              }
            </>
            :
            null
        }
        <ImporteText
          FDPSeleccionado={FDPSeleccionado}
          cuotaSeleccionada={cuotaSeleccionada}
          importeResponse={importeResponse}
          setImporte={setImporte}
          importe={importe}
          toggleCheckBoxIPC={toggleCheckBoxIPC}
          setToggleCheckBoxIPC={setToggleCheckBoxIPC}
          toggleCheckBoxDolares={toggleCheckBoxDolares}
          setToggleCheckBoxDolares={setToggleCheckBoxDolares}
        />
        <View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: 15 }}>
          <View>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              tintColors={true ? "black" : "black"}
              boxType='square'
              style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : '', justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <TouchableOpacity onPress={() => { abrirLink('https://8ball.ar/politica-de-privacidad-turismo-cuyen/') }} style={{ marginLeft: "3%" }}>
            <Text style={{ fontSize: 12, color: "#949AAF" }}>
              Estoy de acuerdo con los
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 11.5, color: "#949AAF" }}>
              Términos de Servicios y Política de privacidad.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 47, width: 331, marginTop: "5%" }}>
          <ButtonCustom
            disabled={toggleCheckBox === true && toggleCheckBoxIPC === true && toggleCheckBoxDolares === true ? false : true}
            text="Agregar"
            color={toggleCheckBox === true && toggleCheckBoxIPC === true && toggleCheckBoxDolares === true ? "#FF3D00" : "#CDD1DF"}
          onPress={handleSubmit(handleSubmitcarga)}
          />
        </View>
      </View>
      {load === true ? getAlert() : null}
      <ModalMessage
        visible={showAlert3}
        onClose={() => { closedModalMessage() }}
        text={status202}
      />
      <ModalComponent
        visible={modalVisible}
        onClose={closeModal}
        data={datosTotales}
        agregarPasajero={agregarPasajero}
      />
    </View>
  )
}