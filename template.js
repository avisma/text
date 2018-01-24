$(function () {

  let renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas');

  let modes = [];
  // modes.lighting = [];
  modes = ['helvetiker', 'optimer', 'gentilis', 'comic sans'];
  let modeIterator = makeIterator(modes);
  let mode = modeIterator.next();

  // RENDERER
  renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
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
  let material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});

  const readFile = function (file) {
      return new Promise(function (resolve, reject) {
          const xhr = new XMLHttpRequest();

          xhr.onload = function () {
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

          xhr.onerror = function () {
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

    ...

  };

  bothLoaded.then(main);

});
