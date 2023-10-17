export interface Product {
    _id: string;
    nombre: string;
    stock: number;
    descripcion: string;
    imagen: string;
    sku: string;
    etiquetas: Array<string>;
}