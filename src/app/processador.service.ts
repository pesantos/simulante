import { Injectable } from '@angular/core';
import * as globais from './../assets/global';

@Injectable({
  providedIn: 'root'
})
export class ProcessadorService {

  constructor() { }

  rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  odds(percentual){ // dado o percentual retorna true se a probabilidade cair dentro desta porcentam, ou falso caso nao
    let r = this.rand(1,10);
    let val = percentual/10;
    let v = parseInt(val+'');
    if(r<=v)return true;

    return false;
  }

  oddsNota(){
    return this.rand(1,10);
  }

  geraSocial(){// maior chance de ser pobre no brasil
    let e = this.odds(8);
    if(e)return 'E';
    let d = this.odds(60);
    if(d)return 'D';
    let c = this.odds(50);
    if(c)return 'C';
    let b = this.odds(50);
    if(b)return 'B';

    return 'A'

  }

  criarPessoa(){
    let vSexo:any = this.odds(50)?'masculino':'feminino';
    let vNome:any = '';
    if(vSexo=='masculino'){
      vNome= globais.nomesHomens[this.rand(0,globais.nomesHomens.length-1)];
    }else{
      vNome= globais.nomesMulheres[this.rand(0,globais.nomesMulheres.length-1)];
    }

    let vGordo = this.oddsNota();

    let novaPessoa:any = {
      sexo:vSexo,
      nome:vNome,
      idade:this.rand(1,100),
      etnia:globais.etnias[this.rand(0,globais.etnias.length-1)],
      beleza:this.oddsNota(),
      gordo:vGordo,
      orientacaoSexual:globais.orientacoesSexuais[this.rand(0,globais.orientacoesSexuais.length-1)],
      extratoSocial:this.geraSocial(),
      gostaDeLer:this.odds(50),
      bomAluno:this.odds(50),
      esportista:this.odds( (vGordo*10) ),
      crenca:globais.crencas[this.rand(0,globais.crencas.length-1)],
      eventos:[]
    }

    return novaPessoa;
  }

  processarAutonomo(){
    let pessoa = this.criarPessoa();
    pessoa = this.processarPessoa(pessoa);

    return pessoa;
  }

  processarPessoa(pes){

    return pes;
  }

  


}
