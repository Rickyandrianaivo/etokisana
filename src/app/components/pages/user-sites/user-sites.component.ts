import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { SiteService } from 'src/app/services/site.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Site } from 'src/app/shared/models/Sites';
import { GoogleMapsModule} from '@angular/google-maps';
import { NgFor } from '@angular/common';
import * as l from 'leaflet' ;
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-sites',
  standalone: true,
  imports: [
    HeaderComponent,
    DefaultButtonComponent,
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatTableModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './user-sites.component.html',
  styleUrl: './user-sites.component.css'
})
export class UserSitesComponent implements OnInit{
  isSubmitted = false;
  addSiteForm!: FormGroup;
  newSite:any;
  currentUser:any;
  sites:any[]=[];
  latitude:number=0;
  longitude:number=0;
  siteId:string|undefined;
  displayedColumns: string[] = ['Nom du Site','Adresse', 'Latitude', 'Longitude','Action'];
  // display: any;
  // center: google.maps.LatLngLiteral = { lat: -18.809381, lng: 47.560713};
  // markerLatLong: google.maps.LatLngLiteral[] = [
  //   { lat: 23.0557, lng: 72.4687 },
  //   { lat: 23.0504, lng: 72.4991 },
  // ];
  // zoom = 6;

  // leafletmap
  map:any;

  siteToUpdate:any;

  constructor(
    private router:Router,
    private siteService:SiteService,
    private formBuilder:FormBuilder,
    private userService:UserService,
  ){
    this.currentUser = this.userService.getUserFromLocalStorage();
    console.log(this.currentUser._id);
    this.siteService.getSiteByUserId(this.currentUser._id).subscribe(mesSite =>{
      console.log(mesSite)
      if (mesSite) {
        this.sites=mesSite;        
      }
    // this.siteService.getAll().subscribe(mesSites =>{
    //   this.sites = mesSites
    })
  }

  ngOnInit() : void{
    this.configMap()

    this.addSiteForm = this.formBuilder.group({
      siteName:[''],
      siteAddress:['',Validators.required],
    })
  }
  configMap(){
    this.map = l.map('map',{
      center : [-18.809381 ,47.560713],
      zoom : 6
    }).setView([-18.809381 ,47.560713]);
    
    l.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.map)
    let marker :any  = null
    this.map.on('click', (event:any)=>{
      // console.log(event)

      if(marker !==null){
        this.map.removeLayer(marker);
      }
      marker = l.marker([event.latlng.lat,event.latlng.lng]).addTo(this.map);
      this.latitude=event.latlng.lat;
      this.longitude=event.latlng.lng;
    })
  }
  get fc(){
    return this.addSiteForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addSiteForm.invalid){ 
        console.log(this.addSiteForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addSiteForm.value;
    console.log(fv.userName);
    this.newSite = {
      siteName        :fv.siteName,
      siteAddress     :fv.siteAddress,
      siteLat         :this.latitude,
      siteLng         :this.longitude,
      siteUserId      :this.currentUser._id,
    };
    // console.log(this.user);
    if (!this.siteId) {
      this.siteService.addSite(this.newSite).subscribe(serverSite => {
        console.log(serverSite);
        alert("Ajout d'un site avec succès!");
        this.router.navigateByUrl("/user-site");
      })      
    }else{
      this.siteService.update(this.newSite,this.siteId).subscribe(serverSite =>{
        console.log(serverSite)
        alert("Site mis à jour !");
        window.location.reload();
      })
    }
  }
  // moveMap(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.center = 
  //   (event.latLng.toJSON());
  // };
  // move(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.display = 
  //   (event.latLng.toJSON());
  // };
  deleteSite(siteId:string){
    this.siteService.deleteSite(siteId).subscribe(vide =>{
      console.log(vide)
      alert("site supprimé");
      window.location.reload();
    });
  }
  setDataToModify(siteId:string){
    this.siteId = siteId;
    console.log(this.siteId)
    this.siteService.getSiteById(siteId).subscribe(siteToModify=>{
      this.siteToUpdate = siteToModify
      this.addSiteForm = this.formBuilder.group({
        siteName:[siteToModify.siteName],
        siteAddress:[siteToModify.siteAddress],
      })
      if (siteToModify) {
        this.latitude = siteToModify.siteLat;
        this.longitude = siteToModify.siteLng;
        let marker = l.marker([siteToModify.siteLat,siteToModify.siteLng]).addTo(this.map);
        this.map.on('click', (event:any)=>{
          // console.log(event)

          if(marker !==null){
            this.map.removeLayer(marker);
          }
          marker = l.marker([event.latlng.lat,event.latlng.lng]).addTo(this.map);
          this.latitude=event.latlng.lat;
          this.longitude=event.latlng.lng;
        })
      }
    })
  }
}
