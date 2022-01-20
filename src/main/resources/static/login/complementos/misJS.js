
//maximo 4 caracteres en pin
$('#pin').on('keydown keyup', function (e) {
	if ($(this).val() > 9999
		&& e.keyCode != 46 // delete
		&& e.keyCode != 8 // backspace
	) {
		e.preventDefault();
		$(this).val(100);
	}
});

$('#pin2').on('keydown keyup', function (e) {
	if ($(this).val() > 9999
		&& e.keyCode != 46 // delete
		&& e.keyCode != 8 // backspace
	) {
		e.preventDefault();
		$(this).val(100);
	}
});


//validacion
$("#signupForm").submit(function (e) {
	e.preventDefault();
}).validate({
	errorPlacement: function (error, element) {
		error.insertAfter(element);
	},
	submitHandler: function (form) {
		// do other things for a valid form
		var parametros = {};
		parametros.person = {};
		parametros.password = ($("#password").val());
		parametros.person = { 'address': ($("#address").val()) };
		parametros.person.birthday = ($("#birthday").val()) + " 10:00:00";
		parametros.person.career = ($("#career").val());
		parametros.person.celphone = ($("#celphone").val());
		parametros.person.created = "2017-10-18 20:27:55"
		parametros.person.email = ($("#email").val());
		parametros.person.gender = ($("#gender option:selected").val());
		parametros.person.id = 0;
		parametros.person.idCity = ($("#idCity option:selected").val());
		parametros.person.idKindId = ($("#idKindId option:selected").val());
		parametros.person.lastname = ($("#lastname").val());
		parametros.person.modified = "2017-10-18 20:27:55";
		parametros.person.name = ($("#name").val());
		parametros.person.network = [1],
			parametros.person.nui = ($("#nui").val());
		parametros.person.phone = ($("#phone").val());
		parametros.person.profession = ($("#profession").val());
		parametros.person.username = ($("#nui").val());
		parametros.username = ($("#nui").val());
		parametros.pin = ($("#pin").val());

		var datos = JSON.stringify(parametros);


		$.ajax({
			type: "POST",
			url: "/rest/signup",
			// dataType: 'json',
			contentType: 'application/json',
			data: datos,
			success: function (response) {
				window.location.href = "/login/registred.html";
			},
			error: function (response, status) { 
				if (response.status == 409) {
					mensaje = response.responseJSON.message;
					mensaje = mensaje.toString();
					mensaje = mensaje.slice(10, );

					if (mensaje.lastIndexOf("email") > 0) {
						$('#email').val('');
						$('#email2').val('');
						$('#email').focus();
					}
					if (mensaje.lastIndexOf("username") > 0) {
						$('#nui').val('');
						$('#nui').focus();
					}
					$("#mensajeError").html(mensaje);
					$("#mensajeError").show( "slow" );

					setTimeout(function () {
						$("#mensajeError").hide("slow");
						$("#mensajeError").html('');
					}, 2000);
				}
			}
		});



	},
	highlight: function (element) {
		$(element).parent().addClass("has-error");
	},
	unhighlight: function (element) {
		$(element).parent().removeClass("has-error");
	},

	rules: {
		name: {
			required: true,
			minlength: 4
		},
		lastname: {
			required: true,
			minlength: 4
		},
		birthday: {
			required: true,
		},
		nui: {
			required: true,
			minlength: 4
		},
		address: {
			required: true,
			minlength: 4
		},
		email: {
			required: true,
			email: true
		},
		email2: {
			required: true,
			email: true,
			equalTo: "#email"
		},
		phone: {
			required: true,
			minlength: 4
		},
		celphone: {
			required: true,
			minlength: 4
		},
		password: {
			required: true,
			minlength: 4,
			maxlength: 15
		},
		password2: {
			required: true,
			equalTo: "#password"
		}, pin: {
			required: true,
			minlength: 4,
			maxlength: 4
		}, pin2: {
			required: true,
			equalTo: "#pin"
		}
	},
	messages: {
		name: {
			required: ' (Requerido)',
			minlength: ' (Invalido)'
		},
		lastname: {
			required: ' (Requerido)',
			minlength: ' (Invalido)'
		},
		birthday: {
			required: ' (Requerido)',
			min: 'Fecha Demasiado Antigüa',
			max: 'Fecha Demasiado Reciente'
		}, nui: {
			required: ' (Requerido)',
			minlength: ' (Invalido)'
		},
		address: {
			required: ' (Requerido)',
			minlength: ' (Invalido)'
		}, phone: {
			required: ' (Requerido)',
			minlength: ' (Invalido, demasiado corto)'
		},
		celphone: {
			required: ' (Requerido)',
			minlength: ' (Invalido, demasiado corto)'
		},
		email: {
			required: ' (Requerido)',
			email: ' (Invalido)'
		},
		email2: {
			required: ' (Requerido)',
			email: ' (Invalido)',
			equalTo: '(Invalido, No coincide)'
		},
		password: {
			required: ' (Requerido)',
			minlength: '(Invalido, demasiado corto)',
			maxlength: '(Invalido, demasiado largo)'
		},
		password2: {
			required: ' (Requerido)',
			equalTo: '(Invalido, No coincide)'
		},
		pin: {
			required: ' (Requerido)',
			minlength: '(Invalido, longitud 4 numeros)',
			maxlength: '(Invalido, longitud 4 numeros)'
		},
		pin2: {
			required: ' (Requerido)',
			equalTo: '(Invalido, no coincide)'
		}
	}

});

//funcion para cargar select     
function ejecutarajaxOptionsSelect(controlador, jsonElement, idForm) {//id es el parametro agregado como value en la opcion
	$.ajax({
		type: "GET",
		url: controlador,
		dataType: 'json',
		//jsonpCallback: "listar", // callback 
		success: function (response) {
			optionsSelect(response, jsonElement, idForm);
		},
		error: function () {
			console.log("Error al acceder al recurso");
		}
	});

	return false;
}

function optionsSelect(json, jsonElement, idForm) {
	try {
		if (json.length > 0) {
			for (var i = 0; i < json.length; i++) {
				document.getElementById(idForm).innerHTML += '<option value=' + json[i].id + '>' + json[i][jsonElement] + '</option>';
			}
		}
	} catch (e) {
		console.log('Error al intentra recuperar datos con los parametros establecidos');
	}
	return false;
}

$("#cancelar").click(function (event) {
	event.preventDefault();
	window.location.href = "https://www.laceja-antioquia.gov.co/Paginas/default.aspx";
});

$("#cancelarL").click(function (event) {
	event.preventDefault();
	window.location.href = "http://bici-ceja.com:8080/oa/login/login.html";
});