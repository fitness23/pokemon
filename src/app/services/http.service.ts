import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { share, timer, tap, map, ReplaySubject, pipe, shareReplay, BehaviorSubject, Observable, catchError, throwError, of } from 'rxjs';
import { Filter } from '../interfaces/filters-interface';
import { Item } from '../interfaces/items-interface';
import { NgHttpCachingHeaders } from 'ng-http-caching';


@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
    }

    getDelayApi(){
      return "https://deelay.me/1000/";
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
        return this.http
            .get<Filter[]>(`${this.getApi()}/type/11`,  { responseType: 'json', headers: {
              [NgHttpCachingHeaders.LIFETIME]: (1000 * 10).toString(), // cache for 10 seconds
            } })
            .pipe(
              catchError((err) => {
                return this.errorHandler(err);
              }),
              map((clients: any) =>
                clients.pokemon.map((client: any) => client.pokemon)
              )
            );
      }

      getFirePokemon(): Observable<Filter[]> {
        return this.http
            .get<Filter[]>(`${this.getDelayApi()}${this.getApi()}/type/10`,  { responseType: 'json' })
            .pipe(
              catchError((err) => {
                return this.errorHandler(err);
              }),
              map((clients: any) =>
                clients.pokemon.map((client: any) => client.pokemon)
              )
            );
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
        return this.http
          .get<Filter[]>(`${searchUrl}`, { responseType: 'json' })
          .pipe(
            catchError((err) => {
              return this.errorHandler(err);
            })
          );
      }
    
      errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'server error.');
      }

}