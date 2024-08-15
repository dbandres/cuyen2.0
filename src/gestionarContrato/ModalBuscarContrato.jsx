import { Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { CustomInput } from "../registerScreen/CustomInput"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getColegios } from "../slices/getAllColegios"
import { postVerifyColegio, resetColegioVerifyState } from "../slices/verifyColegios"
import { resetUserVerifyState } from "../slices/dniVerifyUser"
import { ModalAlert } from "../registerScreen/ModalAlert"
import { putContratoRequest } from "../slices/putContratoSlice"




export const ModalBuscarContrato = ({ visible, onClose, setNewFetch, contratoInfo, user }) => {

  const { control, setValue, watch, trigger } = useForm()
  const dispatch = useDispatch()
  let contrato = watch("contrato")

  const verifyColegio = useSelector((state) => state.verifyColegios.colegioVerify)
  const loadingVerifyColegios = useSelector((state) => state.verifyColegios.loading)
  const errorVerifyColegios = useSelector((state) => state.verifyColegios.error)

  const allColegio = useSelector((state) => state.colegios.colegios)
  const putContrato = useSelector((state)=>state.putContrato)

  const [inputValue, setInputValue] = useState('');
  const [errorInput, setErrorInput] = useState('');

  const [colegiosFiltrados, setColegiosFiltrados] = useState("")
  const [colegioSeleccionado, setColegioSeleccionado] = useState("");

  const [showAlert1, setShowAlert1] = useState(false)
  const [totalColegios, setTotalColegios] = useState(null)

  const [allContratos, setAllContratos] = useState([])

  useEffect(() => {
    if(visible){
      setAllContratos(user?.usuario?.contrato)
    }
    dispatch(getColegios())
    const colegiosFiltrados = contratoInfo
      .filter(info => info.colegio)
      .map(colegio => colegio.colegio);

    setTotalColegios(allColegio.filter(nombre => !colegiosFiltrados.includes(nombre.nombre)))
  }, [contratoInfo, visible])

  // Función para manejar el cambio en el valor del TextInput
  const handleInputChange = (text) => {
    setInputValue(text);
    setColegioSeleccionado("")
    if (text.trim() !== '') {
      setErrorInput(''); // Limpiar el mensaje de error cuando se ingrese texto
    }
  };

  // Filtrar el array de objetos basado en el término de búsqueda
  function filterColegios() {
    let filteredData = [];

    if (inputValue.trim() !== '') {
      filteredData = totalColegios.filter((item) =>
        item.nombre.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5);
    }

    setColegiosFiltrados(filteredData);
  }

  useEffect(() => {
    if (inputValue !== "") {
      filterColegios()
    } else {
      filterColegios()
      setColegioSeleccionado("")
    }
  }, [inputValue])

  useEffect(()=>{
    if(contrato !== undefined && colegioSeleccionado && contrato.length === 4){
			setShowAlert1(true)
      const data = {
        contrato, colegioSeleccionado
      }
      dispatch(postVerifyColegio(data))
      setAllContratos(prev => [...prev, contrato])
    }
    else if(contrato !== undefined && contrato.length < 4){
      setInputValue('')
    }
  },[contrato, colegioSeleccionado])

  useEffect(()=>{
		if(errorVerifyColegios !== null){
			setInputValue('')
			setValue('contrato', '')
      allContratos.pop()
		}
	},[errorVerifyColegios])

  // Funcion que captura el colegio seleccionado
  const handleColegioPress = (cole) => {
    setColegioSeleccionado(cole);
  };

  const myClosedFuntion = () =>{
    dispatch(resetColegioVerifyState())
    onClose()
    setInputValue('')
    setValue('contrato', '')
    setAllContratos(null)
  }

  const addContrato = async () =>{
    const data ={id: user.usuario.id, allContratos}
    dispatch(putContratoRequest(data))
    dispatch(resetColegioVerifyState())
    onClose()
    setInputValue('')
    setValue('contrato', '')
    setAllContratos(null)
  }

  const transparent = "rgba(0,0,0,0.5)"
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 400, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 320, height: 57, alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: 50 }}>
              <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                Buscar Contrato
              </Text>
            </View>
            <CustomInput
              control={control}
              placeholder="Numero de contrato"
              name="contrato"
              trigger={trigger}
              numeric="numeric"
              rules={{
                required: true,
              }}
            />
            <View>
              <View style={{
                width: "100%",
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: verifyColegio === 202 && inputValue !== '' ? "#008000" : '#CDD1DF',
                borderRadius: 10,
                padding: 5,
                height: 50,
              }}>
                <TextInput
                  placeholder="Nombre de la Institución"
                  value={colegioSeleccionado ? colegioSeleccionado.nombre : inputValue} // Valor del TextInput
                  onChangeText={handleInputChange} // Se activa cuando el texto cambia
                  style={{
                    width: "100%",
                    paddingLeft: 10,
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: 14,
                    lineHeight: 16,
                    backgroundColor: "white",
                    borderRadius: 8,
                    color: "#564C71",
                  }}
                  placeholderTextColor="#CDD1DF"
                />
              </View>
              <View style={{ height: 25, justifyContent: "center", marginLeft: 20 }}>
                {errorInput !== '' && inputValue === "" ?
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require('../assets/Error.png')}
                      style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ color: "#FF6363", fontSize: 10, }}>{errorInput}</Text>
                  </View>
                  : null
                }
              </View>
              {
                colegiosFiltrados.length !== 0 && colegioSeleccionado === "" ?
                  <View style={{ position: 'absolute', top: 50, backgroundColor: 'white', width: '100%', height: colegiosFiltrados.length * 30, borderRadius: 10, borderColor: "#CDD1DF", borderWidth: 1, zIndex: 1 }}>
                    {
                      colegiosFiltrados.map((cole, index) => (
                        <TouchableOpacity key={index} onPress={() => handleColegioPress(cole)}>
                          <Text style={{ paddingVertical: 5, paddingHorizontal: 15, fontSize: 12 }}>{cole.nombre}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                  :
                  null
              }
            </View>
            <TouchableOpacity onPress={()=>{addContrato()}} disabled={verifyColegio === 202 && errorVerifyColegios === null ? false : true} style={{ backgroundColor: verifyColegio === 202 && errorVerifyColegios === null ? "#FF3D00" : "#CDD1DF", height: 47, width: 320, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 15, zIndex: -999999999 }}>
              <Text style={{ color: "white" }}>
                Aceptar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{myClosedFuntion()}} style={{ width: 320, height: 40, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 10, zIndex: -999999999 }}>
              <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalAlert
        loading={loadingVerifyColegios}
        onClose={()=>{setShowAlert1(false)}} 
        visible={showAlert1}
        error={errorVerifyColegios}
        texto={'El Colegio y su número de contrato coinciden correctamente. '}
      />
    </Modal>
  )
}