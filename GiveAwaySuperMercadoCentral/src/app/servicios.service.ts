import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(public http: HttpClient) {

  }
  ganadores(item:any){

  return this.http.post('https://rifas.viveporunsueno.do/php/ganador.php',item)

  }
  ganadoresInternos(item:any){

    return this.http.post('https://rifas.viveporunsueno.do/php/ganadoresInternos.php',item)

    }


  documento(){
    console.log(this.documento)
    return this.http.get('https://rifas.viveporunsueno.do/php/exportarganadores.php')

  }
}
