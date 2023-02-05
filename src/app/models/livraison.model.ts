import { CommandeModel } from "./commande.model"
import { CommercialModel } from "./commercial.model"
import { PayementModel } from "./payement.model"

export interface LivraisonModel{
  id : number
  date_heure : Date
  payements : PayementModel[]
  commande : CommandeModel
  commercial : CommercialModel
}
