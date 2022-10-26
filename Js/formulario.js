


let btn_formulario=document.getElementById("btn-formulario");
btn_formulario.addEventListener("click",()=>{

    let campo_nombre=document.getElementById("validationTooltip01").value;
    console.log (campo_nombre);

    let campo_apellido=document.getElementById("validationTooltip02").value;
    console.log (campo_apellido);

    let campo_email=document.getElementById("exampleInputEmail1").value;
    console.log (campo_email);


    let campo_consulta=document.getElementById("floatingTextarea2").value;
    console.log (campo_consulta);

    if (campo_nombre.length==0) {

       let mensaje="No ingreso Nombre.";
       validar_dato(mensaje); 
        
    }
    if (campo_apellido.length==0) {
        let mensaje="No ingreso Apellido.";
        validar_dato(mensaje);
    }
    if (campo_email.length==0) {
        let mensaje="No ingreso Email.";
        validar_dato(mensaje);

    }
    if (campo_consulta.length==0) {
        let mensaje="No ingreso una Consulta.";
        validar_dato(mensaje);
    }

});
async function validar_dato(mensaje){

    await swal.fire({
        title:"Error",
        confirmButtonText:"Continuar",
        html:`
        <div><h3>${mensaje}</h3></div>
        `,
        
    });      
}   
    