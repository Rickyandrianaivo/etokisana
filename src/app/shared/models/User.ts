
export class User{
    userName            !: string;
    userFirstname       !:string;
    userPassword        !: string;
    userEmail           !: string;
    userPhone           : string = "";
    userType            : string="particulier";
    userTotalSolde      : number = 0;
    userValidated       : boolean = false;
    userEmailVerified   : boolean = false;
    userAccess          : string = "Utilisateur";
    userParainId        : string ="";
    userID              !: string;
    userAddress         !: string;
    userMainLatitude    !: string;
    userMainLongitude   !: string;
    // userDescritpion     : string ="";
    // userImage           : string ="";
    // userDateOfBirth     !: Date;
    // userLogo            : string = "";
    // userStatut          : string ="";
    // userManager         : string = "";
    // userNif             : string = "";
    // userRC              : string = "";
    // identityDocumentType: string ="";
    // identityCardNumber  : string ="";
    // userAdmin           : boolean = false;
    // userIdentityCode    : string = "";
}