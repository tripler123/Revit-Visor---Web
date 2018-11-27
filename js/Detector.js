/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {
	// CanvasRenderingContext2D: Proporciona el 
	// contexto de renderizado 2D para la superficie 
	// de dibujo de un elemento <canvas>.
	canvas: !! window.CanvasRenderingContext2D,
	// Callback --> Una funcion que llama otra funcion
	//  para utilizarla como un parametro
	webgl: ( function () { 
		try { 
			// La Interfaz WebGLRenderingContext proporciona el contexto de representación
			//  de OpenGL ES 2.0 para la superficie de dibujo de un <canvas>elemento HTML

			// Para obtener un objeto de esta interfaz, llame getContext()a un
			// <canvas>elemento que proporcione "webgl" como argumento
			return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
		 } 
		 catch( e ) 
		 { 
			 return false; 
			} 
		} )(),

	workers: !! window.Worker,
	// El objeto FileReader permite que las aplicaciones web lean ficheros
	// (o información en buffer) almacenados en el cliente de forma asíncrona,
	// usando los objetos File o Blob dependiendo de los datos que se pretenden leer.

	// Un objeto de este tipo es devuelto por la filespropiedad del <input>elemento HTML
	//  ; esto le permite acceder a la lista de archivos seleccionados con el 
	// <input type="file">elemento. También se usa para una lista de archivos que se insertan
	//  en el contenido web cuando se usa la API de arrastrar y soltar; mira el DataTransferobjeto
	//  para detalles sobre este uso.

	// Un objeto Blob representa un objeto tipo fichero de  datos planos inmutables.
	// Los Blobs representan datos que no necesariamente se encuentran en un formato nativo de JavaScript.
	// La interfaz File se encuentra basada en un Blob, heredando y expendiendo la funcionalidad de un Blob 
	// para soportar archivos en el sistema del usuario.
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,
	//CallBack
	getWebGLErrorMessage: function () {

		//Crear un Div
		var element = document.createElement( 'div' );
		//Establecer un id
		element.id = 'webgl-error-message';
		//Establecer Estilos al Div
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';
		
		//Funcion para enviar un mensaje si no existe un elemento WebGL
		if ( ! this.webgl ) { //Existe el webgl
			// La propiedad Element.innerHTML devuelve o establece la 
			// sintaxis HTML describiendo los descendientes del elemento.
			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}
		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
