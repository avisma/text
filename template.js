let renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');

// TODO: MODES

// RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);

// SCENE
scene = new THREE.Scene();

// LIGHTS
let light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

let light2 = new THREE.PointLight(0xffffff, 0.5);

scene.add(light2);

// Sets up shader variables for fetching external files
let vertexShaderFile;
let fragmentShaderFile;
let delta = 0;
let material = new THREE.MeshLambertMaterial({
  color: 0xF3FFE2
});

const readFile = function(file) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // File successfully read.
          resolve(xhr.responseText);
        } else {
          // File not successfully read.
          reject(xhr.statusText);
        }
      }
    };

    xhr.onerror = function() {
      // File not successfully read.
      reject(xhr.statusText);
    };

    xhr.responseType = "text";
    xhr.open("GET", file, true);
    xhr.send();
  });
};

const vsLoaded = readFile("shader.vert");
const fsLoaded = readFile("shader.frag");

const bothLoaded = Promise.all([vsLoaded, fsLoaded]);

const main = function(responses) {
  vertexShaderFile = responses[0];
  fragmentShaderFile = responses[1];

  // TODO: load fonts to their own variables,
  //        initialize font variable and set to fontHelvetiker

  // TODO: initialize textString

  // TODO: initialize TextGeometry based on the current font and textString

  // TODO: initialize uniforms

  // TODO: calculate ShaderMaterial based on uniforms, vertexShader, and fragmentShader

  // TODO: create initial mesh based on TextGeometry and ShaderMaterial

  // TODO: initialize pivot group, add mesh to pivot, add pivot group to scene

  let delta = 0;
  let angle = 0;
  let radius = 1;
  let reached_far = false;
  let reached_near = false;
  let position = 10;

  function render() {
    delta += 0.1;

    camera.rotation.z += 0.01;
    pivot.rotation.y = 19.5;

    mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;

    // TODO: define boundaries of camera movement

    // TODO: remove current mesh from pivot group

    // TODO: detect mode and change font accordingly

    // TODO: update font label

    // TODO: re-calculate TextGeometry based on new textString

    // TODO: re-calculate mesh based on new TextGeometry

    // TODO: add new mesh to pivot group

    // TODO: pass scene and camera to the renderer

    requestAnimationFrame(render);

  }

  var text2 = document.createElement('div');
  text2.style.position = 'absolute';
  //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  text2.style.width = 100;
  text2.style.height = 20;
  // text2.style.backgroundColor = "blue";
  text2.style.color = "white";
  text2.innerHTML = mode.value;
  text2.style.bottom = 50 + 'px';
  text2.style.left = 50 + 'px';
  document.body.appendChild(text2);

  //RENDER LOOP
  render();

};

bothLoaded.then(main);
