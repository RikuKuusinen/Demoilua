import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Kommentti } from './kommentti';
import { MessageService } from './message.service';


import { KOMMENTIT } from './mock-kommentit';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


// @Injectable((providedIn: 'root' }),

@Injectable({ providedIn: 'root' })

export class KommentitService {

  constructor(private messageService: MessageService) { }

  getKommentit(): Observable<Kommentti[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(KOMMENTIT);
  }

    getKommentti(id: number): Observable < Kommentti > {
      // TODO: send the message _after_ fetching the hero
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(KOMMENTIT.find(hero => hero.id === id));
    }
  }

