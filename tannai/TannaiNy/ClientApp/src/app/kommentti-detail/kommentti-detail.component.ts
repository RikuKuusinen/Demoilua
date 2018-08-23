import { Component, OnInit, Input } from '@angular/core';
import {Kommentti} from '../kommentti'

@Component({
  selector: 'app-kommentti-detail',
  templateUrl: './kommentti-detail.component.html',
  styleUrls: ['./kommentti-detail.component.css']
})
export class KommenttiDetailComponent implements OnInit {
  @Input() kommentti: Kommentti;
  constructor() { }

  ngOnInit() {
  }

}
