import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { Sede } from '../interfaces/sede.interface';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(
    private cmnSrvc: CommonService
  ) { }

  //#region Fragmentos de GraphQL
  private fragSedeEmpresaParentFields = `
    fragment sedeEmpresaParentFields on Sede{
      empresa{
        _id
        nombre
        abreviatura
      }
    }
  `;

  private fragSedeAreasDetailFields = `
    fragment sedeAreasDetailFields on Sede{
      areas{
        _id
        nombre
        debaja
      }
    }
  `;

  private fragSedeHeaderFields = `
    fragment sedeHeaderFields on Sede{
      _id
      nombre
      debaja
    }
  `;

  private fragmentsList = [
    this.fragSedeHeaderFields, this.fragSedeEmpresaParentFields, this.fragSedeAreasDetailFields
  ];
  //#endregion

  listaEntidades(): Observable<Sede[]> {
    const qName = 'Sedes';
    const query = `
      sedes{
        ...sedeHeaderFields
        ...sedeEmpresaParentFields
        ...sedeAreasDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'sedes', [], this.fragmentsList);
  }

  getEntidad(idEntidad: string): Observable<Sede> {
    const qName = 'Sede($id: ID!)';
    const query = `
      sede(_id: $id){
        ...sedeHeaderFields
        ...sedeEmpresaParentFields
        ...sedeAreasDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'sede', { id: idEntidad }, this.fragmentsList);
  }

  saveEntidad(entidad: Sede): Observable<Sede> {
    let mName = '', mutation = '';
    if (entidad._id !== null && entidad._id !== undefined) {
      mName = 'UpdateSede($input: UpdateSedeInput)';
      mutation = `
        sede: updateSede(input: $input){
          ...sedeHeaderFields
          ...sedeEmpresaParentFields
          ...sedeAreasDetailFields
        }
      `;
    } else {
      delete entidad._id;
      mName = 'CreateSede($input: CreateSedeInput)';
      mutation = `
        sede: createSede(input: $input){
          ...sedeHeaderFields
          ...sedeEmpresaParentFields
          ...sedeAreasDetailFields
        }
      `;
    }
    return this.cmnSrvc.doMutation(mName, mutation, 'sede', entidad, this.fragmentsList);
  }

  trashEntidad(idEntidad: string): Observable<Sede> {
    const mName = 'UpdateSede($input: UpdateSedeInput)';
    const mutation = `
        sede: updateSede(input: $input){
          ...sedeHeaderFields
          ...sedeEmpresaParentFields
          ...sedeAreasDetailFields
        }
      `;
    return this.cmnSrvc.doMutation(mName, mutation, 'sede', { id: idEntidad, debaja: true }, this.fragmentsList);
  }

}
