import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kommentti } from '../kommentti';

import { KommentitService} from '../kommentti.service'
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';


/**
 * <like [totalLikes]="post.totalLikes" [iLike]="post.iLike" (change)="oniLikeChange($event)"></like>
 */
//jos tälle tehdään oma komponentti niin selectoriksi tulee 'like' ja ylläolevalla koodinpätkällä saadaan total tykkäykset laskettua.


@Component({
  selector: 'app-ehdotus',
  templateUrl: './ehdotus.component.html',
  styleUrls: ['./ehdotus.component.css']
})
export class EhdotusComponent implements OnInit {
  profiilis: ProfileComponent[];
  kommentit: Kommentti[];
  profiili: any;


  constructor(private kommentitService: KommentitService, private auth : AuthService) { }
 @Input() totalLikes = 0;
  @Input() iLike = false;

  @Output() change = new EventEmitter();

  onClick() {
    this.iLike = !this.iLike;
    this.totalLikes += this.iLike ? 1 : -1;
    this.change.emit({ newValue: this.iLike, newTotal: this.totalLikes });
  }
  // tässä tykkäysnapin counteri


  ngOnInit() {
    this.getKommentit();

      if (this.auth.userProfile) {
        this.profiili = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profiili = profile;
        });
      }
    }
  

  getKommentit(): void {
    this.kommentitService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit);
  }

  add(name: string, profiili: any ): void {
    name = name.trim();
    if (!name) { return; }
    this.kommentitService.addKommentti({ name, profiili: this.profiili } as Kommentti)
      .subscribe(kommentti => {
        this.kommentit.push(kommentti);
      });
  }

  delete(kommentti: Kommentti): void {
    this.kommentit = this.kommentit.filter(h => h !== kommentti);
    this.kommentitService.deleteKommentti(kommentti).subscribe();
  }



}
