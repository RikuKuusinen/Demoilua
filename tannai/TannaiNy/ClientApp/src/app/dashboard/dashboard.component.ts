import { Component, OnInit } from '@angular/core';
import { Kommentti } from '../kommentti';
import { KommentitService } from '../kommentti.service';
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private kommenttiService: KommentitService, auth: AuthService) {
    auth.handleAuthentication();
  }


  kommentit: Kommentti[] = [];



  ngOnInit() {
    this.getKommentit();
  }

  getKommentit(): void {
    this.kommenttiService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit.slice(5, 9));
  }
}
