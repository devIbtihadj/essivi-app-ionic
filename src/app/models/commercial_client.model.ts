import { ClientModel } from "./client.model"
import { CommercialModel } from "./commercial.model"

export interface Commercial_ClientModel{
  id : number
  dateDebut : Date
  dateFin : Date
  commercial : CommercialModel
  client : ClientModel
}
