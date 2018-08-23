import { Component, OnInit } from '@angular/core';


import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Kommentti } from '../kommentti';
import { KommentitService } from '../kommentti.service';


@Component({
  selector: 'app-ehdotus-search',
  templateUrl: './ehdotus-search.component.html',
  styleUrls: ['./ehdotus-search.component.css']
})
export class EhdotusSearchComponent implements OnInit {
  kommentit$: Observable<Kommentti[]>;
  private searchTerms = new Subject<string>();
  constructor(private kommentitService: KommentitService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
  
    this.kommentit$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.kommentitService.searchEhdotus(term)),
    );
  }
}
