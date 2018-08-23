import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KOMMENTIT } from '../mock-kommentit';
import { Kommentti } from '../kommentti';
/**
 * <like [totalLikes]="post.totalLikes" [iLike]="post.iLike" (change)="oniLikeChange($event)"></like>
 */
//jos tälle tehdään oma komponentti niin selectoriksi tulee 'like' ja ylläolevalla koodinpätkällä saadaan total tykkäykset laskettua.

@Component({
  selector: 'app-ehdotus',
  templateUrl: './ehdotus.component.html',
  styleUrls: ['./ehdotus.component.css']
})
export class EhdotusComponent implements OnInit {

 @Input() totalLikes = 0;
  @Input() iLike = false;

  @Output() change = new EventEmitter();

  onClick() {
    this.iLike = !this.iLike;
    this.totalLikes += this.iLike ? 1 : -1;
    this.change.emit({ newValue: this.iLike, newTotal: this.totalLikes });
  }
  // tässä tykkäysnapin counteri

  kommentit = KOMMENTIT;

  selectedKommentti: Kommentti;

  onSelect(kommentti: Kommentti): void {
    this.selectedKommentti = kommentti;
  }

  constructor() { }

  ngOnInit() {
  }

}
