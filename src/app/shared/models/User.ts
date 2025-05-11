
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
    userImage           !: string;
    userAddress         !: string;
    userMainLatitude    !: string;
    userMainLongitude   !: string;
    userDateOfBirth     !: Date;
    identityCardNumber  : string ="";
    identityDocument    : string ="";
    documentType        !: string;
}