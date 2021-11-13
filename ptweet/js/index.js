window.onload=()=>{
    let usuario=JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("imgUser").src="./img/"+usuario.imagen;
    let arrayTw=[];
   
    var xobj= new XMLHttpRequest();
    xobj.overrideMimeType("application/js");
    xobj.open('GET', './js/tweet.json',true);
    xobj.onreadystatechange=function(){
        if(xobj.readyState == 4 && xobj.status=='200'){
            arrayTw= JSON.parse (xobj.responseText);
            console.log(arrayTw);
            crearPost();
        }
    }
    xobj.send(null);
    
    //console.log(usuario);
    //document.getElementById("usuario").innerHTML="Hola "+usuario.nombre;
    let txtTweet=document.getElementById("txtTweet");
    let btnTweet=document.getElementById("btnTweet");
    btnTweet.addEventListener('click',(evt)=>{
        if(txtTweet.value.trim() != ""){
            let obj ={
                img:usuario.imagen,
                nombre:usuario.nombre,
                mensaje: txtTweet.value,
                username: usuario.username,
            };
            arrayTw.push(obj);
            crearPost();
            txtTweet.value="";
        }
    });
    txtTweet.addEventListener('keyup',(evt)=>{

    });
    function crearPost(){
        console.log(arrayTw);
        var todo="";
        arrayTw.forEach(el=>{
           todo+=` <div class="post">
           <div>
               <img src="img/${el.img}" alt="" class="imgUser">
           </div>
           <div>
               <h2> 
                   <span>${el.nombre}</span>
                   <span>${el.username}</span>
               </h2>
               <div class="textTweet">
                   ${el.mensaje}
               </div>
           </div>
       </div>` ;
       el.comentarios.forEach(comentario=>{
        todo+=` <div class="comentarios">
        <div>
            <img src="img/${comentario.img}" alt="" class="imgUser">
        </div>
        <div>
            <h2> 
                <span>${comentario.nombre}</span>
                <span>${comentario.username}</span>
            </h2>
            <div class="textTweet">
                ${comentario.comentario}
            </div>
        </div>
    </div>` ;
        });
        todo+=` </div>
        </div>¨`;
        });
        document.getElementById("posts").innerHTML=todo;
        document.getElementById("comentarios").innerHTML=todo;
    }
};