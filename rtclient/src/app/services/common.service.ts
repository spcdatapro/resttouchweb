import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // loading: boolean;
  // datos: Observable<any>;

  constructor(private apollo: Apollo) { }

  getQuery(queryName: String, query: String, dataName, variables: any = {}): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`query ${queryName} { ${query} }`,
      variables: variables
    }).valueChanges.pipe(
      map(
        ( { data } ) => data[dataName]
      )
    );
  }

}
