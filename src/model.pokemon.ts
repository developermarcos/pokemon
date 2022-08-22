export class Pokemon{
  urlFrontImg : string;
  urlBackImg : string;
  name: string;
  especie : string;
  /**
   *
   */
  constructor(urlFrontImg : string, urlBackImg : string, name: string, especie : string) {
    this.urlFrontImg = urlFrontImg;
    this.urlBackImg = urlBackImg;
    this.name = name;
    this.especie = especie;
  }
}