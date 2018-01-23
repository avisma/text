// text.js

window.onload = function () {
  let textString = "";

  $(function() {
    $(document).keypress(function(event) {
      if (event.which === 8) {
        textString = textString.substring(0, textString.length - 1);

      } else {
        textString += String.fromCharCode(event.which);
      }

      alert(textString);
    });
  });


  let renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas');

var light2 = new THREE.PointLight(0xffffff, 0.5);

scene.add(light2);

var loader = new THREE.FontLoader();
let font = loader.parse(fontJSON);
let text = "MEMES";
var geometry = new THREE.TextGeometry(text, {font: font, size: 120, height: 10, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)
var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -100;

  //RENDERER
  renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //CAMERA
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

  //SCENE
  scene = new THREE.Scene();

  //LIGHTS
  let light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  let light2 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light2);

<<<<<<< HEAD
var delta = 0;
var angle = 0;
var radius = 1;
var reached_far = false;
var reached_near = false;
var position = 10;

function render() {
   // mesh.rotation.x += 0.01;
   // mesh.rotation.y += 0.01;

   if (!reached_far && !reached_near) {
     camera.position.z += 10;
   } else if (reached_far && !reached_near) {
     camera.position.z -= 10;
   } else if (reached_far && reached_near) {
     reached_far = false;
     reached_near = false;
     camera.position.z += 10;
   }

   if (camera.position.z == 3000) {
     reached_far = true;
   }

   if (camera.position.z == 900) {
     reached_near = true;
   }


   // camera.position.x += radius * Math.sin(angle);
   // angle += 0.01;
   // text = "(" + camera.position.x + ", " + camera.position.y + ", " + camera.position.z + ")" ;

   scene.remove(mesh);
   geometry = new THREE.TextGeometry(text, {font: font, size: 120, height: 10, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)
   material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
   mesh = new THREE.Mesh(geometry, material);
   scene.add(mesh);

    //delta += 0.1;
    //geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
    //geometry.verticesNeedUpdate = true;
=======
  let loader = new THREE.FontLoader();
  let font = loader.parse(fontJSON);
  let geometry = new THREE.TextGeometry("hello world", {font: font, size: 120, height: 10, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)

  let material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -100;
>>>>>>> b628254862811821008dbb80153508b6748e1496

  scene.add(mesh);
  camera.position.set(425, 30, 900);

  //RENDER LOOP
  render();

  let delta = 0;
  function render() {
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;

      //delta += 0.1;
      //geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
      //geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
}
