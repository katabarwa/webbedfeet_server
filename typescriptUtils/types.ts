export type TSignUPMethod = "email" | "google" | "facebook";
export type TAddressObject = {
  address: string;
  apt?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};
