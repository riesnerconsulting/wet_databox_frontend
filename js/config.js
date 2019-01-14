var config =  {

    // General Settings
    //serverUrl: 'http://portal.wet.at/portalserver',
    serverUrl: 'https://riesner.host/databoxapi',
    title : 'Riesner Consulting Databox',
    impressumLink : 'https://riesner.host/databox/impressum.html',
    impressumText : 'Impressum',
    termsText : 'Nutzungsbedingungen',
    termsLink : 'https://riesner.host/databox/terms.html',

    // Routes
    login : '/auth',
    getUser : '/user/isActive',
    getAllDocuments : '/user/getAllDocumentsOfUser',
    getAllDocumentsOfType  : '',
    changePassword : '/user/changePassword',
    downloadDocument : '/user/getDocumentById?id=',
    forgotPassword : '/user/forgotPassword',
    loginIsValid : '/user/loginIsValid',
    getUserAggreedOnLastVersion: '/user/userAggreedOnLastVersion?username=',
    getLatestUserAgreement: '/user/getLatestUserAgreement',
    setAgreement: '/user/setAgreement?username=',

    // Images
    imgBasefolder : 'img/',
    logo : 'logo.png',
    logoSmall : 'logo_small.png',
    backgroundImage : 'background.jpg'

}