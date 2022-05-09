import { Component, OnInit } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Item } from "./interfaces/items-interface";
import { Detail } from "./interfaces/detail-interface";
import { Filter } from "./interfaces/filters-interface";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpService, private fb: FormBuilder) {
  }

    public myForm: FormGroup = this.fb.group({});

    currentSearchUrl: string = "";
    items: Item[] = [];

    pokemonTypes: Filter[] = [];
    pokemonAbilities: Filter[] = [];

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

        this.httpService.getPokemonList(this.currentSearchUrl)
            .subscribe((res) => {
                this.items = res.body.pokemon;
                console.log(this.items);
            });

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

      this.httpService.getTypes()
      .subscribe((res) => {
          this.pokemonTypes = res.body.results;
      });

      this.httpService.getAbilities()
      .subscribe((res) => {
          this.pokemonAbilities = res.body.results;
      });

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
