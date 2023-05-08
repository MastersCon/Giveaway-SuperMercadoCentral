import { ServiciosService } from './../servicios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from "xlsx";
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sorteo-premios',
  templateUrl: './sorteo-premios.component.html',
  styleUrls: ['./sorteo-premios.component.scss']
})
export class SorteoPremiosComponent implements OnInit {
  public ExcelData: any;
  arrayExportar:any = []
  Clasificacion = { a: "1ro", b: "2do", c: "3ro", d: "4to", e: "5to" };



  constructor(public router: Router, private Sqlservicio: ServiciosService ) {
    this.Exportar()
  }

  ngOnInit(): void {
  }
  fileName= 'ExcelSheet.xlsx';


  exportexcel(){
      /* table id is passed over here */
      let element = document.getElementById('htmlData');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
   }

  setData(item: any) {
    item = this.ExcelData;
  }
  getData() {
    return this.ExcelData;
  }
  IR() {
    this.router.navigateByUrl('/rifa')

  }

  IREmpleado() {
    this.router.navigateByUrl('/rifa-empleados')

  }


  SorteosFinal() {
    this.router.navigate(['/mant-premios']);
    localStorage.setItem('Rank', JSON.stringify(this.Clasificacion));
  }

  Exportar(){
    this.Sqlservicio.documento().subscribe((data: any) => {
      this.arrayExportar = data
      console.log(this.arrayExportar)
    })
  }


  ir(e:any){
    if(e==1){
      this.router.navigateByUrl('/menu')
    }
  }
}
