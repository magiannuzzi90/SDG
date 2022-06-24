var config = {
    host: 'sdggroup-it.eu.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: '13oC_e7vmDi1G8iSyzzlXqzFEWDrRLdB'
};

//Redirect to login if user is not logged in
async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}
login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
        //open apps -- inserted here --
        var app = qlik.openApp( '4a22ba23-7f8c-4ef0-9b84-955fa9247554', config );
       
        //get objects -- inserted here --
        app.visualization.get('uETyGUP').then(function(vis){
        vis.show("QV01");
        } );
        app.visualization.get('xfvKMP').then(function(vis){
        vis.show("QV02");
        } );
        app.visualization.get('rJFbvG').then(function(vis){
        vis.show("QV03");
        } );
        app.visualization.get('PAppmU').then(function(vis){
        vis.show("QV04");
        } );
        app.visualization.get('a5e0f12c-38f5-4da9-8f3f-0e4566b28398').then(function(vis){
        vis.show("QV05");
        } );
        app.visualization.get('298bbd6d-f23d-4469-94a2-df243d680e0c').then(function(vis){
        vis.show("QV06");
        } );
    } );
});