import { Empresa } from './empresa.interface';

export interface Organizacion {
    _id: string;
    nombre?: string;
    debaja?: boolean;
    empresas?: Empresa[];
}
