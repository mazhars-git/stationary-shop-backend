import { Model } from "mongoose";

export type TStationeryBrands =
  | "Pilot"
  | "Parker"
  | "Uni-ball"
  | "Pentel"
  | "Staedtler"
  | "Moleskine"
  | "Rhodia"
  | "Faber-Castell"
  | "Lamy"
  | "Cross"
  | "Montblanc"
  | "Tombow"
  | "Caran d'Ache"
  | "Leuchtturm1917"
  | "Field Notes"
  | "Clairefontaine"
  | "Zebra"
  | "Sakura"
  | "Platinum"
  | "Kaweco";

export type TStationeryModels =
  | "G2"
  | "V7 Hi-Tecpoint"
  | "Precise V5 RT"
  | "Jotter"
  | "IM"
  | "Vector"
  | "Signo 207"
  | "Vision Elite"
  | "Eye Micro"
  | "EnerGel"
  | "RSVP"
  | "GraphGear"
  | "Triplus Fineliner"
  | "Lumocolor"
  | "Mars Technico"
  | "Grip 2001"
  | "E-Motion"
  | "Ondoro"
  | "Safari"
  | "AL-Star"
  | "2000";

// export type TProductCategory = "Writing"
//   | "Office Supplies"
//   | "Art Supplies"
//   | "Educational"
//   | "Technology";

// Define the product type
export type TProduct = {
  name: string;
  brand: TStationeryBrands;
  model: TProductModel;
  price: number;
  productImg?: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};

// Define the Mongoose Model Type
export type TProductModel = Model<TProduct, Record<string, unknown>>;
