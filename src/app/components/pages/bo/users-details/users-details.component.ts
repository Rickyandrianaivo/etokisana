import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileItemComponent } from 'src/app/components/partials/profile-item/profile-item.component';
import { UserService } from 'src/app/services/user.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AvatarModule } from 'ngx-avatars';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [
    SideBarComponent,
    ProfileItemComponent,
    AvatarModule,
    NgIf,
  ],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.css'
})
export class UsersDetailsComponent implements OnInit{
  profileImage!:string;
  theUser : any;
  documentFile:any;
  isEntreprise:boolean = false;
  identityFileType:string = "";
  downloadLink:string = "";
  downloadableName : string = "";
  logedUser : any ;
  constructor(
    private userService:UserService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    if (this.logedUser.userAccess != "Admin") {
      this.router.navigateByUrl('home')
    }

    this.activatedRoute.params.subscribe(req=>{
      this.userService.getUserById(req['id']).subscribe(res =>{
        this.theUser = res;
        if (this.theUser.userValidated) {
          this.router.navigateByUrl('dashboard')
        }
        
        console.log(this.theUser.userType);
        if (this.theUser.userType == "Entreprise") {
          this.profileImage = this.theUser.userImage;
          this.isEntreprise = true;
          this.identityFileType = this.theUser.nif;
          this.documentFile = this.theUser.carteFiscale;
          this.downloadableName = this.theUser.raisonSociale + "_CarteFiscale";
        }else{
          this.profileImage = this.theUser.userImage;
          this.identityFileType = this.theUser.identityFileType;
          this.documentFile = this.theUser.identityDocument;
          this.downloadableName = this.theUser.userName + "_" +this.theUser.documentType;
          this.isEntreprise = false;
        }
        // create download link
        if (this.theUser.documentFile) {
          const base64Data = this.documentFile;
          const blob = this.convertBase64ToBlob(base64Data)
          this.downloadLink = window.URL.createObjectURL(blob);
          
        }
      })
    })
  } 

  ngOnInit(): void {
    
  }
  /**
 * Convert BASE64 to BLOB
  */
  private convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  ValidateRegistration(){
    this.userService.validateUser(this.theUser._id,).subscribe(_=>{
      this.router.navigateByUrl('dashboard');
    })
  }
}

