import { Component, OnInit } from '@angular/core';
import { HttpService } from "./services/http.service";

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {
  
  waterPokemon$ = this.httpService.getWaterPokemon();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    

  }

}
