var config =  {
    serverUrl: 'https://portal.wet.at/backend',
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
    setAgreement: '/user/setAgreement?username=',
    resetPassword: '/user/resetPassword?uuid='
}
