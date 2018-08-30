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

  show: boolean = false;


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
        latitude: -30.159081131728556,
        longitude: 2.722763515543306,
        label: '',
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
  this.suggestionService.addSuggestion({ label, suggestion, longitude: this.vittutaulukko[this.vittutaulukko.length - 1].longitude, latitude:this.vittutaulukko[this.vittutaulukko.length-1].latitude, profiili: this.auth.userProfile, draggable: false } as Suggestion)
    .subscribe(suggestion => {
      this.suggestions.push(suggestion);
    });
  }

  public icon1 = {
    url: ("http://i65.tinypic.com/2i9oy76.jpg"),
    scaledSize: {
      height: 80,
      width: 80
    }
  };

  public icon2 = {
    url: ("http://i63.tinypic.com/11v1obl.jpg"),
    scaledSize: {
      height: 80,
      width: 80
    }
  };

public customStyle =
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#1691ad"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ff6222"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]
}


interface marker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}


