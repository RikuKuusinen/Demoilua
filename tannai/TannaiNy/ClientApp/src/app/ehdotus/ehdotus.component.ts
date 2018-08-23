import { Component, OnInit } from '@angular/core';
import { KOMMENTIT } from '../mock-kommentit';
import { Kommentti } from '../kommentti';
import { KommentitService} from '../kommentti.service'
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-ehdotus',
  templateUrl: './ehdotus.component.html',
  styleUrls: ['./ehdotus.component.css']
})
export class EhdotusComponent implements OnInit {
  kommentit: Kommentti[];
  profile: any;

  constructor(private kommentitService: KommentitService, private auth : AuthService) { }

  ngOnInit() {
    this.getKommentit();
  }

  getKommentit(): void {
    this.kommentitService.getKommentit()
      .subscribe(kommentit => this.kommentit = kommentit);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.kommentitService.addKommentti({ name } as Kommentti)
      .subscribe(kommentti => {
        this.kommentit.push(kommentti);
      });
  }

  delete(kommentti: Kommentti): void {
    this.kommentit = this.kommentit.filter(h => h !== kommentti);
    this.kommentitService.deleteKommentti(kommentti).subscribe();
  }



}
