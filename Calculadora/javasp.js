var operacionMarcada;
var resultadoEnPantalla = 'no'; 

function marcar(digito)
{
	operacionMarcada=obtenerOperacionDePantalla();
	resultadoEstaEnPantalla(digito);
	operacionMarcada+=digito;	
	mostrarEnPantalla();
}

function resultadoEstaEnPantalla(digito)
{
	if (resultadoEnPantalla=="si" ) 
	{
		condicionesParaBorrarPantalla(digito);
		resultadoEnPantalla = "no";
	}
}

function condicionesParaBorrarPantalla(digito)
{
 	if ((!isNaN(digito)) || operacionMarcada == "SyntaxError"
 	 	|| operacionMarcada == "NaN" || operacionMarcada == "Infinity"
 	 	|| operacionMarcada == "TypeError") 
	{
		borrar();
		operacionMarcada="";
	}
}

function mostrarEnPantalla()
{
	document.getElementById("numeroOperando").innerHTML=operacionMarcada;
}

function obtenerOperacionDePantalla()
{
	operacion = document.getElementById("numeroOperando").innerHTML;
	return operacion;
}

function igual ()
{
	operacion = obtenerOperacionDePantalla();
	if(operacion!="SyntaxError")
	operacionResuelta = resolverOperacion(operacion);
	mostrarOperacionResuelta(operacionResuelta);
	resultadoEnPantalla='si';
}

function resolverOperacion(operacion)
{
	try
	{	
		resultado = eval(operacion);
		mostrarProceso();
		return resultado;
	}
	catch (error)
	{
		return error.name;
	}	
}

function mostrarOperacionResuelta(operacionResuelta)
{
	document.getElementById("numeroOperando").innerHTML= operacionResuelta;
}

function borrar()
{
	document.getElementById("numeroOperando").innerHTML="";
	document.getElementById("procesoOperacion").innerHTML="";
}

function operacionEspecial(signo)
{
	if (estaVaciaLaPantalla())
	{
		eligiendoOperacionEspecial(signo);
	}
}

function estaVaciaLaPantalla()
{
	numeroAOperar = obtenerOperacionDePantalla();
	if (numeroAOperar == "") 
	{
		alert ("No hay numero en pantalla");
		return false;
	}
	else
	{
		return true;
	}

}

function eligiendoOperacionEspecial(signo)
{
	igual();
	numeroAOperar=obtenerOperacionDePantalla();
	switch (signo)
	{
		case "√":
			resultado = condicionalRaiz(numeroAOperar);
		break;

		case "%":
			resultado = porcentaje(numeroAOperar);
		break;

		case "1/x":
			resultado = unoSobre(numeroAOperar);
		break;
	}
	mostrarOperacionEspecial(resultado,numeroAOperar,signo);
}

function condicionalRaiz(numeroAOperar)
{
	
	if (numeroAOperar<0) 
	{
		alert("No puedes sacar RAIZ CUADRADA con negativos");
	}
	else
	{
		return raizCuadrada(numeroAOperar);
	}
}

function raizCuadrada(numeroAOperar)
{
	resultadoRaiz = Math.sqrt(numeroAOperar);
	return resultadoRaiz;
}

function porcentaje(numeroAOperar)
{	
	resultadoPorcentaje = numeroAOperar/100;
	return resultadoPorcentaje;
}

function unoSobre(numeroAOperar)
{
	resultadoUnoSobre = 1/numeroAOperar;
	return resultadoUnoSobre;
}

function mostrarOperacionEspecial(resultadoOperacionEspecial,numeroAOperar,signo)
{
	document.getElementById("numeroOperando").innerHTML=resultadoOperacionEspecial;
	mostrarProcesoOperacionEspecial(numeroAOperar,signo);
}

function mostrarProcesoOperacionEspecial(numeroAOperar,signo)
{
	if (signo == "√") 
	{
		document.getElementById("procesoOperacion").innerHTML = "Raiz2 ("+numeroAOperar+")";	
	}else if(signo == "%")
	{
		document.getElementById("procesoOperacion").innerHTML = "Porcentaje ("+numeroAOperar+")";
	} else
	{
		document.getElementById("procesoOperacion").innerHTML = "Uno Sobre ("+numeroAOperar+")";	
	}
}

function atras()
{
	digitoABorrar = ultimoDigito();
	if (esNumero(digitoABorrar) || esSimbolo(digitoABorrar) || simbolosEspeciales(digitoABorrar)) 
	{
		borrarUltimoDigito();
	}
}

function ultimoDigito()
{
	obtenerContenidoPantalla = obtenerOperacionDePantalla();
	ultimoDigitoObtenido = obtenerContenidoPantalla.charAt(obtenerContenidoPantalla.length-1);
	return ultimoDigitoObtenido;
}

function esNumero(digitoABorrar)
{
	if (!isNaN(digitoABorrar)) 
	{
		return true;
	}
	return false;

}

function esSimbolo(digitoABorrar)
{
	if (digitoABorrar == "+" ||
		digitoABorrar == "-" ||
		digitoABorrar == "*" ||
		digitoABorrar == "/") 
	{
		return true;
	}
	return false;
}

function simbolosEspeciales(digitoABorrar)
{
	if (digitoABorrar == "(" ||
		digitoABorrar == ")" ||
		digitoABorrar == ".") 
	{
		return true;
	}
	return false;
}

function borrarUltimoDigito()
{
	obtenerContenidoPantalla = obtenerOperacionDePantalla();
	ultimoDigitoBorrado = obtenerContenidoPantalla.substring(0,obtenerContenidoPantalla.length-1) 
	mostrarUltimoDigitoBorrado(ultimoDigitoBorrado);
}

function mostrarUltimoDigitoBorrado(ultimoDigitoBorrado)
{
	document.getElementById("numeroOperando").innerHTML=ultimoDigitoBorrado;	
}

function mostrarProceso()
{
	proceso = obtenerOperacionDePantalla();
	document.getElementById("procesoOperacion").innerHTML = proceso;
}