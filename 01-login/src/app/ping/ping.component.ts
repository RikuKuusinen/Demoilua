import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent {

  API_URL: string = 'http://<your-application-domain>/api';
  message: string;

  constructor(public http: HttpClient) { }

  public securedPing(): void {
    this.message = '';
    this.http
      .get<IApiResponse>(`${this.API_URL}/private`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedScopedPing(): void {
    this.message = '';
    this.http
      .get<IApiResponse>(`${this.API_URL}/private-scoped`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }
}