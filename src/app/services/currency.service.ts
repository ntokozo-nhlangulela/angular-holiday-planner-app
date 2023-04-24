import { Injectable } from '@angular/core';
import {Currency} from "../models/currency";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
getCurrency(){
  const currency : Currency[] =[];
  fetch('https://api.exchangerate.host/latest?base=ZAR')
    .then((response)=> response.json())
    .then((response)=> {
      for (const [key, value] of Object.entries(response.rates)) {
        currency.push(<Currency>{key, value})
        //console.log(`${key}: ${value}`);
      }
      //console.log(response.rates)
  })
  console.log(currency)
return of (currency)
}
  constructor() { }
}
