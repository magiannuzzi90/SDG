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



	// default filter
	app.field('Anno').selectMatch('2020',false);
	app2.field('Anno').selectMatch('2020',false);

	//callbacks -- inserted here --
	function App2_Measure(reply, app){
	
	var app2_misura= (((((reply.qHyperCube).qDataPages)[0]).qMatrix)[0])[0].qText      ;
	$("#app2_misura").empty();
	
	document.getElementById("app2_misura").innerHTML += "<p> Per l'anno corrente si sono avute " + app2_misura +" perdite</p>";

	}

	

	function App1_Measure(reply, app){
	
	var app1_misura= (((((reply.qHyperCube).qDataPages)[0]).qMatrix)[0])[0].qText      ;
	$("#app1_misura").empty();
	
	document.getElementById("app1_misura").innerHTML += "<p> Per l'anno corrente si sono avute " + app1_misura +" vendite</p>";

	}


	function ListYears(reply, app){
	$("#YearList").empty();
	var qObject = reply.qListObject;
	
	
	$.each(qObject.qDataPages[0].qMatrix, function(){

		var item= this[0];
		console.log(item.qText);
		
		
		
		var setlT="";
	
		
		
		if(item.qState == "S"){
		
			$("#app1_misura").empty();
		
			selT = "style=\"background-color: green;\"";
		} else{
					selT = "style=\"background-color: lightgrey;\"";

		}
		
		document.getElementById("YearList").innerHTML += "<button type=\"checkbox\""+ selT +"class=\"btn btn-primary pull-right\">" + item.qText +"</button>";
		
		//$("YearList").append("<p>"+ item.qText+"</p>");
		/*
		$("YearList").append("<button type=\"checkbox\"" + selT + "class=\"btn btn-primary pull-right\">" + item.qText +"</button>");
		*/
	
	});
	
	
	$("#YearList button").click(function(){
		app.field('Anno').selectMatch($(this).text(),false);
		app2.field('Anno').selectMatch($(this).text(),false);

	});
	
	}


	
	//create cubes and list

	//create cubes and list
app.createList({
		"qFrequencyMode": "N",
		"qDef": {
				"qFieldDefs": [
						"Anno"
				]
		},
		"qExpressions": [],
		"qInitialDataFetch": [
				{
						"qHeight": 20,
						"qWidth": 1
				}
		],
		"qLibraryId": null
	},ListYears);
	
	
	app.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 20,
			"qWidth": 1
		}
	],
	"qDimensions": [],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "sum(Vendite)"
			},
			"qLabel": "sum(Vendite)",
			"qLibraryId": null,
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},App1_Measure);
	
	
	app2.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 20,
			"qWidth": 1
		}
	],
	"qDimensions": [],
	"qMeasures": [
		{
			"qDef": {
				"qDef": "sum(Perdite)"
			},
			"qLabel": "sum(Perdite)",
			"qLibraryId": null,
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},App2_Measure);
} );