//direccion del archivo JSON.
const url = "/Js/db.json";

//array donde se guardan productos a mostrar.
let base_de_datos =[];


//array donde se guardan datos del carrito
let carrito=[];


// Funcion encargada de cargar los productos en la pagina
function cargarProductos( productos ){

    //captura el div contenedor donde se insertan las carts
    const contenedor_de_productos=document.getElementById("contenedor_productos");
    /**     
    * recorre la base de datos y crea los productos
    */
    productos.forEach((producto)=>{
        const div=document.createElement('div');
        div.classList.add("producto");
        div.classList.add("col-m-3");
        div.innerHTML=`
            <div class="img-contenedor">
                <img src="${producto.imagen}" alt="" class="cart-img">
            </div>
            <div class="contenedor-texto">
                <div>
                    <h3>${producto.nombre}</h3>
                </div>
                <div>
                    <p>${producto.descripcion}</p>
                </div>
                <div>
                    <h3>$${producto.precio}</h3>
                </div>
                <div class="contenedor-btn">
                    <button class="btn-agregar" id="agregar${producto.id}">Agregar al Carrito</button> 
                </div>

            </div>`;
        contenedor_de_productos.appendChild(div);


        //crea los eventos de los botones agregar
        const btn_agregar=document.getElementById(`agregar${producto.id}`);
        btn_agregar.addEventListener("click",()=>{
         agregar_carrito(producto.id);
        });
    });

}

/**
* captura el objeto para agregar al carrito
* utiliza la propiedad id 
*/
const agregar_carrito=(producto_id)=>{
  
   
    const item= base_de_datos.find((prod) => prod.id === producto_id);
    carrito.push(item);
        
   
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
        div.className="fila-carrito"
        div.innerHTML=`
        <img src="${prod.imagen}" alt="" width=40px height=40px>
        <p>${prod.nombre}</p>
        <p> Cantidad: ${prod.cantidad}</p>
        <p>Precio: $${prod.precio}</p>
        <a href="javascript:eliminar_producto(${prod.id})">
            <button type="button" class=" btn-eliminar ">Eliminar</button>
        </a>`
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
 * limpia el contenedor para una nueva actualizacion
*/
function limpiar_contenedor(){
    const div=document.getElementById("contenedor_productos");
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
/**
*carga los datos de el archivo json. 
*/
async function iniciar(){
    fetch(url)
        .then(respuesta =>respuesta.json())
        .then(resultado =>{
            //carga la lista de datos en el localStorage.
            let lista_productos = JSON.stringify(resultado.productos)
            localStorage.setItem("lista_productos",lista_productos)
            
            //guarda la lista de productos en una variable.
            base_de_datos = JSON.parse(localStorage.getItem("lista_productos"));
            //Muestra solo los productos destacados.
            let productosDestacados = base_de_datos.filter( prod => prod.destacado == 1 );
            cargarProductos(productosDestacados)
        })
        
   
};




/*
 * busca segun la categoria del parametro indicado
 * @param {} dato 
*/
function filtrar(dato){
    
    let productos_para_picar=base_de_datos.filter( prod => prod.id_categoria == dato);
    limpiar_contenedor();
    cargarProductos(productos_para_picar);
    

};

iniciar();