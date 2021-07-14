import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'my-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hello-world';

  apiUrl = 'https://testimonialapi.toolcarton.com/api/f';

  constructor(private httpClient: HttpClient) {
    setInterval(() => {
      this.httpClient.get(this.apiUrl).subscribe();
    }, 1000);
  }
}
