import { Component, OnInit } from '@angular/core';
import { Kommentti } from '../kommentti';
import { KommentitService } from '../kommentti.service';
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { SuggestionService } from '../suggestion.service';
import { Suggestion } from '../suggestion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private kommenttiService: KommentitService, auth: AuthService, private suggestionService: SuggestionService) {
    auth.handleAuthentication();
  }


  kommentit: Kommentti[] = [];
  suggestion: Suggestion[] = [];
  
  
  

  ngOnInit() {
    this.getKommentit();
   
    this.getTopSuggestions();
    
  
  }


  getTopSuggestions() {
    this.suggestionService.getTopSuggestions()
      .subscribe(suggestion => {
        this.suggestion = suggestion
        this.lyhennaSuggestion()
        this.lyhennaSuggestion1()
        this.lyhennaSuggestion2()
      });
  }

  
 lyhennaSuggestion() {
   var kakka = this.suggestion[0].suggestion.slice(0, 20) + '...'
    this.suggestion[0].suggestion = kakka;
    console.log(kakka)

 }
  lyhennaSuggestion1() {
    var kakka = this.suggestion[1].suggestion.slice(0, 20) + '...'
    this.suggestion[1].suggestion = kakka;
    console.log(kakka)

  }
  lyhennaSuggestion2() {
    var kakka = this.suggestion[2].suggestion.slice(0, 20) + '...'
    this.suggestion[2].suggestion = kakka;
    console.log(kakka)

  }

  getKommentit(): void {
    this.kommenttiService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit.slice(5, 9));
  }
}
