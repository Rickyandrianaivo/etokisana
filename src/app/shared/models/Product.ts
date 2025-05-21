export class Product{
    codeCPC !: string;
    productName!:string;
    productDescription!:string;
    productPrice : number = 0;
    productCategory!:string;
    productUnite!:string;
    productStock!:number;
    productState : string = "en attente";
    // productSource!:string;
    productImage:string[] =[];
    // productOwner!:string;
    productVolume : number = 0;
    productHauteur : number = 0;
    productLargeur : number = 0;
    productLongueur : number = 0;
    productPoids : number = 0;
}