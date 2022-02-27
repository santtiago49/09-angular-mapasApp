import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string; 
  marker?: mapboxgl.Marker;
  centro?: [number, number];
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

    this.leerLocalStorage();
    
    

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

    this.marcadores.push({ color, marker: marcador })

    this.guardarMarcadoresLocalStorage();
    
    marcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()
    })
    
  }

  irMarcador(marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat(),
      zoom: 16
    })
  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat()

      lngLatArr.push({
        color: color,
        centro: [ lng,lat ],
      })

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr))

    })

  }

  leerLocalStorage(){

    if( !localStorage.getItem('marcadores') ){
      return
    }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      }).setLngLat(m.centro!).addTo(this.mapa)

        
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage()
      })
        
    })
  }

}
