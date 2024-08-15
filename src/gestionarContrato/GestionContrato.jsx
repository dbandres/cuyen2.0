import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Header } from "../components/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCallback, useEffect, useState } from "react"
import { getContrato } from "../slices/getContratoSlice"
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { InfoContrato } from "./InfoContrato"
import { ModalBuscarContrato } from "./ModalBuscarContrato"
import { useFocusEffect } from "@react-navigation/native"


export const GestionContrato = ({ navigation }) => {

  const contrato = useSelector((state) => state.contrato.contrato)
  const loading = useSelector((state) => state.contrato.loading)
  const [showModal, setShowModal] = useState(false)
  const [userDatos, setUserDatos] = useState(null)

  const dispatch = useDispatch()

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userStorage');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        setUserDatos(user)
        
      } else {
        Alert.alert('No data found');
      }
    } catch (error) {
      console.error('Failed to load data from AsyncStorage', error);
      Alert.alert('Failed to load data');
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Pantalla enfocada gestion de contrato. Puedes ejecutar operaciones aquí.');
      loadData()
      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
        //  setNewValue('')
      };
    }, []))

  useEffect(() => {
    if (userDatos !== null) {
      dispatch(getContrato(userDatos.usuario.contrato))
    }
  }, [userDatos])

  const openModal = () => {
    setShowModal(true)
  }

  const closedModal = () => {
    setShowModal(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          children={'Asignar Contrato'}
          navigation={navigation}
        />
        {
          loading === true ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
              <ActivityIndicator
                size='large'
                color='#FF3D00'
              />
            </View>
            :
            <>
              {
                contrato?.map((contra, index) => (
                  <InfoContrato
                    key={index}
                    contratoInfo={contra}
                    navigation={navigation}
                  />
                ))
              }

              <TouchableOpacity onPress={openModal} style={{ backgroundColor: "#FF3D00", height: 47, width: "90%", borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                <Text style={{ color: "white" }}>
                  Asignar nuevo contrato
                </Text>
              </TouchableOpacity>
              <ModalBuscarContrato
                visible={showModal}
                onClose={closedModal}
                /* setNewFetch={setNewFetch} */
                contratoInfo={contrato}
                user={userDatos}
              />
            </>
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }
})