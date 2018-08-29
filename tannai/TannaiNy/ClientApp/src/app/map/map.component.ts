import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SuggestionService } from '../suggestion.service';
import { Suggestion } from '../suggestion';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  markers: Suggestion[] = [];
  suggestions: Suggestion[];
  profiili: any;
  vittutaulukko = [];


  constructor(private suggestionService: SuggestionService, public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions(): void {
    this.suggestionService.getSuggestions()
      .subscribe(markers => this.markers = markers);
  }


  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  latitude: number = 60.16143582626223;
  longitude: number = 24.833985376717465;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    console.log(this.vittutaulukko)
   this.vittutaulukko.push({
  //  //  id: "kakkaa",
  //  //  label: "hehe",
      latitude : $event.coords.lat,
      longitude : $event.coords.lng,
  //  //  draggable: true,
  //  //  profiili: 2,
  //  //  likes: 2
     
   });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  mapLicked($event: MouseEvent) {
    this.parkers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      label: "Tänne uusi ehdotus",
      draggable: true
    });
  }
 

  parkers: marker[] = [
    {
        latitude: 60.159081131728556,
        longitude: 24.722763515543306,
        label: 'Tänne thai-hieronta',
        draggable: false
  },
  ]

  //  markers: Suggestion[] = [

  //  //// Marker array comes from db and displays automatically in map
  //    //{
  //    //  lat: 60.159081131728556,
  //    //  lng: 24.722763515543306,
  //    //  label: 'Tänne thai-hieronta',
  //    //  draggable: false
  //    //},
  //    //{
  //    //  lat: 51.373858,
  //    //  lng: 7.215982,
  //    //  label: 'B',
  //    //  draggable: false
  //    //},
  //    //{
  //    //  lat: 51.723858,
  //    //  lng: 7.895982,
  //    //  label: 'C',
  //    //  draggable: true
  //    //}
  //  ]
  ////}

  // just an interface for type safety.
 
add(label: string, suggestion: string): void {
  if(!label) { return; }
  this.suggestionService.addSuggestion({ label, suggestion, longitude: this.vittutaulukko[this.vittutaulukko.length - 1].longitude, latitude:this.vittutaulukko[this.vittutaulukko.length-1].latitude, profiili: this.profiili, draggable: false } as Suggestion)
    .subscribe(suggestion => {
      this.suggestions.push(suggestion);
    });
}
  }
interface marker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}


