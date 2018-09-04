export interface ArbolMenu {
    _id: string;
    ruta?: string;
    descripcion?: string;
    nivel?: number;
    url?: string;
    icono?: string;
    children?: ArbolMenu[];
}
