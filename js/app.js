document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado ajax e imprimir resultados 
function cargarNombres(e) {
   e.preventDefault()

   // Leer las variables 

   const origen = document.getElementById('origen');
   const origenSeleccionado = origen.options[origen.selectedIndex].value;

   const genero = document.getElementById('genero');
   const generoSeleccionado = genero.options[genero.selectedIndex].value;

   const cantidad = document.getElementById('numero').value;

   console.log(cantidad)

   let url = '';
   url += 'http://uinames.com/api/?';
   // Si ahi origen agregarlo a la URL 
   if(origenSeleccionado !== '') {
       url += `region=${origenSeleccionado}&`;
   }
    // Si ahi genero agregarlo a la URL 
    if(generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }
    // Si ahi cantidad agregarlo a la URL 
    if(cantidad !== '') {
       url += `amount=${cantidad}&`;
    }
    // Conectar con ajax
    // Iniciar XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Abrimos la conection
    xhr.open('GET', url, true);
    // Datos de impresion del template
    xhr.onload = function() {
       if(this.status === 200) {
          const nombres = JSON.parse( this.responseText );
          // Generar el HTML 
          let htmlNombres = `<h2>Nombres Generados<h2>`;

          htmlNombres += `<ul class="lista">`;
          
          // Imprimir cada nombre
           nombres.forEach(nombre => {
              htmlNombres += `
                    <li>${nombre.name}
              `;
              document.getElementById('resultado').innerHTML = htmlNombres;
          });

          htmlNombres += `</ul>`;
       
        }
    }
    // Enviar el Request
    xhr.send(); 
}
