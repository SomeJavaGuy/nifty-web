import SaleType from "../enums/SaleType";

export default interface MintingSettings {
  saleType: SaleType;
  startTime?: Date;
  endTime?: Date;
  subscribersAllowed?: boolean;
  followersAllowed?: boolean;
  copies?: Number;
  startingPrice?: Number;
  description?: string;
}
