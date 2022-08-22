import _, { create } from "lodash";
import axios, {AxiosResponse} from 'axios';
import { Pokemon } from "./model.pokemon.js";
class Pesquisa{
  btnPesquisar : HTMLButtonElement;
  inputPesquisar: HTMLInputElement;
  apiUrl = "https://pokeapi.co/api/v2/pokemon";
  divApresentarPokemon: HTMLDivElement;
  
  constructor(){
    this.btnPesquisar = document.getElementById('btn-pesquisar') as HTMLButtonElement;
    this.inputPesquisar = document.getElementById('input-pesquisar') as HTMLInputElement;
    this.divApresentarPokemon = document.getElementById('apresentar-pokemon') as HTMLDivElement;
    this.configurarEventos();
  }
  configurarEventos() {
    this.btnPesquisar.addEventListener('click', (_evt)=>{
        _evt.preventDefault();
        if(this.inputPesquisar.value){
          this.obterPokemonJson(this.inputPesquisar.value.toLowerCase());
        }
    });
    
  }
  async obterPokemonJson(pesquisa : string){
    try{
      const reposta = await axios.get(`${this.apiUrl}/${pesquisa}`, {responseType: "json"});
      const pokemonEncontradoJson = reposta.data;
      const urlFrontImg = pokemonEncontradoJson['sprites'].front_default as string;
      const urlBackImg = pokemonEncontradoJson['sprites'].back_default as string;
      const name = pokemonEncontradoJson.name;
      const especie = pokemonEncontradoJson['species'].name;

      const pokemonEncontrado = new Pokemon(urlFrontImg, urlBackImg, name, especie);
      
      this.apresentarPokemon(pokemonEncontrado);
    }
    catch(err){
      this.divApresentarPokemon.innerHTML = '';
      const msgErro = document.createElement('h3');
      msgErro.innerText = `Não foi possível encontrar o pokemon '${pesquisa.toLocaleUpperCase()}'`;
      msgErro.style.color = 'red';
      this.divApresentarPokemon.append(msgErro);
      this.divApresentarPokemon.style.display = 'block';
    }
  }
  apresentarPokemon(pokemon : Pokemon):void{
    this.divApresentarPokemon.innerHTML = '';
    
    const nome = document.createElement('h3');
    nome.innerText = `Nome: ${pokemon.name}`;
    this.divApresentarPokemon.append(nome);

    const especie = document.createElement('span');
    especie.innerText = `Espécie: ${pokemon.especie}`;
    this.divApresentarPokemon.append(especie);

    const frontImage = document.createElement('img');
    frontImage.setAttribute('src', pokemon.urlFrontImg);
    this.divApresentarPokemon.append(frontImage);

    const backImage = document.createElement('img');
    backImage.setAttribute('src', pokemon.urlBackImg);
    this.divApresentarPokemon.append(backImage);

    const divImagens = document.createElement('div');
    divImagens.append(frontImage);
    divImagens.append(backImage);
    this.divApresentarPokemon.append(divImagens);

    this.divApresentarPokemon.style.display = 'block';
  }
}
new Pesquisa();