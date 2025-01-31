import { JWTPayload } from "jose";

export interface formData {
  username: string;
  password?: string;
  type: string;
  email: string;
  passwordC?: string;
  store_name?: string;
  state?: string;
  city?: string;
  address?: string;
  phone?: string;
}
export interface loginformData {
  username: string;
  password: string;
}
export type MsgType = "success" | "error" | "info";
export interface MsgProps {
  message: string;
  type?: MsgType;
  duration?: number;
  onClose: () => void;
}

export interface verifyResponse {
  verified: boolean;
  error: string;
  tokenExpired?: boolean;
}
export interface commonResponse {
  success: boolean;
  message: string;
}

// New types for auth

export interface Payload extends JWTPayload {
  user: formData;
  expires: string | Date;
}

export type Price = {
  sale_price: number;
  purchase_price: number;
  sale_percentageChange: number;
  purchase_percentageChange: number;
  max_sale_price: number;
  min_sale_price: number;
  max_purchase_price: number;
  min_purchase_price: number;
  sale_std: number;
  purchase_std: number;
};
export type Currency = {
  id?: string;
  sale_price: number;
  purchase_price: number;
};

export interface Item {
  id: string;
  [key: string]: string | number;
}

export interface bulletin {
  id: string;
  [key: string]: string | number | Store | currency[] | Date;
}

export interface currency {
  id: string;
  [key: string]: string | GLfloat | Store | bulletin[] | Date;
}

export interface Store {
  id: string;
  [key: string]: string | GLfloat | Store | bulletin[] | Date;
}
