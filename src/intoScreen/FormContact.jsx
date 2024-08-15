import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomInput } from "./CustomInput";
import { useForm } from "react-hook-form";
import AwesomeAlert from 'react-native-awesome-alerts'
import { useDispatch, useSelector } from "react-redux";
import { postContactForm } from "../slices/contactFormSlice";


export const FormContact = React.forwardRef((props, ref) => {

  const { handleSubmit, setValue, reset, control, trigger } = useForm()
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert1, setShowAlert1] = useState(false)
  const status = useSelector((state) => state.formContact.status);
  const dispatch = useDispatch()

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert2}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }
  const getAlertOk = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="OK!"
        message="Formulario enviado con Éxito 🎉"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#008000"
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
    )
  }

  const getAlertError = () => {
    return (
      <AwesomeAlert
        show={showAlert1}
        showProgress={false}
        title="ERROR!"
        message="Complete todos los datos!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#008000"
        onConfirmPressed={() => {
          setShowAlert1(false)
        }}
      />
    )
  }

  const handleSubmitFormulario = (data) => {
    console.log(data);
    if (data.mensaje && data.namecomplete && data.phone && data.useremail) {
      setShowAlert2(true)
      dispatch(postContactForm(data))
    } else {
      console.log("faltan datos")
      setShowAlert1(true)
    }
  }

  useEffect(() => {
    if (status === 200) {
      setShowAlert2(false)
      setShowAlert(true)
    }
  }, [status])


  return (
    <View ref={ref} style={{ height: 550, backgroundColor: "#FF3D00", alignItems: "center" }}>
      <View style={{ width: "90%", height: "15%", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>Formulario </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "400" }}>de contacto</Text>
      </View>
      <View style={{ width: "80%", height: "50%" }}>
        <CustomInput
          control={control}
          formIntro={true}
          formContact={true}
          trigger={trigger}
          name="namecomplete"
          placeholder="Nombre y apellido"
          rules={{
            required: true,
            pattern: { value: /^[a-zA-Z]+$/, message: "El nombre es incorrecto" },
            minLength: {
              value: 2,
              message: "El nombre debe tener un minimo de 2 caracteres"
            },
            maxLength: {
              value: 15,
              message: "El nombre debe tener como maximo de 15 caracteres"
            }
          }}
        />
        <CustomInput
          control={control}
          formIntro={true}
          formContact={true}
          trigger={trigger}
          name="phone"
          numeric="numeric"
          placeholder="Teléfono de contacto"
          rules={{
            required: true,
            minLength: {
              value: 10,
              message: "El número debe tener un minimo de 10 dígitos"
            },
            maxLength: {
              value: 15,
              message: "El número debe tener como maximo de 15 dígitos"
            }
          }}
        />
        <CustomInput
          control={control}
          formIntro={true}
          formContact={true}
          trigger={trigger}
          name="useremail"
          placeholder="E-mail"
          rules={{
            required: true,
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "La Direccion de Email es Incorrecta" }
          }}
        />
        <View style={{ width: "50%", alignItems: "center", height: "15%", justifyContent: "center" }}>
          <Text style={{ color: "white" }}>
            Dejanos tu mensaje
          </Text>
        </View>
        <CustomInput
          formIntro={true}
          control={control}
          trigger={trigger}
          name="mensaje"
          multiline={true}
          numberOfLines={20}
        />
        <TouchableOpacity onPress={handleSubmit(handleSubmitFormulario)} style={{ backgroundColor: "#3462BF", height: "17%", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>Enviar</Text>
        </TouchableOpacity>
      </View>
      {showAlert2 ? getAlert() : null}
      {showAlert ? getAlertOk() : null}
      {showAlert1 ? getAlertError() : null}
    </View>
  )
})