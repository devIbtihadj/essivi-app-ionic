import { CommercialModel } from "./commercial.model"
import { LivraisonModel } from "./livraison.model"

export interface PayementModel{
  id : number
  montant : number
  date_heure : Date
  livraison : LivraisonModel
  commercial : CommercialModel
}
