(function(KoreSDK){

    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptionsWiz.userIdentity = 'amit10031@gmail.com';// Provide users email id here
    botOptionsWiz.botInfo = { name: "Newton", "_id": "st-5ecbd7ec-aacc-5a02-b6c7-32b85d78882d" }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-e6c6745f-876d-50ac-99c4-f4940bd1f8cb";
    botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);