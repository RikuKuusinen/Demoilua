import { Suggestion } from '../suggestion'

import { Location } from '@angular/common';

import { SuggestionService } from '../suggestion.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kommentti } from '../kommentti';

import { KommentitService } from '../kommentti.service'
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  profiilis: ProfileComponent[];
  kommentit: Kommentti[];
  profiili: any;

  @Input() suggestion: Suggestion[];
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private location: Location,
    private kommentitService: KommentitService
    
  ) { auth.handleAuthentication();}
  //@Input() totalLikes = 0;
  //@Input() iLike = false;
  //@Output() change = new EventEmitter();


  show: boolean = false;


  ngOnInit(): void {
    this.getCommentsBySuggestionId();
    this.getSuggestion();
   
    
   

    if (this.auth.userProfile) {
      this.profiili = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profiili = profile;
      });
    }
  }

  updateLikes(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let likes = this.suggestion["likes"] = this.suggestion["likes"] + 1;
    this.suggestionService.updateLikes(id, likes)
      .subscribe(suggestion => this.suggestion = suggestion);
    console.log(this.suggestion)

  }

  getKommentit(): void {
    console.log(this.kommentit)
    this.kommentitService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit);
  }

  getCommentsBySuggestionId(): void {
    let SuggestionId = this.route.snapshot.paramMap.get('id');
    this.kommentitService.getCommentsBySuggestionId(SuggestionId)
      .subscribe(kommentit => this.kommentit = kommentit);
    console.log(this.kommentit)


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



/**
 * <like [totalLikes]="post.totalLikes" [iLike]="post.iLike" (change)="oniLikeChange($event)"></like>
 */
//jos tälle tehdään oma komponentti niin selectoriksi tulee 'like' ja ylläolevalla koodinpätkällä saadaan total tykkäykset laskettua.






  //onClick() {
  //  this.iLike = !this.iLike;
  //  this.totalLikes += this.iLike ? 1 : -1;
  //  this.change.emit({ newValue: this.iLike, newTotal: this.totalLikes });
  //}
  // tässä tykkäysnapin counteri






 
