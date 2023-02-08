import { CommercialModel } from "./commercial.model"
import { Commercial_ClientModel } from "./commercial_client.model"

export interface ClientModel{
  id : number
  nom : string
  prenom : string
  numTel : string
  latitude : number
  longitude : number
  quartier : string
  dateEnrollement : Date
  commercial : CommercialModel
}


export class clientModelClass{
  nom! : string
  prenom! : string
  numTel! : string
  latitude! : number
  longitude! : number
  quartier! : string
}
