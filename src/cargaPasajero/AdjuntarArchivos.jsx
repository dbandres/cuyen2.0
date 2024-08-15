import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { ModalAlertCarga } from "./ModalAlertCarga";

/* import { EditarAdjunto } from "./EditarAdjunto";
import { ModalAlertCarga } from "./ModalAlertCarga"; */


export function AdjuntarArchivos({ children, increaseProgress, data }) {

  const [showAlert, setShowAlert] = useState(false);
  const [cantidadImg, setCantidadImg] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const [dniUrl, setDniUrl] = useState([])
  const [carnetUrl, setCarnetUrl] = useState([])
  
  const [fichaUrl, setFichaUrl] = useState("")
  const [declaracionUrl, setDeclaracionUrl] = useState("")

  // console.log("esto es data: ",JSON.stringify(data, null, 3));

  // revisamos data de adjuntos, y seteamos en caso de que ya esten completos
  useEffect(() => {
    if (data.image_dni.length === 2 || data.ficha_med !== null || data.obra_soc.length === 2 || data.dec_jurada !== null) {
      if (data.image_dni.length === 2 && children === "Documento de identidad") {
        setDniUrl(data.image_dni)
        setCantidadImg(true)
        increaseProgress("dni", 20)
      }
      else if (data.ficha_med !== null && children === "Ficha medica") {
        setFichaUrl(data.ficha_med)
        setCantidadImg(true)
        increaseProgress("ficha", 20)
      }
      else if (data.obra_soc.length === 2 && children === "Carnet de obra social") {
        setCarnetUrl(data.obra_soc)
        setCantidadImg(true)
        increaseProgress("carnet", 20)
      }
      else if (data.dec_jurada !== null && children === "Declaración jurada") {
        setDeclaracionUrl(data.dec_jurada)
        setCantidadImg(true)
        increaseProgress("declaracion", 20)
      } else {
        setCantidadImg(false)
        setDniUrl([])
        setFichaUrl("")
        setCarnetUrl([])
        setDeclaracionUrl("")
      }
    } else {
      console.log("es null!");
      //pruebo esto aca
      setCantidadImg(false)
        setDniUrl([])
        setFichaUrl("")
        setCarnetUrl([])
        setDeclaracionUrl("")
    }
  }, [data])


  const openOptions = async () => {
    //veo si estan la cantidad de img necesarias y abro o no el modal de edicion
    if (fichaUrl || dniUrl.length === 2 || declaracionUrl || carnetUrl.length === 2) {
      setShowAlert(false)
      setShowModal(true)
    } else {
      openModal()
    }
  }

  const closeModal = () => {
    setShowModal(false)

    //provisorio!!
    setShowAlert(false)
  }

  const openModal = () =>{
    setShowAlert(!showAlert)
  }


  const renderImage = (archivo, cantidadImg) => {
    const excepciones = ["Ficha medica", "Declaración jurada", "Documento de identidad", "Carnet de obra social"];

    if (excepciones.includes(archivo) && cantidadImg === true) {
      return (
        <Image
          source={require("../assets/adjuntarOk.png")}
          style={{ width: 65, height: 71 }}
        />
      );
    }  
    else {
      return (
        <Image
          source={require("../assets/adjuntar.png")}
          style={{ width: 65, height: 71 }}
        />
      );
    }
  }

  return (
    <TouchableOpacity onPress={openOptions} style={{ width: 65, height: 96, alignItems: "center" }}>
      {/* <EditarAdjunto visible={showModal} onClose={closeModal} children={children}
        data={
          children === "Ficha medica" ? data.ficha_med :
            children === "Documento de identidad" ? data.image_dni :
              children === "Carnet de obra social" ? data.obra_soc :
                children === "Declaración jurada" ? data.dec_jurada : null
        }
        id={data.id}
        setNewFetch={setNewFetch}
        increaseProgress={increaseProgress}
      /> */}
      <View style={{ height: 20, justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "400", fontSize: 9, lineHeight: 9, textAlign: "center", color: "#564C71" }}>
          {children}
        </Text>
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end", height: 76 }}>
        {
          renderImage(children, cantidadImg)
        }
      </View>
      <ModalAlertCarga
        visible={showAlert}
        onClose={closeModal}
        texto={`Vas a adjuntar un Archivo para ${children}`}
        children={children}
        data={data.id}
        setCantidadImg={setCantidadImg}
      />
    </TouchableOpacity>
  )
}