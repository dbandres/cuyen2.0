import { ActivityIndicator, Modal, Text, View } from "react-native";
import { ButtonCustom } from "../components/ButtomCustom";




export function ModalAlert({ visible, onClose, texto, error, loading }) {

  const transparent = "rgba(0,0,0,0.5)"
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {
        loading === true ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
            <View style={{ borderRadius: 10, width: loading === true ? 100 : 373, height: 100, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: loading === true ? 100 : 275, height: 100, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#FF3D00" />
              </View>
            </View>
          </View>
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
            <View style={{ borderRadius: 10, width: error !== null ? 200 : 350, height: "auto", backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: error !== null ? 180 : 275, height: "auto", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: error !== null ? 180 : 331, margin: 20 }}>
                  <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "500", lineHeight: 19 }}>
                    {
                      error !== null ? error : texto
                    }
                  </Text>
                </View>
                <View style={{ height: 47, width: error !== null ? 180 : 331, borderRadius: 10, marginBottom: 5 }}>
                  <ButtonCustom
                    text="Confirmar"
                    color="#FF3D00"
                    register={false}
                    onPress={onClose}
                  />
                </View>
              </View>
            </View>
          </View>
      }
    </Modal>
  )
}