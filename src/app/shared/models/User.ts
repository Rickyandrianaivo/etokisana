
export class User{
    userName            !: string;
    userFirstname       !:string;
    userPassword        !: string;
    userEmail           !: string;
    userPhone           : string = "";
    userDescritpion     : string ="";
    userType          : string ="";
    userImage           : string ="";
    userEnabled         : boolean = false;
    userDateOfBirth     !: Date;
    userTotalSolde      : number = 0;
    userLogo            : string = "";
    userStatut          : string ="";
    userManager         : string = "";
    userNif             : string = "";
    userRC              : string = "";
    identityDocumentType: string ="";
    identityCardNumber  : string ="";
    userAdmin           : boolean = false;
    userAddress         !: string;
    userIdentityCode    : string = "";
}