import { Component, OnInit } from '@angular/core';
import * as l from 'leaflet' ;
import { HeaderComponent } from '../../partials/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/services/site.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-depot-sites',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './depot-sites.component.html',
  styleUrl: './depot-sites.component.css'
})
export class DepotSitesComponent implements OnInit{
  sites:any[]=[];
  latitude:number=0;
  longitude:number=0;
  displayedColumns: string[] = ['Nom du Site','Adresse', 'Latitude', 'Longitude','Action'];
  map:any;
  marker:any = null;
  prestataireId!:string;
  typeES !: string;

  constructor(
    private router:Router,
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params =>{
      this.prestataireId = params['id'];
      this.typeES = params["typeES"];
      console.log(this.typeES);
    })
    this.siteService.getSiteByUserId(this.prestataireId).subscribe(mesSite =>{
      if (mesSite) {
        this.sites=mesSite;        
      }
    })
  }
  ngOnInit() : void{
    this.configMap()
  }

  configMap(){
      this.map = l.map('map',{
        center : [-18.8093810000000 ,47.5607130000000],
        zoom : 6
      }).setView([-18.8093810000000 ,47.5607130000000]);
      
      l.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(this.map)
      // let marker :any  = null
      this.map.on('click', (event:any)=>{
        if(this.marker !==null){
          this.map.removeLayer(this.marker);
        }
        this.marker = l.marker([event.latlng.lat,event.latlng.lng]).addTo(this.map);
        this.latitude=event.latlng.lat;
        this.longitude=event.latlng.lng;
      })
    }
    localise(lat:any,lng:any){
      this.latitude = lat;
      this.longitude = lng
      if (this.marker !== null) {
            this.map.removeLayer(this.marker)
          }
          this.marker = l.marker([this.latitude,this.longitude]).addTo(this.map);
          this.map.setView([this.latitude,this.longitude],2000)
    }
    chooseSite(siteId:string){
      this.router.navigateByUrl("/choix-produit/"+this.typeES+"/"+siteId)
    }
}
