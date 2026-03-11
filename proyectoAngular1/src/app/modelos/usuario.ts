export interface Usuario {
    id?:number | string ;
    nombre:string;
    apellidos:string;
    email:string;
    password:string;
    imgPerfil?:string;
}
