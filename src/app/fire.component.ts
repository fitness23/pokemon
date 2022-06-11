import { Component } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.scss']
})
export class FireComponent {
  
  items$ = of([]) as Observable<any[]>;

  constructor(private httpService: HttpService) { }
  
  getFirePokemon()
  {
    this.items$ = this.httpService.getFirePokemon();
  }

}