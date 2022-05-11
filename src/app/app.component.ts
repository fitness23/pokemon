import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Item } from "./interfaces/items-interface";
import { Detail } from "./interfaces/detail-interface";
import { Filter } from "./interfaces/filters-interface";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpService, private fb: FormBuilder) {
  }

    public myForm: FormGroup = this.fb.group({});

    currentSearchUrl: string = "";
    items$ = of([]) as Observable<Item[]>;

    pokemonTypes$ = of([]) as Observable<Filter[]>;
    pokemonAbilities$ = of([]) as Observable<Filter[]>;

    detail: Detail = {};


  ngOnInit() {

    this.createForm();

    this.populateFilterLists();
    
  }


  createForm(){
    this.myForm = this.fb.group({
      types: [null],
      abilities: [null]
    });
  }


  getData() {

    this.items$ = this.httpService.getPokemonList(this.currentSearchUrl);

    }



    setSearchUrl(fieldChanged: string){
      
      if ((fieldChanged === "types"))
      {
        this.currentSearchUrl = this.myForm.value.types;
        this.myForm.controls['abilities'].patchValue(null);
      }

      if ((fieldChanged === "abilities"))
      {
        this.currentSearchUrl = this.myForm.value.abilities;
        this.myForm.controls['types'].patchValue(null);
      }

      this.getData();
    }



    populateFilterLists() {

      this.pokemonTypes$ = this.httpService.getTypes();

      this.pokemonAbilities$ = this.httpService.getAbilities();

    };


    viewPokemon(pokemonUrl: string){
      
      this.httpService.getPokemonDetail(pokemonUrl)
            .subscribe((res) => {
              console.log(res.body);
                this.detail = res.body;
                
                
                window.scroll({
                  top: 0, 
                  left: 0, 
                  behavior: 'smooth' 
                 });

            });

    }

    
}
