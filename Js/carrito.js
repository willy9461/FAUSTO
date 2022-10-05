
let base_de_datos =[
    {   
        imagen:"/img/carrito/Bajonera.jpeg",
        descripcion:"Bajonera",
        precio:375.00,
        id:1,
        cantidad: 1,
    },
    {
        imagen:"/img/carrito/Taparterias.jpeg",
        descripcion:"Taparterias",
        precio:500.00,
        id:2,
        cantidad: 1,
    },
    {
        imagen:"/img/carrito/Palta Burger.jpeg",
        descripcion:"Palta Burger",
        precio:650.00,
        id:3,
        cantidad: 1,
    },
   
   
 
];

//array donde se gusrdan datos del carrito
const carrito=[];


//captura el div contenedor donde se insertan las carts
const contenedor_de_productos=document.getElementById("contenedor_productos");
/**
 * recorre la base de datos y crea los productos
 */
base_de_datos.forEach((producto)=>{
    const div=document.createElement('div');
    div.classList.add('producto');
    div.innerHTML=`
    <div class="cart-div">
        <img src="${producto.imagen}" alt=""class="cart-img">
    </div>
    <h3>${producto.descripcion}</h3>
    <p>$${producto.precio}</p>
    <button id="agregar${producto.id}" class="btn-agregar">Agregar Carrito</button>
    `;
    contenedor_de_productos.appendChild(div);


    //crea los eventos de los botones agregar
    const btn_agregar=document.getElementById(`agregar${producto.id}`);
    btn_agregar.addEventListener("click",()=>{
        agregar_carrito(producto.id);
    });
});
/**
 * captura el objeto para agregar al carrito
 * utiliza la propiedad id 
 */
const agregar_carrito=(producto_id)=>{
  
   
    const item= base_de_datos.find((prod) => prod.id === producto_id);
    carrito.push(item);
    console.log(carrito);    
   
    actualizar_carrito();

    Toastify({

        text: "Se agrego al carrito.",
        
        duration: 1200
        
    }).showToast();


};

/**
 * capturando datos del html para funciones de la ventana del carrito
 */
let modal_carrito=document.getElementById("modal-carrito-contenedor");
let btn_cerrar=document.getElementById("cerrar-carrito");
let btn_modal_carrito=document.getElementById("btn-carrito");
var body=document.getElementById("body");
/**
 * evento del boton carrito
 */
btn_modal_carrito.addEventListener("click",()=>{
    modal_carrito.style.display="block";
    body.style.position="static";
    body.style.height="100%";
    body.style.overflow="hidden";
}); 

    
/**
 * evento del boton cerrar carrito
 */
btn_cerrar.addEventListener("click",()=>{
    modal_carrito.style.display="none";
    body.style.position="inherit";
    body.style.height="auto";
    body.style.overflow="visible";

});
/**
 * captura el contenedor para guardar datos del carrito
 */
const contenedor_carrito=document.getElementById("carrito-contenedor");
//captura el contador del carrito
const contador_carrito=document.getElementById("contador-carrito");
//captura el span donde se muestra el total de el carrito
const precio_Total=document.getElementById("precio-total");
/**
 * Recorre el carrito y va insertando los objetos(productos)
 */
function actualizar_carrito(){
    limpiar_campo();
    carrito.forEach((prod)=>{
        const div=document.createElement('div');
        div.innerHTML=`
        <th scope="row"><img src="${prod.imagen}" alt="icono"  width=40px height=40px></th>
        <td>${prod.descripcion}</td>
        <td> Cantidad: ${prod.cantidad}</td>
        <td>Precio: $${prod.precio}</td>
        <td><a href="javascript:eliminar_producto(${prod.id})">
        <button type="button" class=" btn-eliminar btn btn-outline-danger">Eliminar</button>
        </a></td>`
        contenedor_carrito.appendChild(div);
    });
    //introduce la cantidad de productos en el carrito
    contador_carrito.innerText=carrito.length;
    //recorre el carrito sumando los precios
    precio_Total.innerText= carrito.reduce((acu,prod)=>acu+prod.precio,0);

};
/**
 * limpia el contenedor para una nueva actualizacion
 */
function limpiar_campo(){
    const div=document.getElementById("carrito-contenedor");
    div.innerHTML=` `
        
};
/**
 * funcion del boton eliminar producto del carrito
 * Utiliza la propiedad id
 */
function eliminar_producto(prod_id){

    //recorre el carrito buscando el objeto por la proppiedad id
    let item=carrito.find((prod)=>prod.id===prod_id);
    //guarda el indice del objeto encontrado
    let indice=carrito.indexOf(item);
    //elimina del carrito el objeto a travez del indice optenido 
    carrito.splice(indice,1);

    actualizar_carrito();
    console.log(carrito);
    Toastify({

        text: "Se elimino del carrito.",
        
        duration: 1200
        
    }).showToast();

};
/**
 * captura el boton vaciar carrito del html
 */
const btn_vaciar_carrito=document.getElementById("vaciar-carrito");
//Borra los datos del carrito
btn_vaciar_carrito.addEventListener("click",()=>{
    carrito.length=0;
    actualizar_carrito();
    Toastify({

        text: "El carrito esta vacio.",
        
        duration: 1200
        
    }).showToast();
});