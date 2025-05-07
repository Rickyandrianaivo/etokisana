// const BASE_URL = 'http://localhost:443';
const BASE_URL = 'https://etokisanabackend.onrender.com';
// const BASE_URL = 'https://backend.commercegestion.com';

export const PRODUCT_URL                   = BASE_URL + '/api/product/';
export const PRODUCT_BY_ID_URL             = PRODUCT_URL + 'id/';
export const PRODUCT_ADD_URL               = PRODUCT_URL + 'add/';
export const PRODUCT_UPDATE_URL            = PRODUCT_URL + 'update/';
export const PRODUCT_REMOVE_URL            = PRODUCT_URL + 'delete/';
export const PRODUCT_BY_OWNER_URL          = PRODUCT_URL + 'owner/';
export const PRODUCT_BY_SEARCH_URL         = PRODUCT_URL + 'search/';
export const PRODUCT_UPLOAD_IMAGE_URL      = PRODUCT_URL + 'upload/';
export const PRODUCT_BY_CATEGORY_URL       = PRODUCT_URL + 'category/';
export const PRODUCT_BY_REFERENCE_URL      = PRODUCT_URL + 'reference/';
export const PRODUCT_BY_SITE_ID_URL        = PRODUCT_URL + 'stock/';
export const PRODUCT_ADD_TO_STOCK_URL      = PRODUCT_URL + 'addStock/'


export const SITE_URL                      = BASE_URL + '/api/site/';
export const SITE_BY_ID_URL                = SITE_URL + '/';
export const SITE_BY_USERID_URL            = SITE_URL + 'user/';
export const SITE_ADD_URL                  = SITE_URL + 'add';
export const SITE_UPDATE_URL               = SITE_URL + 'update/';
export const SITE_REMOVE_URL               = SITE_URL + 'delete/';

export const TRANSACTION_URL               = BASE_URL + '/api/transaction/';
export const TRANSACTION_BY_ID_URL         = TRANSACTION_URL + '/';
export const TRANSACTION_BY_USERID_URL     = TRANSACTION_URL + 'user/';
export const TRANSACTION_ADD_URL           = TRANSACTION_URL + 'add';
export const TRANSACTION_UPDATE_URL        = TRANSACTION_URL + 'update/';
export const TRANSACTION_REMOVE_URL        = TRANSACTION_URL + 'delete/';

export const CATEGORY_URL                  = BASE_URL +'/api/category/';
export const CATEGORY_ADD_URL              = CATEGORY_URL + 'add';
export const CATEGORY_UPDATE_URL           = CATEGORY_URL + 'update/';
export const CATEGORY_REMOVE_URL           = CATEGORY_URL + 'remove/';

export const POINTDEVENTE_URL               = BASE_URL + '/api/pointDeVente/';
export const POINTDEVENTE_UPDATE_URL        = POINTDEVENTE_URL + 'update';

export const FACTURE_VENTE_URL              = BASE_URL + '/api/facture-ventes/';
export const FACTURE_VENTE_ADD_URL          = FACTURE_VENTE_URL + 'create';
export const FACTURE_VENTE_UPDATE_URL       = FACTURE_VENTE_URL + 'update';

export const FACTURE_VENTE_DETAILS_URL      = BASE_URL + '/api/facture-vente-details/';
export const FACTURE_VENTE_DETAILS_ADD_URL  = FACTURE_VENTE_DETAILS_URL + 'create' ;

export const USER_URL                       = BASE_URL + '/api/users/';
export const USER_BY_ID_URL                 = USER_URL + 'id/';
export const USER_BY_USER_ID_URL                 = USER_URL + 'userId/';
export const USER_NEW_URL                   = USER_URL + 'new';
export const USER_DELETE_URL                = USER_URL + 'delete/';
export const USER_BY_EMAIL_URL              = USER_URL + 'email/';
export const USER_UPDATE_URL                = USER_URL + 'update/';
export const USER_VALIDATE_URL              = USER_URL + 'validate/';
export const USER_LOGIN_URL                 = USER_URL + 'login';
export const USER_REGISTER_URL              = USER_URL + 'register';
export const USER_UPLOAD_PDP_URL            = USER_URL + 'uploads';
export const USER_GET_PDP_URL               = USER_URL + 'pdp';
export const RESET_TABLES_URL               = USER_URL + 'resetTable';
export const USER_RESETPASSWORD_URL         = USER_URL + 'passwordReset';
export const USER_REQUESTRESETPASSWORD_URL  = USER_URL + 'requestResetPwd';
export const USER_EMAIL_CONFIRMATION_URL    = USER_URL + 'user-confirmation/';
export const USER_TOKEN_VERIFICATION_URL    = USER_URL + 'token/';

export const BON_ENTREE_URL                 = BASE_URL + '/api/bon-entrees/';
export const BON_ENTREE_ADD_URL             = BON_ENTREE_URL + 'create';

export const BON_ENTREE_DETAILS_URL         = BASE_URL + '/api/bon-entrees-details/'
export const BON_ENTREE_DETAILS_ADD_URL     = BON_ENTREE_DETAILS_URL + 'create';

export const BON_SORTIE_URL                 = BASE_URL + '/api/bon-sorties/';
export const BON_SORTIE_ADD_URL             = BON_SORTIE_URL + 'create';

export const BON_SORTIE_DETAILS_URL         = BASE_URL + '/api/bon-sorties-details/';
export const BON_SORTIE_DETAILS_ADD_URL     = BON_SORTIE_DETAILS_URL + 'create';

export const INVENTAIRE_URL                 = BASE_URL + '/api/inventaires/';
export const INVENTAIRE_ADD_URL             = INVENTAIRE_URL + 'create';

export const INVENTAIRE_DETAILS_URL         = BASE_URL + '/api/inventaireDetails/';
export const INVENTAIRE_DETAILS_SEARCH_URL  = BASE_URL + 'search/';
export const INVENTAIRE_DETAILS_ADD_URL     = INVENTAIRE_DETAILS_URL + 'create';

export const MOUVEMENTSTOCK_URL             = BASE_URL + '/api/mouvementStock/';
export const MOUVEMENTSTOCK_ADD_URL         = MOUVEMENTSTOCK_URL + 'create';
export const MOUVEMENTSTOCK_ADD_ARRAY_URL   = MOUVEMENTSTOCK_URL + 'createArray';

export const CLIENTS_URL                    = BASE_URL + '/api/clients/';
export const CLIENTS_BY_CODE_URL            = CLIENTS_URL + 'codeClient/';
export const CLIENTS_BY_NAME_URL            = CLIENTS_URL + 'search/';
export const CLIENTS_BY_FAMILLE_URL         = CLIENTS_URL + 'famille/';