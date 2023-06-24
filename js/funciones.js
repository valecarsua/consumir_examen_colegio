const validarFormularioHurtos = () =>{
    
    let errorDireccion = '';
    let errorNombre = '';
    let errorLatitud = '';
    let errorLongitud = '';
    let errorDescripcion = '';

    const direccion = document.getElementById('direccion').value
    const nombre = document.getElementById('nombre').value
    const latitud = document.getElementById('latitud').value
    const longitud = document.getElementById('longitud').value
    const descripcion = document.getElementById('descripcion').value

   
    if(direccion === ''){
        errorDireccion = 'La dirección es necesaria'
    }

    if(nombre === ''){
        errorNombre = 'El nombre es necesario'
    }

    if(latitud === ''){
        errorLatitud = 'La latitud es necesaria'
    }

 

    if(longitud === ''){
        errorLongitud = 'La longitud es necesaria'
    }



    if(descripcion === ''){
        errorDescripcion = 'La descripción es necesaria'
    }

    document.getElementById('direccionError').innerText = errorDireccion
    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('latitudError').innerText = errorLatitud
    document.getElementById('longitudError').innerText = errorLongitud
    document.getElementById('descripcionError').innerText = errorDescripcion

    // Verificar si hay algún error en los campos
    if (errorDireccion == '' && errorLatitud == '' && errorLongitud == '' && errorDescripcion == '' && errorNombre == '') {
        return true; // Validación exitosa
    } else {
        return false; // Validación fallida
    }
};



//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'http://localhost:1019/api/hurto'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //obtener respuesta y convertirla a json
    .then(function(data) {
        let listaHurtos = data.hurtos
        return listaHurtos.map(function(hurto) {
            respuesta += `<tr><td>${hurto.direccion}</td>`+
                    `<td>${hurto.nombre}</td>`+
                    `<td>${hurto.latitud}</td>`+
                    `<td>${hurto.longitud}</td>`+
                    `<td>${hurto.descripcion}</td>`+
                    `<td>${hurto.fecha}</td>`+
                    `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})'>Editar</a> 
                    <a class="waves-effect waves-light btn modal-danger red" href="#" onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a></td></tr>`
            body.innerHTML = respuesta

        })
    })
}



const registrar = async () => {

    let _direccion = document.getElementById('direccion').value
    let _nombre = document.getElementById('nombre').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

        let _hurto = {
            direccion: _direccion,
            nombre: _nombre,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_hurto),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            console.log(json.msg)
            //alert(json.msg)//Mensaje que retorna la API
            Swal.fire(
                json.msg,
                '',
                'success'
              )
        })
    }

const editar = (hurto) => {
    document.getElementById('direccion').value =''
    document.getElementById('nombre').value = ''
    document.getElementById('latitud').value =''
    document.getElementById('longitud').value =''
    document.getElementById('descripcion').value =''

    document.getElementById('direccion').value = hurto.direccion
    document.getElementById('nombre').value = hurto.nombre
    document.getElementById('latitud').value = hurto.latitud
    document.getElementById('longitud').value = hurto.longitud
    document.getElementById('descripcion').value = hurto.descripcion
}

const actualizar = async () => {

    let _direccion = document.getElementById('direccion').value
    let _nombre = document.getElementById('nombre').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value


        let _hurto = {
            direccion: _direccion,
            nombre: _nombre,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_hurto),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(() => {
                location.reload();
              })
        })
}

const eliminar = (id) => {
    Swal.fire({
        title: '¿Está seguro de realizar la eliminación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let hurto = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(hurto),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then((resp) => resp.json())
            .then(json => {
                Swal.fire(
                    json.msg,//mensaje que retorna la
                    '',
                    'success'
                ).then(() => {
                    location.reload();//Para recargar la pagina
                });
            });
        }
    });
};


if (document.querySelector('#btnCrearHurto')) {
    document.querySelector('#btnCrearHurto').addEventListener('click', () => {
        if (validarFormularioHurtos()) {
            registrar();
        }
    });
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', () => {
        if (validarFormularioHurtos()) {
            actualizar();
        }
    });
}



/*if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}*/



