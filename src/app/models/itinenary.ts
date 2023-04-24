export interface Itinerary {
  itineraryId: string
  itineraryName: string
  itineraryStartTime: string
  itineraryEndTime: string
  tag:string
  currency? : string
  itineraryCost: number
  itineraryStartLocation: string
  itineraryEndLocation: string
  notes: string
  tripId:string;
  id?:string;
}
