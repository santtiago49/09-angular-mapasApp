import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;


      z-index: 999999;
      position: fixed;  
      width: 400px;
      padding: 5px;
      border-radius: 5px;
      bottom: 50px;
      left: 40px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ -58.20388025208802 , -26.18991188567927 ];


  constructor() {}

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // config listeners
    this.mapa.on('zoom', (ev) => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual
    })

    this.mapa.on('zoomend', (ev) => {
      if( this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18)
      }
    })

    this.mapa.on('move', (evento) => {
      const target = evento.target;

      const { lng, lat } = target.getCenter()

      this.center = [ lng, lat ]
    })

    }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
  }

}
