import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private cmnSrvc: CommonService
  ) { }

  //#region Fragmentos de GraphQL
  private fragEmpresaOrganizacionParentFields = `
    fragment empresaOrganizacionParentFields on Empresa{
      organizacion{
        _id
        nombre
        debaja
      }
    }
  `;
  private fragEmpresaSedesDetailFields = `
    fragment empresaSedesDetailFields on Empresa{
      sedes{
        _id
        nombre
        debaja
      }
    }
  `;

  private fragEmpresaHeaderFields = `
    fragment empresaHeaderFields on Empresa{
      _id
      nombre
      razonsocial
      abreviatura
      nit
      debaja
    }
  `;

  private fragmentsList = [
    this.fragEmpresaHeaderFields, this.fragEmpresaOrganizacionParentFields, this.fragEmpresaSedesDetailFields
  ];
  //#endregion

  listaEntidades(): Observable<Empresa[]> {
    const qName = 'Empresas';
    const query = `
      empresas{
        ...empresaHeaderFields
        ...empresaOrganizacionParentFields
        ...empresaSedesDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'empresas', [], this.fragmentsList);
  }

  getEntidad(idEntidad: string): Observable<Empresa> {
    const qName = 'Empresa($id: ID!)';
    const query = `
      empresa(_id: $id){
        ...empresaHeaderFields
        ...empresaOrganizacionParentFields
        ...empresaSedesDetailFields
      }
    `;
    return this.cmnSrvc.getQuery(qName, query, 'empresa', { id: idEntidad }, this.fragmentsList);
  }

  saveEntidad(entidad: Empresa): Observable<Empresa> {
    let mName = '', mutation = '';
    if (entidad._id !== null && entidad._id !== undefined) {
      mName = 'UpdateEmpresa($input: UpdateEmpresaInput)';
      mutation = `
        empresa: updateEmpresa(input: $input){
          ...empresaHeaderFields
          ...empresaOrganizacionParentFields
          ...empresaSedesDetailFields
        }
      `;
    } else {
      delete entidad._id;
      mName = 'CreateEmpresa($input: CreateEmpresaInput)';
      mutation = `
        empresa: createEmpresa(input: $input){
          ...empresaHeaderFields
          ...empresaOrganizacionParentFields
          ...empresaSedesDetailFields
        }
      `;
    }
    return this.cmnSrvc.doMutation(mName, mutation, 'empresa', entidad, this.fragmentsList);
  }
}
