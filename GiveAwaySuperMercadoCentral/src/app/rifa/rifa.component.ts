import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SorteoPremiosComponent } from '../sorteo-premios/sorteo-premios.component';
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import { ServiciosService } from '../servicios.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-rifa',
  templateUrl: './rifa.component.html',
  styleUrls: ['./rifa.component.scss']
})
export class RifaComponent implements OnInit {
  arrayPremios: any = []
  arrayRank: any = []
  numero: any;
  ganador: any;
  data: any;
  id: any;
  x: any;
  ExcelData: any = []
  chosenElements: any = []
  excelFinal: any = []
  idPremio: any;
  preios: string= '';
  constructor(private route: ActivatedRoute, private Sqlservicio: ServiciosService, public router: Router,private http: HttpClient) {
    this.premios()

  }

  ngOnInit(): void {

  }
  premios() {
    this.arrayPremios = JSON.parse(localStorage.getItem("Premios")!)
    const ganador = this.arrayPremios[Math.floor(Math.random() * this.arrayPremios.length)];

  }

  selectPremio(e: Event) {
    let Id: any = ((e.target as HTMLInputElement).value);
    this.idPremio = String(Id)
    this.preios =  String(Id);
    console.log(this.idPremio)
  }
  sorteoGiveAway(item: any) {
    // Swal.showLoading(Swal.getDenyButton());
    console.log(this.excelFinal)
    this.chosenElements = []
    const cedulas = new Set()
    console.log(this.chosenElements)
    while (this.chosenElements.length < item) {
      console.log(this.chosenElements)
       const randomIndex = Math.floor(Math.random() * this.excelFinal.length)
       const randomElement = this.excelFinal[randomIndex]
       if (!cedulas.has(randomElement.Cedula)) {
           this.chosenElements.push(randomElement)
           cedulas.add(randomElement.Cedula)
       }
    }

    this.excelFinal = this.excelFinal.filter((objeto: any) => !this.chosenElements.some((o: any) => o.Cedula === objeto.Cedula));

    for (let i = 0; i < this.chosenElements.length; i++) {
      this.chosenElements[i].premio = this.idPremio

      this.Sqlservicio.ganadores(this.chosenElements[i]).subscribe((data: any) => {
      })

        this.proximoGanadorGiveAway();
        // Swal.showLoading(Swal.getDenyButton());

    }
    console.log(this.chosenElements)
  }
  sorteo(item: any) {
    // Swal.showLoading(Swal.getDenyButton());
    console.log(this.excelFinal)
    this.chosenElements = []
    const codigos = new Set()
    console.log(this.chosenElements)
    while (this.chosenElements.length < item) {
      console.log(this.chosenElements)
       const randomIndex = Math.floor(Math.random() * this.excelFinal.length)
       const randomElement = this.excelFinal[randomIndex]
       if (!codigos.has(randomElement.codigoInterno)) {
           this.chosenElements.push(randomElement)
           codigos.add(randomElement.codigoInterno)
       }

    }

    this.excelFinal = this.excelFinal.filter((objeto: any) => !this.chosenElements.some((o: any) => o.codigoInterno === objeto.codigoInterno));

    for (let i = 0; i < this.chosenElements.length; i++) {
      this.chosenElements[i].premio = this.idPremio
      this.Sqlservicio.ganadoresInternos(this.chosenElements[i]).subscribe((data: any) => {
        console.log(data)
      })

        this.proximoGanadorGiveAway();
        // Swal.showLoading(Swal.getDenyButton());

    }
    console.log(this.chosenElements)
  }
  ReadExcel(event: any) {

    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary', cellText: true });
      var sheetNames = workBook.SheetNames;

      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

      this.ExcelData.forEach((element: any) => {
        let datoFinal =
        {
          Boleta: element.Boleta,
          Cedula: String(element.Cedula),
          Factura: element.Factura,
          Fecha: element.Fecha,
          Nombre: element.Nombre,
          Telefono: element.Telefono,
          premio: this.idPremio,
          No1: 0
        }
        this.excelFinal.push(datoFinal)
        console.log(this.excelFinal)
      });
    }
  }

  ReadExcelInterno(event: any) {

    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary', cellText: true });
      var sheetNames = workBook.SheetNames;

      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])

      this.ExcelData.forEach((element: any) => {
        let datoFinal =
        {
          Fecha: element.Fecha,
          nombre: element.nombre,
          premio: this.idPremio,
          codigoInterno: element.codigoInterno
        }
        this.excelFinal.push(datoFinal)
        console.log(this.excelFinal)
      });
    }
  }

  proximoGanadorGiveAway() {
    // Swal.showLoading(Swal.getDenyButton());

    setTimeout(() => {
      let indexGanador = 0;
      let self = this;
      function mostrarAlerta(i: any) {
        if (i < self.chosenElements.length) {
          setTimeout(() => {
            // Swal.showLoading(Swal.getDenyButton());

          Swal.fire({
            title: '<h1>' + '<b>SUPERMERCADO CENTRAL TE PREMIA!!</b>' + '</h1>' +'<br>'+ '<h1>' + '<b>GANADOR  #</b>' + (i + 1) +'<br>'+'<br>'+'<b>Premio' +'<br>'+'<h1>'+self.chosenElements[i].premio +'</h1>'+'</h1>' +'<br>',
            width: 1200,
            padding: '7em',
            html: '<h1>' + '<b>Nombre:</b>' + '</h1>' + '<h1>' + self.chosenElements[i].Nombre + '</h1>' + '<br>' + '<h1>'+'<b>Boleta:</b>'+'</h1>' + '<h1>' + self.chosenElements[i].Boleta + '</h1>' + '<h1>' + '<br>' + '<h1>' + '<b>Cedula:</b>' + '</h1>' + '<h1>' + self.chosenElements[i].Cedula.substr(0, 3) + "******" + self.chosenElements[i].Cedula.substr(self.chosenElements[i].Cedula.length - 3) + '</h1>' + '<br>' + '<h1>' + '<b>Factura:</b>' + '</h1>' + '<h1>' + self.chosenElements[i].Factura + '</h1>' + '<br>' + '<h1>' + '<b>Teléfono:</b>' + '</h1>' + '<h1>' + self.chosenElements[i].Telefono.substr(0, 3) + "******" + self.chosenElements[i].Telefono.substr(self.chosenElements[i].Telefono.length - 3) + '</h1>',
            color: '#218e27',
            background: '#fff url(assets/confetti.gif)',
            backdrop: `
                rgba(0,0,123,0.4)
                  url("https://i.gifer.com/W9k1.gif")
                `,
            confirmButtonText: '<h3>' + 'Siguiente Ganador' +'<h3>',
          }).then(() => {
            mostrarAlerta(i + 1)
          })
        },1000);
        }
      }
      // Swal.showLoading(Swal.getDenyButton());

      mostrarAlerta(indexGanador)
    }, 1000);
  }

  ir(e:any){
    if(e==1){
      this.router.navigateByUrl('/menu')
    }
  }
}




