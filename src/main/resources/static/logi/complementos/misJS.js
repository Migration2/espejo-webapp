
//maximo 4 caracteres en pin
$('#pin').on('keydown keyup', function(e){
	if ($(this).val() > 9999 
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
        ) {
		e.preventDefault();
	$(this).val(100);
}
});

$('#pin2').on('keydown keyup', function(e){
	if ($(this).val() > 9999 
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
        ) {
		e.preventDefault();
	$(this).val(100);
}
});


//validacion
$("#signupForm").submit(function(e) {
	e.preventDefault();
}).validate({
	errorPlacement: function(error, element) {
		error.insertAfter(element);  
	},
	submitHandler: function(form) {
    // do other things for a valid form
    var parametros={};
    parametros.person={};
    parametros.password=($("#password").val());
    parametros.person={'address':($("#address").val())};
    parametros.person.birthday=($("#birthday").val())+" 10:00:00";
    parametros.person.career=($("#career").val());
    parametros.person.celphone=($("#celphone").val());
    parametros.person.created="2017-10-18 20:27:55"
    parametros.person.email=($("#email").val());
    parametros.person.gender=($("#gender option:selected").val());
    parametros.person.id= 0;
    parametros.person.idCity=($("#idCity option:selected").val());
    parametros.person.idKindId=($("#idKindId option:selected").val());
    parametros.person.lastname=($("#lastname").val());
    parametros.person.modified="2017-10-18 20:27:55";
    parametros.person.name=($("#name").val());
    parametros.person.network=[ 1 ],
    parametros.person.nui=($("#nui").val());
    parametros.person.phone=($("#phone").val());
    parametros.person.profession=($("#profession").val());
    parametros.person.username=($("#nui").val());
    parametros.username=($("#nui").val());
    parametros.pin=($("#pin").val());

    var datos = JSON.stringify(parametros);


 $.ajax({
    	type: "POST",
    	url: "/rest/signup",
  // dataType: 'json',
  contentType: 'application/json',
  data: datos,
  success: function(data) {
  	window.location.href = "/login/registred.html";
  }
}); 
 
    
    
},   
highlight: function(element) {
	$(element).parent().addClass("has-error");
},
unhighlight: function(element) {
	$(element).parent().removeClass("has-error");
},

rules:{
	name:{
		required: true,
		minlength: 4
	},
	lastname:{
		required: true,
		minlength: 4
	},
	birthday:{
		required: true
	},
	nui:{
		required: true,
		minlength: 4
	},
	address:{
		required: true,
		minlength: 4
	},
	email:{
		required: true,
		email: true
	},
	phone:{
		required: true,
		minlength: 4
	},
	celphone:{
		required: true,
		minlength: 4
	},
	password:{
		required:true,
		minlength: 4,
		maxlength: 15
	},
	password2:{
		required:true,
		equalTo:"#password"
	},pin:{
		required:true,
		minlength: 4,
		maxlength: 4
	},pin2:{
		required:true,
		equalTo:"#pin"
	}},
	messages:{
		name:{
			required:' (Requerido)',
			minlength: ' (Invalido)'
		}, 
		lastname:{
			required:' (Requerido)',
			minlength: ' (Invalido)'
		}, 
		birthday:{
			required:' (Requerido)'
		},nui:{
			required:' (Requerido)',
			minlength: ' (Invalido)'
		}, 
		address:{
			required:' (Requerido)',
			minlength: ' (Invalido)'
		},phone:{
			required:' (Requerido)',
			minlength: ' (Invalido, demasiado corto)'
		}, 
		celphone:{
			required:' (Requerido)',
			minlength: ' (Invalido, demasiado corto)'
		},
		email:{
			required:' (Requerido)',
			email: ' (Invalido)'
		},
		password:{
			required: ' (Requerido)',
			minlength: '(Invalido, demasiado corto)',
			maxlength:'(Invalido, demasiado largo)'
		},
		password2:{
			required: ' (Requerido)',
			equalTo: '(Invalido)'
		},
		pin:{
			required: ' (Requerido)',
			minlength: '(Invalido, longitud 4 numeros)',
			maxlength:'(Invalido, longitud 4 numeros)'
		},
		pin2:{
			required: ' (Requerido)',
			equalTo: '(Invalido, no coincide)'
		}}

	});

//funcion para cargar select     
            function ejecutarajaxOptionsSelect(controlador, jsonElement,idForm){//id es el parametro agregado como value en la opcion
            	$.ajax({
            		type: "GET",
            		url: controlador,
            		dataType: 'json',
                    //jsonpCallback: "listar", // callback 
                    success: function( response) {
                    	optionsSelect(response, jsonElement,idForm);
                    },
                    error: function () {
                    	console.log("Error al acceder al recurso");
                    }
                });

            	return false;
            }

            function optionsSelect(json, jsonElement,idForm){
            	try {
            		if(json.length>0){
            			for(var i=0;i<json.length;i++){
            				document.getElementById(idForm).innerHTML+='<option value='+json[i].id+'>'+json[i][jsonElement]+'</option>';
            			}
            		}
            	} catch(e) {	
            		console.log('Error al intentra recuperar datos con los parametros establecidos');
            	}
            	return false;
            }
