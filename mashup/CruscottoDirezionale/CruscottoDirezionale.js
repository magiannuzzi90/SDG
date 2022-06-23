/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	var app = qlik.openApp('Mashup_App1.qvf', config);
	var app2 = qlik.openApp('Mashup_App2.qvf', config);


	
	//get objects -- inserted here --
	app.getObject('CurrentSelections','CurrentSelections');
	app.getObject('QV01','bezqBrL');
	app2.getObject('QV02','xMJbj');
	app.getObject('QV03','SBaSmH');
	app.getObject('QV04','bWnPsF');
	app2.getObject('QV05','LAmCA');
} );
