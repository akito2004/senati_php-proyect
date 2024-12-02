const apiURL = "http://localhost/app-php-js-chat-yes-no-senati/api.php";
const api1 = "https://yesno.wtf/api";

let botonGet = document.getElementById("getdata");
botonGet.addEventListener("click", function () {
  getdata();
});
////////////////////////ruben daniel
let botonapi = document.getElementById("apisito");
botonapi.addEventListener("click", function () {
  getapi();
});

async function getapi() {
  console.log("Ingreso a getapi");

  try {
    const respuesta = await fetch(api1); 
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`);
    }
    const data = await respuesta.json(); // Captura la respuesta de la API
    console.log(data.answer); // "yes" o "no"

    agregarMensaje(data.answer, false,data.image); // Coloca el mensaje en el chat


  } catch (error) {
    console.log("Error al momento de hacer la petición a Yes/No API: " + error.message);
    agregarMensaje("Error al conectar con la API", false); // Muestra un error en el chat
  }
}


async function getdata() {
  console.log("Ingreso a getdata");

  try {
    const respuesta = await fetch(`${apiURL}?id=123&nombre=Ruben&apellido=nunez`, {
      method: "GET",
    });
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    console.log(data);
  } catch (error) {
    console.log("Error al momento de hacer la petición: " + error.message);
  }
}

let botonpost = document.getElementById("post-data");

async function postData() {
  console.log("Ingreso a postData");

  try {
    const respuesta2 = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "Ruben",
        apellido: "Nunez",
        lenguaje_favorito: "Javascript",
        colors: "Plomo",
      }),
    });
    if (!respuesta2.ok) {
      throw new Error(`HTTP error! Status: ${respuesta2.status}`);
    }
    const data_retorno = await respuesta2.json();
    console.log(data_retorno);
  } catch (error) {
    console.log("Error al momento de hacer la petición POST: " + error.message);
  }
}

botonpost.addEventListener("click", function () {
  postData();
});

////////////////////////////////////////////////////////////////////////
//boton PUT 
let botonPut = document.getElementById("botonput"); // Botón PUT

async function putData() {
  console.log("Ingreso a putData");

  try {
    const respuesta = await fetch(`${apiURL}?id=123`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "papitas",
        apellido: "saldas",
        lenguaje_favorito: "TypeScript",
      }),
    });
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    console.log(data);
  } catch (error) {
    console.log("Error al momento de hacer la petición PUT: " + error.message);
  }
}

botonPut.addEventListener("click", function () {
  putData();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//boton delete 
let botonDelete = document.getElementById("botonDelte"); 

async function deleteData() {
  console.log("Ingreso a deleteData");

  try {
    const respuesta = await fetch(`${apiURL}?id=123`, {
      method: "DELETE",
    });
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    console.log(data);
  } catch (error) {
    console.log("Error al momento de hacer la petición DELETE: " + error.message);
  }
}

botonDelete.addEventListener("click", function () {
  deleteData();
});


// fincionalidad del chat yes no 
let chatMessage = document.getElementById("chatMessages");
let chatForm1 = document.getElementById("chatForm");
let messageInput= document.getElementById("menssageInput");


function agregarMensaje(mensage,soyYo=true,imagen = null) {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.classList.add("message");
  mensajeDiv.classList.add( soyYo? 'user-message' : 'api-message');

  mensajeDiv.textContent = mensage;
  if(imagen){
    const img = document.createElement("img");
    img.src = imagen;
    img.width = 350
    mensajeDiv.appendChild(img);
  }
  setTimeout(() => {
    chatMessage.scrollTop = chatMessage.scrollHeight
  }, 500);


  chatMessage.appendChild(mensajeDiv);
}

chatForm1.addEventListener('submit', function(e){
  e.preventDefault();
  const miMensaje = messageInput.value;

  agregarMensaje(miMensaje,true);
  getapi();
});