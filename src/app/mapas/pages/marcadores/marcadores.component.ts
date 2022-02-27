import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string; 
  marcador: mapboxgl.Marker
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .list-group {
      position:fixed;
      top: 20px; 
      right: 20px;
      z-index: 99;
      cursor: pointer;
    }


    .mapa-container{
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [ -58.20388025208802 , -26.18991188567927 ];
  marcadores: MarcadorColor[] = []


  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    

    // new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)

  }

  agregarMarcador(){

    // Color hexadecimal aleatorio 
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const marcador = new mapboxgl.Marker({
      color,
      draggable: true
    })
      .setLngLat(this.mapa.getCenter())
      .addTo(this.mapa)

    this.marcadores.push({ color, marcador })
  }

  irMarcador(marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat(),
      zoom: 16
    })
  }

}
