import { ProcessadorService } from './../processador.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  constructor(private proc:ProcessadorService) { }

  ngOnInit() {
  }

  resultado:any;

  simular(){
    console.log("simulando")
    this.resultado = this.proc.processarAutonomo();
  }

}
