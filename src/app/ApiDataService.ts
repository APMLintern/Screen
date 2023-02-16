import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private data: any;

  constructor(private http: HttpClient) {}

  fetchData() {
    if (this.data) {
      return of(this.data);
    } else {
        var data = JSON.stringify({
            "filters": {
              "shipmentStatus": [
                "Planned",
                "Created"
              ],
              "customer": [
                "SIEMENS HEALTHCARE PRIVATE LIMITED"
              ]
            }
          });
          
          const headers = new HttpHeaders().set( 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw','Authorization'
      
          );
      
      
      return  this.http.post('https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2', data, { headers })
      .pipe(tap((data: any) => this.data = data));
    }
  }
}
