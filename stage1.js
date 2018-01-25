let renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');

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

  let loader = new THREE.FontLoader();
  let font = loader.parse(comicsansJSON);
  let textString = "MEMES";
  let geometry = new THREE.TextGeometry(textString, {font: font, size: 120, height: 10, bevelThickness: 1, extrudeMaterial: 1});
  let material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -100;

  scene.add(mesh);

  // camera.position.set(300, 30, 900);

  function render() {

    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }

  //RENDER LOOP
  render();
