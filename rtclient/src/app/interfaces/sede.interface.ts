import { Empresa } from './empresa.interface';
import { Area } from './area.interface';

export interface Sede {
    _id: string;
    empresa?: Empresa;
    nombre?: string;
    areas?: Area[];
    debaja?: boolean;
}
