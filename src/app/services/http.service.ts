import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getApi()
    {
        return "https://pokeapi.co/api/v2/";
    }

    getTypes(): Observable<any> {
        return this.http.get("" + this.getApi() + "type", { responseType: 'json', observe: 'response' });
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