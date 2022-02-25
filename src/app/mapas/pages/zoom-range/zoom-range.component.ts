import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor() {}

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -58.20388025208802 , -26.18991188567927 ],
      zoom: 15
    });

  }

  zoomOut(){
    // console.log(this.divMapa)
    this.mapa.zoomOut()
  }

  zoomIn(){
    this.mapa.zoomIn()    
  }
}
