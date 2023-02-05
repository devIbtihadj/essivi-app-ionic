import { CommercialModel } from "./commercial.model"
import { VehiculeModel } from "./vehicule.model"

export interface OccupationModel{
  id : number
  dateDebut : Date
  dateFin : Date
  commercial : CommercialModel
  vehicule : VehiculeModel
}
