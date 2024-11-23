// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'http://localhost:443';
// const BASE_URL = 'https://gescombackend.onrender.com';

export const ARTICLES_URL                   = BASE_URL + '/api/articles/';
export const ARTICLES_BY_REFERENCE_URL      = ARTICLES_URL + 'reference/';
export const ARTICLES_BY_FAMILLE_URL        = ARTICLES_URL + 'famille/';
export const ARTICLES_BY_SEARCH_URL         = ARTICLES_URL + 'search/';
export const ARTICLES_BY_ID_URL             = ARTICLES_URL + 'id/'

export const POINTDEVENTE_URL               = BASE_URL + '/api/pointDeVente/';
export const POINTDEVENTE_UPDATE_URL        = POINTDEVENTE_URL + 'update';

export const FACTURE_VENTE_URL              = BASE_URL + '/api/facture-ventes/';
export const FACTURE_VENTE_ADD_URL          = FACTURE_VENTE_URL + 'create';
export const FACTURE_VENTE_UPDATE_URL       = FACTURE_VENTE_URL + 'update';

export const FACTURE_VENTE_DETAILS_URL      = BASE_URL + '/api/facture-vente-details/';
export const FACTURE_VENTE_DETAILS_ADD_URL  = FACTURE_VENTE_DETAILS_URL + 'create' ;

export const USER_URL                       = BASE_URL + '/api/users/';
export const USER_UPDATE_URL                = USER_URL + 'update/';
export const USER_LOGIN_URL                 = USER_URL + 'login';
export const USER_REGISTER_URL              = USER_URL + 'register';
export const USER_UPLOAD_PDP_URL            = USER_URL + 'uploads'
export const RESET_TABLES_URL               = USER_URL + 'resetTable';

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