import { CommandeModel } from "./commande.model"
import { Type_venteMoel } from "./type_vente.model"

export interface Detail_CdeModel{
  id : number
  qte : number
  commande : CommandeModel
  type_vente : Type_venteMoel
}
