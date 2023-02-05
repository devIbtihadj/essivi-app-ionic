import { Type_vehiculeModel } from "./type_vehicule.model"

export interface VehiculeModel{
  id : number
  immatriculation : string
  type_vehicule : Type_vehiculeModel
  type_vehicule_id : number
}
