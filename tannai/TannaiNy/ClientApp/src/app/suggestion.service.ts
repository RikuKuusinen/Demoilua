import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Suggestion } from './suggestion';
import { MessageService } from './message.service';


// import { KOMMENTIT } from './mock-kommentit';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



// @Injectable((providedIn: 'root' }),

@Injectable({ providedIn: 'root' })

export class SuggestionService {

  //private kommentitUrl = 'api/kommentit';  // URL to web api
  private kommentitUrl = 'http://tannainyapi.azurewebsites.net/api/suggestion'

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getSuggestions(): Observable<Suggestion[]> {

    console.log("toimii")

    return this.http.get<Suggestion[]>(this.kommentitUrl + '/getallsuggestions').pipe(
      tap(suggestion => this.log('fetched kommentit')),
      catchError(this.handleError('getSuggestions', []))
    );
  }

  getTopSuggestions(): Observable<Suggestion[]> {

    console.log("toimii")

    return this.http.get<Suggestion[]>(this.kommentitUrl + '/gettop3').pipe(
      tap(suggestion => this.log('fetched kommentit')),
      catchError(this.handleError('getSuggestions', []))
    );
  }

  getSuggestion(id: string): Observable<Suggestion> {
    const url = `${this.kommentitUrl}/getbysuggestionid?id="${id}"`;
    return this.http.get<Suggestion>(url).pipe(
      tap(_ => this.log(`fetched suggestion id=${id}`)),
      catchError(this.handleError<Suggestion>(`getSuggestion id=${id}`))
    );
  }
  searchSuggestion(term: string): Observable<Suggestion[]> {
    if (!term.trim()) {
      // if not search term, return empty  array.
      return of([]);
    }
    return this.http.get<Suggestion[]>(`${this.kommentitUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found ehdotuksia matching "${term}"`)),
      catchError(this.handleError<Suggestion[]>('searchSuggestion', []))
    );
  }
    
    //getLikesBySuggestionId(SuggestionId: string): Observable<Suggestion> {
    //    const url = `${this.kommentitUrl}/getBySuggestionId?id="${SuggestionId}"`;
    //    return this.http.get<Likes>(url).pipe(
    //        tap(_ => this.log(`fetched Likes id=${SuggestionId}`)),
    //        catchError(this.handleError<Suggestion>(`getSuggestion id=${SuggestionId}`))
    //    );

    //}

  //////// Save methods //////////

  /** POST: add a new comment to the server */
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    console.log(JSON.stringify(suggestion));
    return this.http.post<Suggestion>(this.kommentitUrl + '/post', suggestion, httpOptions).pipe(
      tap((kommentti: Suggestion) => this.log(`added suggestion w/ id`)),
      catchError(this.handleError<Suggestion>('addSuggestion'))
    );
  }

  /** DELETE: delete the comment from the server */
  deleteSuggestion(suggestion: Suggestion | number): Observable<Suggestion> {
    const id = typeof suggestion === 'number' ? suggestion : suggestion.id;
    const url = `${this.kommentitUrl}/delete?id=${id}`;

    //const url = `${this.kommentitUrl}/${id}`;

    return this.http.delete<Suggestion>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted suggestion id=${id}`)),
      catchError(this.handleError<Suggestion>('deleteSuggestion'))
    );
  }

  /** PUT: update the comment on the server */
  updateSuggestion(suggestion: Suggestion): Observable<any> {
    return this.http.put(this.kommentitUrl, suggestion, httpOptions).pipe(
      tap(_ => this.log(`updated suggestion id=${suggestion.id}`)),
      catchError(this.handleError<any>('updatedSuggestion'))
    );
  }

    /** PUT: update the likes on the server */

  updateLikes(id: string, likes: number): Observable<any> {
    const url = `${this.kommentitUrl}/UpdateSuggestionLike?id=${id}&Likes=${likes}`;
    return this.http.put(url, likes, httpOptions).pipe(
      tap(_ => this.log(`updated suggestion id=${id}`)),
      catchError(this.handleError<any>('updatedSuggestion'))
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
    this.messageService.add(`SuggestionService: ${message}`);

  }
}

