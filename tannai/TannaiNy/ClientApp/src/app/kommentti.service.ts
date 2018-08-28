import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Kommentti } from './kommentti';
import { MessageService } from './message.service';


// import { KOMMENTIT } from './mock-kommentit';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



// @Injectable((providedIn: 'root' }),

@Injectable({ providedIn: 'root' })

export class KommentitService {

  //private kommentitUrl = 'api/kommentit';  // URL to web api
  private kommentitUrl = 'http://tannainyapi.azurewebsites.net/api/comment'

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getKommentit(): Observable<Kommentti[]> {
 
    console.log("toimii")

    return this.http.get<Kommentti[]>(this.kommentitUrl + '/getallcomments').pipe(
      tap(kommentit => this.log('fetched kommentit')),
      catchError(this.handleError('getKommentit', []))
    );
  }
  /** GET kommentti by id. Return `undefined` when id not found */
  getKommenttiNo404<Data>(id: string): Observable<Kommentti> {
    const url = `${this.kommentitUrl}/?id="${id}"`;
    return this.http.get<Kommentti[]>(url)
      .pipe(
        map(kommentit => kommentit[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} kommentti id=${id}`);
        }),
        catchError(this.handleError<Kommentti>(`getHero id=${id}`))
      );
  }

  getKommentti(id: string): Observable<Kommentti> {
    const url = `${this.kommentitUrl}/getbycommentid?id="${id}"`;

    return this.http.get<Kommentti>(url).pipe(
      tap(_ => this.log(`fetched kommentti id=${id}`)),
      catchError(this.handleError<Kommentti>(`getKommentti id=${id}`))
    );
  }
  searchEhdotus(term: string): Observable<Kommentti[]> {
    if (!term.trim()) {
      // if not search term, return empty  array.
      return of([]);
    }
    return this.http.get<Kommentti[]>(`${this.kommentitUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found ehdotuksia matching "${term}"`)),
      catchError(this.handleError<Kommentti[]>('searchEhdotus', []))
    );
  }


  //////// Save methods //////////

  /** POST: add a new comment to the server */
  addKommentti(kommentti: Kommentti): Observable<Kommentti> {
    console.log(JSON.stringify(kommentti));
    return this.http.post<Kommentti>(this.kommentitUrl + '/post', kommentti, httpOptions).pipe(
      tap((kommentti: Kommentti) => this.log(`added kommentti w/ id`)),
      catchError(this.handleError<Kommentti>('addKommentti'))
    );
  }

  /** DELETE: delete the comment from the server */
  deleteKommentti(kommentti: Kommentti | number): Observable<Kommentti> {
    const id = typeof kommentti === 'number' ? kommentti : kommentti.id;
    const url = `${this.kommentitUrl}/${id}`;

    return this.http.delete<Kommentti>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted kommentti id=${id}`)),
      catchError(this.handleError<Kommentti>('deleteKommentti'))
    );
  }

  /** PUT: update the comment on the server */
  updateKommentti(kommentti: Kommentti): Observable<any> {
    return this.http.put(this.kommentitUrl, kommentti, httpOptions).pipe(
      tap(_ => this.log(`updated kommentti id=${kommentti.id}`)),
      catchError(this.handleError<any>('updateKommentti'))
    );
  }
 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    private log(message: string) {
    this.messageService.add(`KommenttiService: ${message}`);
  
  }
  }

