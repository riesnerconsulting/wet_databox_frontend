var config =  {
    serverUrl: 'https://portal.nwbg.at/portalserver',
    //serverUrl: 'http://localhost:9999',
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
    setAgreement: '/user/setAgreement?username='
}