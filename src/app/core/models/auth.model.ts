import { FormControl } from "@angular/forms";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  uuid: string;
  _id: string;
  name: string;
  email: string;
  isPasswordReset?: boolean;
  role: string;
  companyName?: string;
  locale: string;
  currency: string;
}

export interface ForgetPasswordForm {
  email: FormControl<string>;
}