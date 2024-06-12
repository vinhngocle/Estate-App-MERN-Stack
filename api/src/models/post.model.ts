export enum Type {
  buy = "buy",
  rent = "rent"
}

export enum Property {
  apartment = "aparment",
  house = "house",
  condo = "condo",
  land = "land"
}

export interface PostDataModel {
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  type: Type;
  property: Property;
  latitude: string;
  longitude: string;
}

export interface PostDetailModel {
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
}