import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../suggestion.service'
import { Suggestion } from '../suggestion'
import { AuthService } from '../auth/auth.service';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-suggestion-add',
  templateUrl: './suggestion-add.component.html',
  styleUrls: ['./suggestion-add.component.css']
})
export class SuggestionAddComponent implements OnInit {
  suggestions: Suggestion[];
  profiili: any;


  constructor(private suggestionService: SuggestionService, private auth: AuthService) { }

  ngOnInit() {


    if (this.auth.userProfile) {
      this.profiili = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profiili) => {
        this.profiili = profiili;
      });
    }
  }




  //  add(label: string, suggestion: string): void {
  //    if (!label) { return; }
  //    this.suggestionService.addSuggestion({label, suggestion, /*longitude, latitude,*/ profiili:this.profiili, draggable: false } as Suggestion)
  //      .subscribe(suggestion => {
  //        this.suggestions.push(suggestion);
  //      });
  //  }

  //  clickedMarker(label: string, index: number) {
  //    console.log(`clicked the marker: ${label || index}`)
  //  }

  //  //mapClicked($event: MouseEvent) {
  //  //  this.markers.push({
  //  //    id: "kakkaa",
  //  //    label: "hehe",
  //  //    latitude: $event.coords.lat,
  //  //    longitude: $event.coords.lng,
  //  //    draggable: true,
  //  //    profiili: 2,
  //  //    likes: 2
  //  //  });
  //  //}

  //  //markerDragEnd(m: marker, $event: MouseEvent) {
  //  //  console.log('dragEnd', m, $event);
  //  //}
  //}
}
