import { Suggestion } from '../suggestion'

import { Location } from '@angular/common';

import { SuggestionService } from '../suggestion.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kommentti } from '../kommentti';

import { KommentitService } from '../kommentti.service'
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { SuggestionDetailsComponent } from '../suggestion-details/suggestion-details.component';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  profiilis: ProfileComponent[];
  kommentit: Kommentti[];
  profiili: any;

  @Input() suggestion: Suggestion[];
  constructor(
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private location: Location,
    private kommentitService: KommentitService,
    private auth: AuthService
  ) { }
  @Input() totalLikes = 0;
  @Input() iLike = false;
  @Output() change = new EventEmitter();


  show: boolean = false;


  ngOnInit(): void {
    this.getSuggestion();

    this.getKommentit();

    if (this.auth.userProfile) {
      this.profiili = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profiili = profile;
      });
    }
  }

  comment() {


  }

  getSuggestion(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.suggestionService.getSuggestion(id)
      .subscribe(suggestion => this.suggestion = suggestion[0]);
    console.log(this.suggestion[0])
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.suggestionService.updateSuggestion(this.suggestion[0])
      .subscribe(() => this.goBack());
  }


  getKommentit(): void {
    this.kommentitService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit);
  }

  add(comment: string, suggestionId: string): void {
    if (!comment) { return; }
    this.kommentitService.addKommentti({ comment, suggestionId, profiili: this.auth.userProfile } as Kommentti)
      .subscribe(kommentti => {
        this.kommentit.push(kommentti);
      });
  }

  delete(kommentti: Kommentti): void {
    this.kommentit = this.kommentit.filter(h => h !== kommentti);
    this.kommentitService.deleteKommentti(kommentti).subscribe();
  }



}
