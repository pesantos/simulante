import { DataMomentoPipe } from './pipes/data-momento.pipe';
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
    let r = this.rand(1,100);
    
    console.log("ODDS % chances",percentual,r);
    
    if(r<=percentual)return true;

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
      idade:this.rand(1,45),
      idadeAtual:0,
      etnia:globais.etnias[this.rand(0,globais.etnias.length-1)],
      beleza:this.oddsNota(),
      gordo:vGordo,
      orientacaoSexual:globais.orientacoesSexuais[this.rand(0,globais.orientacoesSexuais.length-1)],
      extratoSocial:this.geraSocial(),
      gostaDeLer:this.odds(50),
      bomAluno:this.odds(50),
      esportista:this.odds( (vGordo*10) ),
      crenca:globais.crencas[this.rand(0,globais.crencas.length-1)],
      eventos:[],
      parceiro:null,
      casado:false,
      ano:new Date(),
      doente:false,
      vivo:true

    }

    return novaPessoa;
  }

  processarAutonomo(){
    let pessoa = this.criarPessoa();
    pessoa.idadeAtual = pessoa.idade;
    do{
      pessoa = this.processarPessoa(pessoa);
    }while(pessoa.vivo==true);
    

    return pessoa;
  }

  itemAleatorio(secao){
    return globais[secao][this.rand(0,globais[secao].length-1)];
  }

  processarPessoa(pes){// executado a cada ano de vida da pessoa
    pes.ano.setFullYear(pes.ano.getFullYear() + 1);
    pes.idadeAtual++;
    pes.doente = this.possibilidadeDeAdoecer(pes);// possibilidade de ficar doente
    pes.parceiro = this.possibilidadeDeArranjarNamorado(pes);

    pes = this.possibilidadeDeMorte(pes);

    return pes;
  }


  possibilidadeDeArranjarNamorado(p){// algoritimo leva em conta beleza, classe social, sexo, orientacao sexual
    // implementar probabilidades
    // gerar o parceiro SEXO NOME e BELEZA
    // gerar um evento informando o novo par


    return null;
  }

  possibilidadeDeAdoecer(p){

    if(p.gordo>6 && p.idadeAtual>35 && this.odds(10)){
      
      p.eventos.push(this.criarEvento(p.ano,'Contraiu uma doença proveniente da obesidade'));
      return true;
    }

    if(p.orientacaoSexual=='Gay' && !p.casado && p.idadeAtual>18 && p.idadeAtual<50 && this.odds(7)){
      p.eventos.push(this.criarEvento(p.ano,'Contraiu uma doença sexualmente transmissível'));
      return true;
    }

    if(p.extratoSocial=='E' && p.idadeAtual>35 && !p.gostaDeLer && this.odds(3)){
      
      p.eventos.push(this.criarEvento(p.ano,'Contraiu uma doença por não se alimentar direito'));
      return true;
    }


    return this.odds(8);
  }

  pipe:DataMomentoPipe = new DataMomentoPipe();

  criarEvento(ano,motivo){
    
      let ev = {
        ano:this.pipe.transform(ano),
        motivo:motivo
      }

      return ev;
    
  }

  possibilidadeDeMorte(p){
    let chances = 0;
    if(p.idadeAtual>60){
      chances+=p.idadeAtual-60;
      if(chances>5)chances-=4;// fator de rebote
      console.log("logar morte");
      if(this.odds(chances)){
        p.eventos.push(this.criarEvento(p.ano,'Morreu de causas naturais aos '+p.idadeAtual+' anos.'));
        p.vivo = false;
        return p;
      }
    }
    if((p.etnia=='Negro' || p.etnia=='Pardo') && (p.extratoSocial!=='A' || p.extratoSocial!=='B') && this.odds(4) ){
        p.eventos.push(this.criarEvento(p.ano,'Morreu  '+this.itemAleatorio('mortesEtnia')+' aos '+p.idadeAtual+' anos.'));
        p.vivo = false;
        return p;

    }
    if(p.esportista)chances-=5;
    if(p.extratoSocial=='A')chances+=1;
    if(p.extratoSocial=='B')chances+=3;
    if(p.extratoSocial=='C')chances+=5;
    if(p.extratoSocial=='D')chances+=8;
    if(p.extratoSocial=='E')chances+=15;

    chances+= p.gordo;

    if(p.idadeAtual>50 && p.gordo>2 && this.odds(p.gordo)){
      p.eventos.push(this.criarEvento(p.ano,'Morreu de '+this.itemAleatorio('mortesGordura')+' aos '+p.idadeAtual+' anos.'));
        p.vivo = false;
        return p;
    }

    if(p.extratoSocial=='E' && p.idadeAtual>43 && p.doente && this.odds(9)){
      p.eventos.push(this.criarEvento(p.ano,'Morreu de '+this.itemAleatorio('mortePobreDoente')+' aos '+p.idadeAtual+' anos.'));
      p.vivo = false;
      return p;
    }

    if(p.extratoSocial=='D' && p.idadeAtual>45 && p.doente && this.odds(4)){
      p.eventos.push(this.criarEvento(p.ano,'Morreu de '+this.itemAleatorio('mortePobreDoente')+' aos '+p.idadeAtual+' anos.'));
      p.vivo = false;
      return p;
    }

    if(p.orientacaoSexual=='Gay' && p.sexo=='masculino' && !p.casado){
      let vai = false;
      if(p.extratoSocial=='A' || p.extratoSocial=='B'){
        vai = this.odds(3);
      }else{
        vai = this.odds(9);
      }

      if(vai){
        p.eventos.push(this.criarEvento(p.ano,'Morreu de '+this.itemAleatorio('mortesGay')+' aos '+p.idadeAtual+' anos.'));
        p.vivo = false;
        return p;
      }

    }
    

    
    return p;

  }


}
