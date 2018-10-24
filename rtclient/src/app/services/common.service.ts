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

  getQuery(queryName: String, query: String, dataName, variables: any = {}, fragmentos: string[] = []): Observable<any> {
    const frags = fragmentos.join(' ');
    return this.apollo.watchQuery({
      query: gql`query ${queryName} { ${query} } ${frags}`,
      variables: variables,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      map(
        ( { data } ) => data[dataName]
      )
    );
  }

  doMutation(mutationName: String, mutation: String, dataName, variables: any = {}, fragmentos: string[] = []): Observable<any> {
    const frags = fragmentos.join(' ');
    return this.apollo.mutate({
      mutation: gql`mutation ${mutationName} { ${mutation} } ${frags}`,
      variables: {input: variables},
      fetchPolicy: 'no-cache'
    }).pipe(
      map(
        ({ data }) => data[dataName]
      )
    )
    ;
  }

}
