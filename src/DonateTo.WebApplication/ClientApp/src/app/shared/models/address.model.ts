import { BaseModel } from './base.model';

export class AddressModel extends BaseModel {
  street: string;
  state: string;
  postalCode: string;
  country: string;
  appartment: string;
  email: string;
  additionalInformation: string;
  responsableInformation: string;
  responsableIdentityNumber: string;
  isDefault: boolean;
}