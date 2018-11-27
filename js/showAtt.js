/* Modified from original code by Jeremy Tammik's vA3C plugin */

var selMaterial;
var lastMeshMaterial, lastMeshID, lastObjectMaterial, lastObjectID;
var targetList = [];

var material, mesh;
lastMeshMaterial = -1;
lastMeshID = -1;
lastObjectMaterial = -1;
lastObjectID = -1;

function computeNormalsAndFaces() {
  for (var i = 0; i < scene.children.length; i++) 
  {
    if (scene.children[i].hasOwnProperty("geometry")) 
    {
      scene.children[i].geometry.computeFaceNormals();
      targetList.push(scene.children[i]);
    }
    if (scene.children[i].children.length > 0) 
    {
      for (var k = 0; k < scene.children[i].children.length; k++) 
      {
        if (scene.children[i].children[k].hasOwnProperty("geometry"))
         {
          targetList.push(scene.children[i].children[k]);
        }
      }
    }
  }
}
// MOSTRAR LOS ATRIBUTOS DE CADA ELEMENTO
function displayAttributes(obj) {
  msg.innerHTML = '<h3 style="color:blue; text-align: center;">INFORMACION DEL ELEMENTO - COSAPI</h3>';
  // El método Object.keys() devuelve un array de las propiedades
  // names de un objeto, en el mismo orden como se obtienen en un loop normal
  var arr = Object.keys(obj);
  for (var i = 0, len = arr.length; i < len; i++) 
  {
    if (obj[arr[i]] != undefined) 
    {
      // El método indexOf () devuelve la posición de la primera aparición
      // de un valor especificado en una cadena.

      //Este método devuelve -1 si el valor para buscar nunca ocurre.
      if (obj[arr[i]].indexOf('http') == 0) 
      {
        msg.innerHTML += '<a href="' + obj[arr[i]] + '">Click here</a><br>';
      } 
      else 
      {
        msg.innerHTML += arr[i] + ': ' + '<input type="text" name="FirstName" value="' + obj[arr[i]] + '">' + '<br>';
      }
    }
  }
}

//CUANDO HACE CLIC SOBRE UN ELEMENTO
function clickHandler(event) 
{
  // console.log( event );
  // si se llama a este método, la acción predeterminada del evento no se activará.
  event.preventDefault();
  // Para eventos de tecla o mouse, esta propiedad indica la tecla específica o el botón que se presionó.

  // event.whichtambién normaliza la pulsación de botones ( mousedowny mouseupeventos), 
  // informando 1 para el botón izquierdo, 2 para el medio y 3para el derecho. 
  // Usar en event.whichlugar de event.button.
  if (event.which == 2) 
  {
    console.log('middle press');
  }
  //COLOR PARA ELEMENTO EN SELECCION

  //Define qué lado de las caras se representará: frontal, posterior o ambos. 
  // El valor predeterminado es THREE.FrontSide . Otras opciones son THREE.BackSide 
  // y THREE.DoubleSide .
  selMaterial = new THREE.MeshBasicMaterial({color: 'blue',side: '2'}); 

  //Al hacer clic sin seleccionar objeto, reemplace el material de temperatura por mallas y object3D
  if (lastMeshMaterial != -1) {
    //restablecer el último material para la última lastMeshID
    for (var i = 0; i < scene.children.length; i++) {
      if (scene.children[i].id == lastMeshID) {
        scene.children[i].material = lastMeshMaterial;
      }
    }
  }

  if (lastObjectMaterial != -1) {
    //restablecer el último material para el último lastObjectID
    for (var i = 0; i < scene.children.length; i++) {
      if (scene.children[i].id == lastObjectID) {
        for (var ii = 0; ii < scene.children[i].children.length; ii++) {
          scene.children[i].children[ii].material = lastObjectMaterial;
        }

      }
    }
  }

      //   Clase que representa un vector 3D . Un vector 3D es un triplete ordenado de números 
      // (etiquetados como x, y y z), que se puede usar para representar varias cosas, tales como:

      // - Un punto en el espacio 3D.
      // - Una dirección y longitud en el espacio 3D. En three.js, la longitud siempre será la distancia euclidiana
      //   ( distancia en línea recta) desde (0, 0, 0) hasta (x, y, z) y la dirección también se medirá desde (0, 0, 0) 
      //   hacia ( x, y, z).
      // - Cualquier triplete de números ordenado arbitrariamente.

  var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
  //projector.unprojectVector( vector, camera );
  vector.unproject(camera);

  // Esta clase está diseñada para ayudar con el raycasting . 
  // Raycasting se usa para seleccionar el mouse
  // (averiguar qué objetos en el espacio 3D está sobre el mouse) entre otras cosas.
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  //var raycaster = new THREE.Raycaster( camera.position, vector.sub( ).normalize() );

  // Comprueba toda la intersección entre el rayo y el objeto con o sin los descendientes. 
  // Las intersecciones se devuelven ordenadas por distancia, las más cercanas primero.
  //  Se devuelve una serie de intersecciones 
  var intersects = raycaster.intersectObjects(targetList);
  //var intersects = raycaster.intersectObjects( scene.children.geometry );

  if (intersects.length > 0) 
  {
    //   intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    //console.log(intersects[0].object.userData);
    //console.log(intersects);
    var j = 0;
    while (j < intersects.length) 
    {
      //FOR MESHES:
      if (!$.isEmptyObject(intersects[j].object.userData))
       {
        console.log(intersects[j].object.userData);
        if (lastMeshMaterial != -1) 
        {
          //reset last material for last lastMeshID
          for (var i = 0; i < scene.children.length; i++)
           {
            if (scene.children[i].id == lastMeshID)
             {
              scene.children[i].material = lastMeshMaterial;
            }
          }
        }

        //set lastMaterial
        lastMeshMaterial = intersects[j].object.material;

        //set lastMeshID
        lastMeshID = intersects[j].object.id;

        //apply SelMaterial
        intersects[j].object.material = selMaterial;


        displayAttributes(intersects[j].object.userData);

        break;
      }
      //FOR OBJECT3D
      if (!$.isEmptyObject(intersects[j].object.parent.userData)) {
        console.log(intersects[j].object.parent.userData);

        if (lastObjectMaterial != -1) {
          //reset last material for last lastObjectID
          for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].id == lastObjectID) {
              for (var ii = 0; ii < scene.children[i].children.length; ii++) {
                scene.children[i].children[ii].material = lastObjectMaterial;
              }

            }
          }
        }

        //set lastMaterial
        lastObjectMaterial = intersects[j].object.material;

        //set lastObjectID
        lastObjectID = intersects[j].object.parent.id;

        //apply SelMaterial
        intersects[j].object.material = selMaterial;

        displayAttributes(intersects[j].object.parent.userData);
        break;
      }
      j++;
      msg.innerHTML = '';
    } // end of while loop

  } else {
    msg.innerHTML = '';
  }
  if(animLoop == false) 
  {
    render();
  }
}
