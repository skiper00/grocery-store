export interface ISProduct {
    id:string,
    image:string,
    description:string,
    category_id:string,
    price: number,
    rating:number,
    is_favorite:boolean,
    stock:boolean,
    discount?:number,
    country:string,
    brand:string,
    weight:number,
}