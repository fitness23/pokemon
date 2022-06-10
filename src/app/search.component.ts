import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Item } from "./interfaces/items-interface";
import { Detail } from "./interfaces/detail-interface";
import { Filter } from "./interfaces/filters-interface";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private httpService: HttpService, private fb: FormBuilder) { }

    public myForm: FormGroup = this.fb.group({});

    currentSearchUrl: string = "";
    items$ = of([]) as Observable<Item[]>;

    pokemonTypes$ = of([]) as Observable<Filter[]>;
    pokemonAbilities$ = of([]) as Observable<Filter[]>;

    specificPokemonDetail$ = of({}) as Observable<Detail>;



  ngOnInit(): void {

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


    scrollPage(){
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
       });
    }


    viewPokemon(pokemonUrl: string){

      this.specificPokemonDetail$ = this.httpService.getPokemonDetail(pokemonUrl).pipe(tap(this.scrollPage));
      
      /*this.httpService.getPokemonDetail(pokemonUrl)
            .subscribe((res) => {
              console.log(res.body);
                this.detail$ = res.body;
                
                
                window.scroll({
                  top: 0, 
                  left: 0, 
                  behavior: 'smooth' 
                 });

            });*/

    }

}
