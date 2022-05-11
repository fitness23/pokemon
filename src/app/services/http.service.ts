import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, map, catchError, throwError } from 'rxjs';
import { Filter } from "../interfaces/filters-interface";
import { Item } from "../interfaces/items-interface";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }
    
    getApi(){
        return "https://pokeapi.co/api/v2";
    }

    getTypes(): Observable<Filter[]> {
        return this.http.get<Filter[]>(`${this.getApi()}/type`, { responseType: 'json' }).pipe(
            catchError(err => { return this.errorHandler(err) }),
            map((res: any) => res.results));
    }

    getAbilities(): Observable<Filter[]> {
        return this.http.get<Filter[]>(`${this.getApi()}/ability`, { responseType: 'json' }).pipe(
            catchError(err => { return this.errorHandler(err) }),
            map((res: any) => res.results));
    }

    getPokemonList(searchUrl: string): Observable<Item[]> {
        return this.http.get<Item[]>(`${searchUrl}`, { responseType: 'json' }).pipe(
            catchError(err => { return this.errorHandler(err) }),
            map((res: any) => res.pokemon));
    }

    getPokemonDetail(searchUrl: string): Observable<any> {
        return this.http.get(searchUrl, { responseType: 'json', observe: 'response' });
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "server error.");
    }

}