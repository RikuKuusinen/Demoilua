import { Component, OnInit, Input } from '@angular/core';
import { Suggestion } from '../suggestion'

import { Location } from '@angular/common';

import { SuggestionService } from '../suggestion.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  @Input() suggestion: Suggestion[];
  constructor(
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private location: Location
  ) { }



  ngOnInit(): void {
    this.getSuggestion();
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
}

