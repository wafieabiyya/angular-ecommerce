import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '@popperjs/core';
@Injectable({
  providedIn: 'root'
})
export class DropdownFormService {
  private _countriesUrl = 'http:localhost:8080/api/countries';
  private _statesUrl = 'http:localhost:8080/api/states';

  constructor(private _httpClient: HttpClient) { }

  getCountries(): Observable <Country []>{
    return this._httpClient.get<GetResponseCountries>(this._countriesUrl).pipe(
      map(response =>response._embeded.countries)
    )
  }

  getStates(theCountryCode: string): Observable <State []>{
    const searchedStateUrl = `${this._statesUrl}/search/findByCountryCode?countryCode=${theCountryCode}`
    return this._httpClient.get<GetResponseStates>(this._statesUrl).pipe(
      map(response => response._embeded.states)
    )
  }


  getCreditCardMonths(startMonth: number): Observable <number []>{
    let data: number [] = []
    for (let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth)
    }

    return of (data)
  }

  getCreditYears(): Observable<number []>{
    let data: number [] = []
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear +10;

    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear)
    }
    return of (data)
  }

 
}

interface GetResponseCountries{
  _embeded:{
    countries: Country [];
  }
}

interface GetResponseStates{
  _embeded:{
    states: State[]
  }
}