import _ from "lodash";
class Pokemon{
  btnPesquisar : HTMLButtonElement;
  inputPesquisar: HTMLInputElement;
  
  constructor(){
    this.btnPesquisar = document.getElementById('btn-pesquisar') as HTMLButtonElement
    this.inputPesquisar = document.getElementById('input-pesquisar') as HTMLInputElement
    this.configurarEventos();
  }
  configurarEventos() {
    console.log("aqui");
    this.btnPesquisar.addEventListener('submit', (_evt)=>{
        _evt.preventDefault();
        console.log('pesquisar '+this.inputPesquisar.value);
    });
    
  }
}
new Pokemon();