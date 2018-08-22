import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kommentti',
  templateUrl: './kommentti.component.html',
  styleUrls: ['./kommentti.component.css']
})
export class KommenttiComponent implements OnInit {
  log(x) { console.log(x); }

  constructor() { }

  ngOnInit() {
  }
}
