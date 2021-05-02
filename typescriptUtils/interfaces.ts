export interface TUserTokenData {
  user: { [key: string]: any };
  token?: string;
  expiry: Date;
}
