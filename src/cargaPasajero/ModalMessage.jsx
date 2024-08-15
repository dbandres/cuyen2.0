import { Modal, Text, View } from "react-native"
import { ButtonCustom } from "../components/ButtomCustom"


export const ModalMessage = ({ visible, onClose, text }) =>{
  const transparent = "rgba(0,0,0,0.5)"
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 149, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 38, width: 275, marginBottom: 20 }}>
            <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
              {text}
            </Text>
          </View>
          <View style={{ height: 47, width: 331, borderRadius: 10, marginBottom: 5 }}>
            <ButtonCustom
              text="Confirmar"
              color={ "#FF3D00"}
              onPress={()=>{onClose()}}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}