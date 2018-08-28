import { Component, OnInit, Input } from '@angular/core';
import { Kommentti } from '../kommentti'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { KommentitService } from '../kommentti.service';

@Component({
  selector: 'app-kommentti-detail',
  templateUrl: './kommentti-detail.component.html',
  styleUrls: ['./kommentti-detail.component.css']
})
export class KommenttiDetailComponent implements OnInit {
  @Input() kommentti: Kommentti;
  constructor(
    private route: ActivatedRoute,
    private kommentitService: KommentitService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getKommentti();
  }

  getKommentti(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.kommentitService.getKommentti(id)
      .subscribe(kommentti => this.kommentti = kommentti);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.kommentitService.updateKommentti(this.kommentti)
      .subscribe(() => this.goBack());
  }
}
