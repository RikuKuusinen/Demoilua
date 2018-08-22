import { Component, OnInit } from '@angular/core';
import { KOMMENTIT } from '../mock-kommentit';
import { Kommentti } from '../kommentti';


@Component({
  selector: 'app-ehdotus',
  templateUrl: './ehdotus.component.html',
  styleUrls: ['./ehdotus.component.css']
})
export class EhdotusComponent implements OnInit {


  kommentit = KOMMENTIT;

  selectedKommentti: Kommentti;

  onSelect(kommentti: Kommentti): void {
    this.selectedKommentti = kommentti;
  }

  constructor() { }

  ngOnInit() {
  }

}
