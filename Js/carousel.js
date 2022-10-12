/**
 * captura el contenedor y las imagenes
 */
 const carousel=document.querySelector("#carousel");
 let elementos_carousel= document.querySelectorAll(".seccion-carousel");
 
 /**
  * captura botones de html
  */
 const btn_derecho=document.querySelector("#btn-derecho");
 const btn_izquierdo=document.querySelector("#btn-izquierdo");
 /**
  * captura la ultima imagen
  */
 let ultimo_elemento= elementos_carousel[elementos_carousel.length-1];
 //inserta la ultima imagen al principio
 carousel.insertAdjacentElement('afterbegin',ultimo_elemento);
 
 /**
  * funcion de el boton derecho
  */
 function mover_derecha(){
     //selecciona la primer imagen
     let primer_elemento=document.querySelectorAll(".seccion-carousel")[0];
     //aplica los estilos
     carousel.style.marginLeft ="-200";
     carousel.style.transition ='all 0.5s';
 
     setTimeout(() => {
         //coloca la primer imagen al final
         carousel.insertAdjacentElement('beforeEnd',primer_elemento);
         carousel.style.marginLeft ="-100";
         carousel.style.transition="none";
 
     }, 500);
 };
 /**
  * funcion de el boton izquierdo
  */
 function mover_izquierda(){
     //captura todo los elementos
     let elementos_carousel= document.querySelectorAll(".seccion-carousel");
     //captura la ultima imagen
     let ultimo_elemento= elementos_carousel[elementos_carousel.length-1];
     carousel.style.marginLeft ="0";
     carousel.style.transition ='all 0.5s';
     setTimeout(() => {
         //coloca la ultima imagen al principio
         carousel.insertAdjacentElement('afterbegin',ultimo_elemento);
         carousel.style.marginLeft ="-100";
         carousel.style.transition="none";
     }, 500);
 };
 
 btn_derecho.addEventListener("click",()=>{
     mover_derecha();
 });
 
 btn_izquierdo.addEventListener("click",()=>{
     mover_izquierda();
 });
 setInterval(()=>{
     mover_izquierda();
 },6000)