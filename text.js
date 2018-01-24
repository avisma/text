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

      let loader = new THREE.FontLoader();
      let fontHelvetiker = loader.parse(helvetikerJSON);
      let fontOptimer = loader.parse(optimerJSON);
      let fontGentilis = loader.parse(gentilisJSON);
      let fontComicSans = loader.parse(comicsansJSON);
      let font = fontHelvetiker;
      let textString = "MEMES";
      let geometry = new THREE.TextGeometry(textString, {font: font, size: 120, height: 10, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)

      let uniforms = {
        delta: {value: 0}
      };

      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
      	vertexShader: vertexShaderFile,
      	fragmentShader: fragmentShaderFile
      });
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -100;

      let pivot = new THREE.Group();
      pivot.add(mesh);
      scene.add(pivot);
      camera.position.set(300, 30, 900);

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

         pivot.remove(mesh);

         if (mode.value.includes("helvetiker")) {
           font = fontHelvetiker;
         } else if (mode.value.includes("optimer")) {
           font = fontOptimer;
         } else if (mode.value.includes("gentilis")) {
           font = fontGentilis;
         } else if (mode.value.includes("comic sans")) {
           font = fontComicSans;
         }
         text2.innerHTML = mode.value;
         geometry = new THREE.TextGeometry(textString, {font: font, size: 120, height: 10, material: 0, bevelThickness: 1, extrudeMaterial: 1});  //TextGeometry(text, parameters)
         mesh = new THREE.Mesh(geometry, material);
         pivot.add(mesh);

        renderer.render(scene, camera);

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

});
