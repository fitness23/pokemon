import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { share, timer, tap, map, ReplaySubject, pipe, shareReplay, BehaviorSubject, Observable, catchError, throwError, of } from 'rxjs';
import { Filter } from '../interfaces/filters-interface';
import { Item } from '../interfaces/items-interface';

@Injectable()
export class HttpService {

    cachedWaterPokemons$?: Observable<Filter[]>;

    constructor(private http: HttpClient) {
    }
    
    getApi(){
        return "https://pokeapi.co/api/v2";
    }

    getTypes(): Observable<Filter[]> {
        return this.http
          .get<Filter[]>(`${this.getApi()}/type`, { responseType: 'json' })
          .pipe(
            catchError((err) => {
              return this.errorHandler(err);
            }),
            map((res: any) => res.results)
          );
      }
    
      getAbilities(): Observable<Filter[]> {
        return this.http
          .get<Filter[]>(`${this.getApi()}/ability`, { responseType: 'json' })
          .pipe(
            catchError((err) => {
              return this.errorHandler(err);
            }),
            map((res: any) => res.results)
          );
      }
    
      getWaterPokemon(): Observable<Filter[]> {
        if (!this.cachedWaterPokemons$) {
          this.cachedWaterPokemons$ = this.http
            .get<Filter[]>(`${this.getApi()}/type/5`, { responseType: 'json' })
            .pipe(
              map((clients: any) =>
                clients.pokemon.map((client: any) => client.pokemon)
              ),
              shareReplay(1)
            );
        }
        return this.cachedWaterPokemons$;
      }
    
      getPokemonList(searchUrl: string): Observable<Item[]> {
        return this.http.get<Item[]>(`${searchUrl}`, { responseType: 'json' }).pipe(
          catchError((err) => {
            return this.errorHandler(err);
          }),
          map((res: any) => res.pokemon)
        );
      }
    
      getPokemonDetail(searchUrl: string): Observable<any> {
        return this.http.get(searchUrl, {
          responseType: 'json',
          observe: 'response',
        });
      }
    
      errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'server error.');
      }

}