import { Modal, Text, TouchableOpacity, View } from "react-native"
import CheckBox from "@react-native-community/checkbox";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ButtonCustom } from "../components/ButtomCustom";
import { token } from "../api";


const transparent = "rgba(0,0,0,0.5)"

export function ModalDieta({ visible, onClose, data, setError, increaseProgress }) {

  // console.log(JSON.stringify(data, null ,3));

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [options, setOptions] = useState({
    vegetariano: data.dieta ? data.dieta.vegetariano : false,
    vegano: data.dieta ? data.dieta.vegano : false,
    celiaco: data.dieta ? data.dieta.celiaco : false,
    intoleranteLactosa: data.dieta ? data.dieta.intoleranteLactosa : false,
    ningunaDietaEspecial: data.dieta ? data.dieta.ningunaDietaEspecial : false,
  });

  const handleCheckBoxChange = (option) => {
    if (option == "ningunaDietaEspecial") {
      // Si la opción seleccionada es "nigunaDietaEspecial",
      // establece todas las demás opciones como false
      setOptions({
        vegetariano: false,
        vegano: false,
        celiaco: false,
        intoleranteLactosa: false,
        ningunaDietaEspecial: true,
      })
    }
    else {
      // Si la opción seleccionada no es "nigunaDietaEspecial",
      // simplemente cambia el valor de esa opción
      setOptions({
        ...options,
        [option]: !options[option]
      });

      if(option !== "ningunaDietaEspecial"){
        setOptions({
          ...options,
          [option]: !options[option],
          ningunaDietaEspecial: false
        })
      }
    }
  };


  const modalClosed = () => {
    onClose()
    setButtonDisabled(false)
  }

  useEffect(() => {
    // Verificamos si al menos una opción está seleccionada
    // El método .some() en JavaScript se utiliza para verificar si al menos uno de los elementos en un array cumple con cierta condición. Este método itera sobre los elementos del array y devuelve true si al menos uno de los elementos satisface la condición especificada en una función de callback, de lo contrario, devuelve false.
    const anyOptionSelected = Object.values(options).some(value => value);

    // Actualiza el estado del botón
    if (anyOptionSelected === false) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [options])

  const putPasajeroDieta = async () => {
    const resp = await axios.put(`/pasajero/${data.id}`, {
      dieta: options,
      loginId: userdata.id
    },
      {
        headers: {
          'x-access-token': `${token}`,
          'Content-Type': 'application/json',
        }
      })
    setError(false)
    onClose()
    increaseProgress("dieta",20)
  }

  /* console.log(data.id, options); */

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 38, width: 275, marginBottom: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
              Selecciona la condición especial para la dieta de este pasajero.
            </Text>
          </View>
          <View style={{ height: 240, width: 160, justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: 30, width: "100%", justifyContent: "flex-end", alignItems: "center", marginBottom: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "right", marginRight: 10, color: "#564C71" }}>
                Vegetariano
              </Text>
              <CheckBox
                disabled={false}
                value={options.vegetariano}
                boxType="square"
                onValueChange={() => handleCheckBoxChange('vegetariano')}
                onCheckColor="black"
                tintColor="black"
                tintColors={{ false: "#CDD1DF" }}
                lineWidth={1.5}
              />
            </View>
            <View style={{ height: 30, width: "100%", justifyContent: "flex-end", alignItems: "center", marginBottom: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "right", marginRight: 10, color: "#564C71" }}>
                Vegano
              </Text>
              <CheckBox
                disabled={false}
                value={options.vegano}
                boxType="square"
                onValueChange={() => handleCheckBoxChange('vegano')}
                onCheckColor="black"
                tintColor="black"
                tintColors={{ false: "#CDD1DF" }}
                lineWidth={1.5}
              />
            </View>
            <View style={{ height: 30, width: "100%", justifyContent: "flex-end", alignItems: "center", marginBottom: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "right", marginRight: 10, color: "#564C71" }}>
                Celíaco
              </Text>
              <CheckBox
                disabled={false}
                value={options.celiaco}
                boxType="square"
                onValueChange={() => handleCheckBoxChange('celiaco')}
                onCheckColor="black"
                tintColor="black"
                tintColors={{ false: "#CDD1DF" }}
                lineWidth={1.5}
              />
            </View>
            <View style={{ height: 30, width: "100%", justifyContent: "flex-end", alignItems: "center", marginBottom: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "right", marginRight: 10, color: "#564C71" }}>
                Intolerante a la lactosa
              </Text>
              <CheckBox
                disabled={false}
                value={options.intoleranteLactosa}
                boxType="square"
                onValueChange={() => handleCheckBoxChange('intoleranteLactosa')}
                onCheckColor="black"
                tintColor="black"
                tintColors={{ false: "#CDD1DF" }}
                lineWidth={1.5}
              />
            </View>
            <View style={{ height: 30, width: "100%", justifyContent: "flex-end", alignItems: "center", marginBottom: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "right", marginRight: 10, color: "#564C71" }}>
                Ninguna dieta especial
              </Text>
              <CheckBox
                disabled={false}
                value={options.ningunaDietaEspecial}
                boxType="square"
                onValueChange={() => handleCheckBoxChange('ningunaDietaEspecial')}
                onCheckColor="black"
                tintColor="black"
                tintColors={{ false: "#CDD1DF" }}
                lineWidth={1.5}
              />
            </View>
          </View>
          <View style={{ height: 47, width: 331, borderRadius: 10, marginBottom: 5 }}>
            <ButtonCustom
              text="Confirmar"
              color={buttonDisabled === false ? "#CDD1DF" : "#FF3D00"}
              disabled={buttonDisabled === false ? true : false}
              register={false}
              onPress={putPasajeroDieta}
            />
          </View>
          <View style={{ borderColor: "#334EA2", height: 50, width: 331, borderRadius: 10, borderWidth: 1 }}>
            <ButtonCustom
              text="Cancelar"
              color="#FFFF"
              register={true}
              onPress={modalClosed}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}