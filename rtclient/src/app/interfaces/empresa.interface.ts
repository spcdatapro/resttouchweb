import { Organizacion } from './organizacion.interface';
import { Sede } from './sede.interface';

export interface Empresa {
    _id: string;
    organizacion?: Organizacion;
    nombre?: string;
    razonsocial?: string;
    abreviatura?: string;
    nit?: string;
    direccion?: string;
    sedes?: Sede[];
    debaja?: boolean;
}
