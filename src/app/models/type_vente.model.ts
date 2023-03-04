import { MarqueModel } from "./marque.model"


export interface Type_venteMoel{
  id : number
  libelle_type_vente : string
  qte_unit : number
  prix_unit : number
  qte_contenu_unitaire : number
  image : string
  qte_composition : number
  marque : MarqueModel
}
