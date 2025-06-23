import { PaymentMethod, PaymentStatus, Variation } from "@prisma/client";

export interface Product {
    name:string,
    slug:string,
    price:number,
    image?:string,
    salePrice?:number,
    quantity:number,
    description?:string
    shortDescription?:string
}

export interface Category {
    name:string, 
    slug?:string
}

export interface ProductCategory {
    productId:string,
    categoryId:string
}

export interface ProductVariation {
    name:string,
    value:string,
    type:Variation
}

export interface Address {
    userId:string,
    street:string,
    city:string,
    state:string,
    postalCode:string,
    line1:string,
    line2?:string,
    country:string,
    countryCode:string,
    isDefault:boolean
}

export interface Payment {
    paymenMethod:PaymentMethod,
    status:PaymentStatus,
    userId:string
}

export interface Review{
    userId:string,
    productId:string,
    content:string
}

export interface Rating{
    userId:string,
    productId:string,
    rate:number
}

export interface CartItem {
    sku:string,
    productId:string,
    product:Product
    variations:string[],
    qty:number,
    userId:string,
    orderId?:string,
  }