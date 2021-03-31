let baseDeDatos = [
	{
		id: 1,
		nombre: 'GUMMIES',
		texto: 'The gummies are cooked with our tincture, every piece is 5 g of strawberry/mango flavor and dusted with bittersweet chili powder. If you are a new consumer you could eat just half gummy because each one has a nice dose. ',
		precio: 450,
		gr:'Bag w/9 pieces',
		imagen: 'images/Gummies1.jpg',
		mg: '250 mgTHC'
	},
	{
		id: 2,
		nombre: 'BITES (Chocolate)',
		texto: 'Bites are crispy cornflakes cooked with our infused and clarified butter, every piece is 10 g and we have different flavors, when confirming your order let us know which one you prefer. If you are a new consumer you could start with just one piece. ',
		precio: 420,
		gr:'Bag w/8 pieces',
		imagen: 'images/Bites.jpg',
		mg: '150 mgTHC'
	},
	{
		id: 3,
		nombre: 'TINCTURE',
		texto: 'Our tincture is a full spectrum infusion obtained from a macerate process with a previously decarboxylated plant for proper cannabinoids activation.',
		precio: 550,
		gr:'Dropper w/30 ml (600 drops proxy)',
		imagen: 'images/Tintc1.jpg',
		mg: '480 mgTHC/32 mgCBD'
	},
	{
		id: 4,
		nombre: 'BITES (TuttiFrutti)',
		texto: 'Bites are crispy cornflakes cooked with our infused and clarified butter, every piece is 10 g and we have different flavors, when confirming your order let us know which one you prefer. If you are a new consumer you could start with just one piece.',
		precio: 420,
		gr:'Bag w/8 pieces',
		imagen: 'images/Bites.jpg',
		mg: '150 mgTHC'

	}

];

let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function renderItems() {
	for (let info of baseDeDatos) {
		// Estructura
		let miNodo = document.createElement('div');
		miNodo.classList.add('product-card','card', 'col-sm-4');
		// Body
		let miNodoCardBody = document.createElement('div');
		miNodoCardBody.classList.add('product-details');
		// Imagen
		let miNodoImagen = document.createElement('img');
		miNodoImagen.classList.add('img-fluid', 'foto');
		miNodoImagen.setAttribute('src', info['imagen']);

		// let miNodolist = document.createElement('div');
		// miNodo.classList.add('product-card', 'col-sm-4');



		// Titulo
		let miNodoTitle = document.createElement('h4');
		miNodoTitle.classList.add('product-details', 'titulotex');
		miNodoTitle.textContent = info['nombre'];

			// texto
		let miNodoTexto = document.createElement('p');
		miNodoTexto.classList.add('product-details', 'textoDescripcion');
		miNodoTexto.textContent = info['texto'];
			
		//especificacion
		let miNodoespecificar = document.createElement('p');
		miNodoespecificar.classList.add('product-details');
		miNodoespecificar.textContent = info['gr'] ;
		// mg
		let miNodomg = document.createElement('p');
		miNodomg.classList.add('product-details');
		miNodomg.textContent = info['mg'];
		

		// Precio
		let miNodoPrecio = document.createElement('div');
		miNodoPrecio.classList.add('product-bottom-details' , 'product-price');
		miNodoPrecio.textContent = '$' + info['precio'] ;
		// Boton
		let miNodoBoton = document.createElement('button');
		miNodoBoton.classList.add('btn', 'product-links', 'btn-primary' , 'btn-verde');
		miNodoBoton.textContent = 'Agregar';
		miNodoBoton.setAttribute('marcador', info['id']);
		miNodoBoton.addEventListener('click', anyadirCarrito);

		let miNodoBotonCarrito = document.createElement('button');
		miNodoBotonCarrito.classList.add('btn', 'product-links', 'btn-primary' , 'btn-carrito');
		miNodoBotonCarrito.textContent = 'Ver carrito';
	


		// Insertamos
		miNodoCardBody.appendChild(miNodoImagen);
		miNodoCardBody.appendChild(miNodoTitle);
		miNodoCardBody.appendChild(miNodoTexto);
		miNodoCardBody.appendChild(miNodoespecificar);
		miNodoCardBody.appendChild(miNodomg);
		miNodoCardBody.appendChild(miNodoPrecio);
		miNodoCardBody.appendChild(miNodoBoton);
		miNodoCardBody.appendChild(miNodoBotonCarrito);


		miNodo.appendChild(miNodoCardBody);
		$items.appendChild(miNodo);
	}
}

function anyadirCarrito() {
	// Anyadimos el Nodo a nuestro carrito
	carrito.push(this.getAttribute('marcador'))
	// Calculo el total
	calcularTotal();
	// Renderizamos el carrito
	renderizarCarrito();

}

function renderizarCarrito() {
	// Vaciamos todo el html
	$carrito.textContent = '';
	// Quitamos los duplicados
	let carritoSinDuplicados = [...new Set(carrito)];
	// Generamos los Nodos a partir de carrito
	carritoSinDuplicados.forEach(function (item, indice) {
		// Obtenemos el item que necesitamos de la variable base de datos
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		// Cuenta el número de veces que se repite el producto
		let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
			return itemId === item ? total += 1 : total;
		}, 0);
		// Creamos el nodo del item del carrito
		let miNodo = document.createElement('li');
		miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
		miNodo.textContent = `${numeroUnidadesItem} ${miItem[0]['nombre']} - ${miItem[0]['precio']}`;
		// Boton de borrar
		let miBoton = document.createElement('button');
		miBoton.classList.add('btn', 'btn-danger', 'mx-5' ,'btn-eliminar');
		miBoton.textContent = 'X';
		miBoton.style.marginLeft = '1rem';
		miBoton.setAttribute('item', item);
		miBoton.addEventListener('click', borrarItemCarrito);
		// Mezclamos nodos
		miNodo.appendChild(miBoton);
		$carrito.appendChild(miNodo);
	});
}

function borrarItemCarrito() {
	// Obtenemos el producto ID que hay en el boton pulsado
	let id = this.getAttribute('item');
	// Borramos todos los productos
	carrito = carrito.filter(function (carritoId) {
		return carritoId !== id;
	});
	// volvemos a renderizar
	renderizarCarrito();
	// Calculamos de nuevo el precio
	calcularTotal();
}

function calcularTotal() {
	// Limpiamos precio anterior
	total = 0;
	// Recorremos el array del carrito
	for (let item of carrito) {
		// De cada elemento obtenemos su precio
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		total = total + miItem[0]['precio'];
	}
	// Renderizamos el precio en el HTML
	$total.textContent = total.toFixed(2);
}

function vaciarCarrito() {
	// Limpiamos los productos guardados
	carrito = [];
	// Renderizamos los cambios
	renderizarCarrito();
	calcularTotal();
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();

//enviar carrito whatsapp

function enviarWhats(){

  var formatoItems = [];
	var items = document.getElementById('carrito').querySelectorAll("li");
	for(var element of items){
		formatoItems.push(element.innerText)
	}

	var total = document.getElementById('total').innerText;
	console.log(total)
  console.log(formatoItems);

  var message = "Hey esta es mi orden:".concat(formatoItems.join("\n")).concat("\n").concat(total);
	var formatMessage = encodeURI(message);
	console.log(message);

	window.open("https://api.whatsapp.com/send/?phone=525519158885&text=".concat(formatMessage));

}
