import {applyMiddleware, configureStore} from "@reduxjs/toolkit"
import promoReducer from "../slices/ejemploSlice"
import infoReducer from "../slices/infoImportante"
import formContactReducer from "../slices/contactFormSlice"
import { thunk } from "redux-thunk"
import loginReducer from "../slices/loginSlice"
import contratosReducer from "../slices/numeroContrato"
import registerReducer from "../slices/registerSlice"
import forgotPassReducer from "../slices/forgotPass"
import destinoReducer from "../slices/getDestinoSlice"
import contratoReducer from "../slices/getContratoSlice"
import verifyPasajeroReducer from "../slices/verifyPasajero"
import pasajeroReducer from "../slices/getPasajeroSlice"
import postPasajeroReducer from "../slices/postPasajeroSlice"
import userVerifyReducer from "../slices/dniVerifyUser"
import allColegiosReducer from "../slices/getAllColegios"
import colegioVerifyReducer from "../slices/verifyColegios"
import hotelReducer from "../slices/getHotelByNumSlice"
import contratoActualReducer from "../slices/contratoActualSlice"
import putContratoReducer from "../slices/putContratoSlice"
import itinerarioReducer from "../slices/getItinerarioSlice"
import cuotasPasajeroReducer from "../slices/getCuotasPasajeroSlice"
import codigoBarraReducer from "../slices/getCodigoBarraPasajeroSlice"

export const store = configureStore({
  reducer:{
    promo: promoReducer,
    info: infoReducer,
    formContact: formContactReducer,
    login: loginReducer,
    contratos: contratosReducer,
    register: registerReducer,
    forgotPass: forgotPassReducer,
    destino: destinoReducer,
    contrato: contratoReducer,
    verifyPasajero: verifyPasajeroReducer,
    pasajero: pasajeroReducer,
    postPasajero: postPasajeroReducer,
    verifyUser: userVerifyReducer,
    colegios: allColegiosReducer,
    verifyColegios: colegioVerifyReducer,
    hotelByNum: hotelReducer,
    contratoActual: contratoActualReducer,
    putContrato: putContratoReducer,
    itinerario: itinerarioReducer,
    cuotasPasajero: cuotasPasajeroReducer,
    codigoBarra: codigoBarraReducer

  }
}, applyMiddleware(thunk))