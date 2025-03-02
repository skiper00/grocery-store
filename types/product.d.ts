export interface ISProduct {
    id:string,
    image:string,
    description:string,
    price: number,
    rating:number,
    is_favorite:boolean,
    stock:boolean,
    discount?:number
}