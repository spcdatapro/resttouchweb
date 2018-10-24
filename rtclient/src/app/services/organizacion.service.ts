import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { Organizacion } from '../interfaces/organizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(
    private cmnSrvc: CommonService
  ) { }

  //#region Fragmentos de GraphQL

  private fragOrganizacionEmpresasDetailFields = `
    fragment organizacionHeaderFields on Organizacion{
      _id
      nombre
      debaja
    }
  `;

  private fragOrganizacionHeaderFields = `
    fragment organizacionEmpresaDetailFields on Organizacion{
      empresas{
        _id
        nombre
        razonsocial
        abreviatura
        nit
        direccion
        debaja
      }
    }
  `;

  private fragmentsList = [
    this.fragOrganizacionHeaderFields, this.fragOrganizacionEmpresasDetailFields
  ];
  //#endregion


  listaEntidades(): Observable<Organizacion[]> {
    const qName = 'Organizaciones';
    const query = `
      organizaciones{
        ...organizacionHeaderFields
        ...organizacionEmpresaDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'organizaciones', {}, this.fragmentsList);
  }

  getEntidad(idEntidad: string): Observable<Organizacion> {
    const qName = 'Organizacion($id: ID!)';
    const query = `
      organizacion(_id: $id){
        ...organizacionHeaderFields
        ...organizacionEmpresaDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'organizacion', { id: idEntidad }, this.fragmentsList);
  }

  saveEntidad(entidad: Organizacion): Observable<Organizacion> {
    let mName = '', mutation = '';
    if (entidad._id !== null && entidad._id !== undefined) {
      mName = 'UpdateOrganizacion($input: UpdateOrganizacionInput)';
      mutation = `
        organizacion: updateOrganizacion(input: $input){
        ...organizacionHeaderFields
        ...organizacionEmpresaDetailFields
        }
      `;
    } else {
      delete entidad._id;
      mName = 'CreateOrganizacion($input: CreateOrganizacionInput)';
      mutation = `
        organizacion: createOrganizacion(input: $input){
        ...organizacionHeaderFields
        ...organizacionEmpresaDetailFields
        }
      `;
    }
    return this.cmnSrvc.doMutation(mName, mutation, 'organizacion', entidad, this.fragmentsList);
  }

  trashEntidad(idEntidad: string): Observable<Organizacion> {
    const mName = 'UpdateOrganizacion($input: UpdateOrganizacionInput)';
    const mutation = `
        organizacion: updateOrganizacion(input: $input){
        ...organizacionHeaderFields
        ...organizacionEmpresaDetailFields
        }
      `;
    return this.cmnSrvc.doMutation(mName, mutation, 'organizacion', { id: idEntidad, debaja: true }, this.fragmentsList);
  }

}
