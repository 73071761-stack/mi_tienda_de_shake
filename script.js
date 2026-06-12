let carrito = [];
let total = 0;

function toggleCarrito() {
  const carritoEl = document.getElementById('carrito');
  carritoEl.style.display = carritoEl.style.display === 'block' ? 'none' : 'block';
}

// NUEVA FUNCIÓN: Ahora agrupa por cantidad
function agregarAlCarrito(nombre, precio) {
  // Buscamos si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    // Si ya existe, solo aumentamos su cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si es nuevo, lo agregamos con cantidad inicial de 1
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  total += precio;
  actualizarCarrito();
}

// NUEVA FUNCIÓN: Renderiza el producto con su cantidad (ej: x3)
function actualizarCarrito() {
  const lista = document.getElementById('carrito-items');
  lista.innerHTML = '';

  let contadorProductos = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    
    // Calculamos el subtotal de ese producto (precio x cantidad)
    const subtotalProducto = item.precio * item.cantidad;
    contadorProductos += item.cantidad;

    // Estructura limpia: Nombre + Cantidad destacada + Subtotal
    li.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.nombre}</span>
        <span class="item-cantidad">x${item.cantidad}</span>
      </div>
      <strong>S/ ${subtotalProducto.toFixed(2)}</strong>
    `;
    lista.appendChild(li);
  });

  document.getElementById('carrito-total').textContent = total.toFixed(2);
  // El contador del ícono ahora muestra el total de unidades reales agregadas
  document.getElementById('carrito-contador').textContent = contadorProductos;
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}

// NUEVA FUNCIÓN WHATSAPP: Modificada para enviar las cantidades correctas
function comprarPorWhatsApp() {
  if (carrito.length === 0) {
    alert("🛒 Tu carrito está vacío");
    return;
  }

  let mensaje = "🥤 *Nuevo Pedido de NutriShake ANDINO*%0A%0A";

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    // Formato en WhatsApp: • 3x Fresa Andina - S/ 36.00
    mensaje += `• ${item.cantidad}x ${item.nombre} - S/ ${subtotal.toFixed(2)}%0A`;
  });

  mensaje += `%0A💰 *Total a pagar: S/ ${total.toFixed(2)}*%0A%0A🌿 _¡Muchas gracias por elegir salud natural!_`;

  const numero = "51995820986"; 
  const url = `https://wa.me/${numero}?text=${mensaje}`;

  window.open(url, "_blank");
}