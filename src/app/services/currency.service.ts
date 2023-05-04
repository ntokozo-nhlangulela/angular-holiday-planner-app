import { Injectable } from '@angular/core';
import {Currency} from "../models/currency";
import {of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor() { }
getCurrency(){
  const currencies : Currency[] =[];
  fetch('https://api.exchangerate.host/latest?base=ZAR')
    .then((response)=> response.json())
    .then((response)=> {
      for (const [key, value] of Object.entries(response.rates)) {
        currencies.push(<Currency>{key, value})
      }
  })
return of (currencies)
}
}
