var config =  {
    serverUrl: 'http://portal.wet.at/portalserver',
    //serverUrl: 'http://nwbg.riesner.host/databoxapi',
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