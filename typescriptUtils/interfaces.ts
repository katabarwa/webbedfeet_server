export interface TUserTokenData {
  user: { [key: string]: any };
  token?: string;
  expiry: Date;
}

export interface TAudioConfigData {
  links: string;
  people: string[];
  timeInterval: { from: number; to: number };
}
