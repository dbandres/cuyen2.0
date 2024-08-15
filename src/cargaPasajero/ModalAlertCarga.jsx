import { Modal, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native"
import { checkCameraPermission, checkGaleyPermission, handleCameraPermission, openCamera, openImageLibrary, requestGalleryPermission } from "./ImagePicker"
import { useContext, useEffect, useState } from "react";
import uploadImages from "./uploadImages";

export function ModalAlertCarga({ visible, onClose, texto, data, children, setNewFetch, setCantidadImg }) {

  const [imageAdjunto, setImageAdjunto] = useState([])
  const [loading, setLoading] = useState(false)
  const [limiteImg, setLimiteImg] = useState(null)

  const [checkGalery, setCheckGalery] = useState(false)
  const [checkCamera, setCheckCamera] = useState(false)

  useEffect(() => {
    if (visible === true) {
      checkCameraPermission().then((cameraPermission) => {
        console.log('Estado del permiso de cámara:', cameraPermission);
        setCheckCamera(cameraPermission)
      });
      checkGaleyPermission().then((galeryPermission) => {
        console.log('Estado del permiso de la galeria:', galeryPermission);
        setCheckGalery(galeryPermission)
      })
    }
  }, [visible])

  const cerrarModal = () => {
    onClose()
    setImageAdjunto([])
  }

  const requestCameraPermission = async (componente) => {
    const result = await handleCameraPermission();
    result === "granted" ? openLocalCamera(componente) : null
  }

  const handleGalleryPermission = async (componente) => {
    const result = await requestGalleryPermission();
    result == "granted" ? openLocalGalery(componente) : null
  }

  const requireData = (img, name, dato) => {
    uploadImages(img, name, dato, /* userdata.id */)
      .then(res => {
        console.log('Todas las imágenes se han subido correctamente:', res);
        setNewFetch(true)
        setCantidadImg(true)
        setLoading(false)
        onClose()
        setImageAdjunto([])
      })
      .catch(error => {
        console.error('Error al subir imágenes:', error.message);
      });
  }

  const openLocalCamera = async (componente) => {

    setLoading(false)
    const excepciones = ["Ficha medica", "Declaración jurada", "Carnet de obra social", "Documento de identidad"];

    if (excepciones.includes(componente)) {
      setTimeout(async () => {
        const imgCamera = await openCamera();
        const newImageCamera = [...imageAdjunto];
        newImageCamera.push(imgCamera);
        setImageAdjunto(newImageCamera);
        setLoading(true)
      }, 2000)
    }
  }

  const openLocalGalery = async (componente) => {
    setLoading(false)
    const excepciones = ["Ficha medica", "Declaración jurada", "Carnet de obra social", "Documento de identidad"];

    if (excepciones.includes(componente)) {
      setTimeout(async () => {
        const imgCamera = await openImageLibrary(1);
        const newImageCamera = [...imageAdjunto];
        newImageCamera.push(imgCamera);
        setImageAdjunto(newImageCamera);
        setLoading(true)
      }, 2000)
    }
  }

  useEffect(() => {
    children == "Ficha medica" || children == "Declaración jurada" ? setLimiteImg(1) : setLimiteImg(2)
  }, [children])

  useEffect(() => {
    if (imageAdjunto.length === 1 && children === "Ficha medica" || imageAdjunto.length === 1 && children === "Declaración jurada") {
      requireData(imageAdjunto, children, data)
    } else if (imageAdjunto.length === 2 && children === "Carnet de obra social" || imageAdjunto.length === 2 && children === "Documento de identidad") {
      requireData(imageAdjunto, children, data)
    }
  }, [imageAdjunto, children])

  // console.log(imageAdjunto);


  const renderTexto = (componente) => {
    const excepciones = ["Ficha medica", "Declaración jurada"];

    if (excepciones.includes(componente)) {
      return (
        <Text style={{ fontWeight: "400", fontSize: 13, lineHeight: 15, textAlign: "center", color: "#949AAF", marginBottom: 15 }}>
          Recordá que podes adjuntar una sola IMAGEN para {componente}, la misma se publicará automaticamente.
        </Text>
      )
    }
    else {
      return (
        <Text style={{ fontWeight: "400", fontSize: 13, lineHeight: 15, textAlign: "center", color: "#949AAF", marginBottom: 15 }}>
          Recordá que podes adjuntar dos IMAGENES para {componente}, la misma se publicarán automaticamente.
        </Text>
      )
    }
  }

  const renderAlerta = () => {
    if (checkCamera === false && checkGalery === false) {
      return (
        <View style={{ height: 90, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ padding: 5, width: '95%', height: 80, borderWidth: 1, borderRadius: 10, borderColor: 'red' }}>
            <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#949AAF" }}>
              Para que ésta funcion pueda ejecutarse con total normalidad, y asi poder disfrutar de esta aplicación al 100%, deberás otorgar a Turismo Cuyen los permisos necesarios para poder acceder a tu Camara o Galeria de Fotos.
            </Text>
            <Text style={{ fontWeight: "800", fontSize: 10, lineHeight: 12, textAlign: "center", color: "#949AAF" }}>
              Dichos permisos de acceso podrán ser revocados cuando el usuario así lo desee.
            </Text>
          </View>
        </View>
      )
    } else {
      console.log('permisos otorgados');
    }
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
        <View style={{ borderRadius: 10, width: 373, height: checkCamera || checkGalery ? 300 : 350, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.texto}>
            {texto}
          </Text>
          <View style={{ width: "90%", height: 140, justifyContent: "center", alignItems: "center" }}>
            {renderTexto(children)}
            <View style={{ height: 30 }}>
              <Text style={{ color: "#949AAF", fontSize: 12 }}>
                Cantidad de imagenes: {imageAdjunto.length} de {limiteImg}
              </Text>
            </View>
          </View>
          {
            loading === true && limiteImg === imageAdjunto.length ?
              <View>
                <ActivityIndicator size="large" color="#FF3D00" />
                <Text>
                  Subiendo imagen...
                </Text>
              </View>
              :
              <>
                {
                  renderAlerta()
                }
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => { requestCameraPermission(children) }} style={{ backgroundColor: "#FF3D00", height: 30, width: "40%", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                    <Text style={{ color: "white" }}>
                      Camara
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { handleGalleryPermission(children) }} style={{ backgroundColor: "#FF3D00", height: 30, width: "40%", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white" }}>
                      Galeria
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={cerrarModal} style={{ width: 320, height: 35, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                  <Text>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </>
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center"
  }
})