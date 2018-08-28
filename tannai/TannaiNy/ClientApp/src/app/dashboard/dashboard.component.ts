import { Component, OnInit } from '@angular/core';
import { Kommentti } from '../kommentti';
import { KommentitService } from '../kommentti.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  kommentit: Kommentti[] = [];

  constructor(private kommenttiService: KommentitService) { }

  ngOnInit() {
    this.getKommentit();
  }

  getKommentit(): void {
    this.kommenttiService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit.slice(5, 9));
  }
}
