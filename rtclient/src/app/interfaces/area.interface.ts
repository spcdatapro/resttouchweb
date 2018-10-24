import { Sede } from './sede.interface';
import { Mesa } from './mesa.interface';

export interface Area {
    _id: string;
    sede?: Sede;
    nombre?: string;
    mesas?: Mesa[];
    debaja?: boolean;
}
