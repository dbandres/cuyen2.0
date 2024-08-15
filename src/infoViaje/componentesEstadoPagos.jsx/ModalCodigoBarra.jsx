import { Modal, Text, TouchableOpacity, View } from "react-native";
import Barcode from '@adrianso/react-native-barcode-builder';
import { useState } from "react";

export function ModalCodigoBarra({ visible, onClose, data }) {

  const transparent = "rgba(0,0,0,0.5)"
  const [refresh, setRefresh] = useState(false)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 610, backgroundColor: "white", justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <View style={{ top: 20, position: "absolute" }}>
            <Text style={{fontWeight:"500", fontSize:16, lineHeight:19, textAlign:"center", color:"#334EA2"}}>
              Código de pago
            </Text>
          </View>

          <View style={{ height: 100, width: 420, transform: [{ rotate: '90deg' }], justifyContent: "center" }}>
            <View style={{width:"100%", alignItems:"center", height:40, justifyContent:"center"}}>
              <Text style={{fontWeight:"600", fontSize:16, lineHeight:19, color:"#564C71"}}>
                {data}
              </Text>
            </View>
            <Barcode value={data} format="CODE128" />
          </View>

          <TouchableOpacity onPress={onClose} style={{ bottom: 20, position: "absolute", width: 331, height: 47, backgroundColor: "#FF3D00", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color:"white"}}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}