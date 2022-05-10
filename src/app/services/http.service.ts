import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from 'rxjs';
import { Filter } from "../interfaces/filters-interface";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }


    
    getApi(){
        return "https://pokeapi.co/api/v2/";
    }

    getTypes(): Observable<Filter[]> {
        return this.http.get<Filter[]>("" + this.getApi() + "type", { responseType: 'json', observe: 'response' }).pipe(map((res: any) => res.body.results));
    }

    getAbilities(): Observable<any> {
        return this.http.get("" + this.getApi() + "ability", { responseType: 'json', observe: 'response' });
    }

    getPokemonList(searchUrl: string): Observable<any> {
        return this.http.get(searchUrl, { responseType: 'json', observe: 'response' });
    }

    getPokemonDetail(searchUrl: string): Observable<any> {
        return this.http.get(searchUrl, { responseType: 'json', observe: 'response' });
    }

}