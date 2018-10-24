import { Area } from './area.interface';

export interface Posicion {
    x: number;
    y: number;
}

export interface Mesa {
    _id: string;
    area?: Area;
    numero?: number;
    sillas?: number;
    posicion?: Posicion;
    debaja?: boolean;
}
