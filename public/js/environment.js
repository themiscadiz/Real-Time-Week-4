var sphereArray;
var diamSphere = 3;
var shapeShere = 24;

let roomModel;
let loaderRoom;

// let group = new THREE.Group();


let model;
let loader;
let mixer;
const clock = new THREE.Clock();

function createEnvironment(scene) {

  console.log("Adding environment");

  // loadModel(scene);

  let ground = getGround();

  ground.position.y = 0.01;
  ground.rotation.x = - Math.PI / 2;
  ground.scale.set(.01, .01, .01);
  scene.add(ground);


  let sphere = createSphere(diamSphere, shapeShere, shapeShere);

  let cone = getCone(.50, 1, 32);
  scene.add(cone);

  cone.position.x = 2;
  cone.position.y = 3;
  cone.position.z = -10;

  sphere.position.x = 2;
  sphere.position.y = 2.5;
  sphere.position.z = -20;

  scene.add(sphere);


  var boxGrid = getBoxGrid(5, 3);
  scene.add(boxGrid);


  // To move sphere
  sphere.name = 'sphere-1';
  sphereArray = scene.getObjectByName('sphere-1');



  // ****************
  // static model // Room Environment

  // Load the GLTF space model
  loaderRoom = new THREE.GLTFLoader();
  loaderRoom.load(
    // resource URL
    //  './assets/staticModel/source/ToyBox.gltf',
    './assets/staticModel/icosahedron.glb',
    // './assets/staticModel/ToyBox.glb',

    // onLoad callback: what get's called once the full model has loaded
    (gltf) => {
      roomModel = gltf.scene;

      let roomPos = 0;
      roomModel.position.set(roomPos, 4, roomPos);

      let roomScale = 10;
      roomModel.scale.set(roomScale, roomScale, roomScale);

      // model cast shadow
      gltf.scene.traverse(function (node) {

        if (node.isMesh) { node.castShadow = true; }

      });

      console.log("model");
      scene.add(gltf.scene);
    },
    // onProgress callback: optional function for showing progress on model load
    undefined,
    // onError callback
    (error) => {
      console.error(error);
    }
  );

  // ****************
  // ****************
  // ****************



  // ****************
  // ****************
  // ****************

  // Animation
  // load the model texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./assets/models/Spotted-Jelly.png");
  // read more about why we need these settings here
  // https://threejs.org/docs/#examples/en/loaders/GLTFLoader
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  // Load the GLTF model
  loader = new THREE.GLTFLoader();
  loader.load(
    // FILE
    './assets/models/Spotted-Jelly.gltf',

    // onLoad callback: what get's called once the full model has loaded
    (gltf) => {
      model = gltf.scene;
      // model.position.z = -3; // change the z position a bit
      addTextureToModel(texture); // add a texture to the model


      let scaleModel = 2
      model.scale.x = scaleModel;
      model.scale.y = scaleModel;
      model.scale.z = scaleModel;

      model.position.z = 0;
      model.position.x = 0;
      model.position.y = 2;

      // setup the model animation
      // read more about animation here: 
      // https://threejs.org/docs/#manual/en/introduction/Animation-system
      // a mixer object controls the actual playback of the animation
      mixer = new THREE.AnimationMixer(gltf.scene);
      // the gltf animations array contains animtation clips for the model
      console.log(gltf.animations);
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play(); // start playing each animation clip
      });

      scene.add(gltf.scene);
    },
    // onProgress callback: optional function for showing progress on model load
    undefined,
    // onError callback
    (error) => {
      console.error(error);
    }
  );

  // ****************
  // ****************
  // ****************


  // light
  // White directional light at half intensity shining from the top.
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

}

function addTextureToModel(textureToAdd) {
  model.traverse((child) => {
    if (child instanceof  THREE.Mesh) {
      child.material.map = textureToAdd;

      // Probably need the lines below if you will change the texture after 
      // the model has been added to the scene
      // child.material.needsUpdate = true;
      // child.material.map.needsUpdate = true;
    }
  });
}

function getGround() {
  // load a texture, set wrap mode to repeat
  const texture = new THREE.TextureLoader().load("../assets/grasslight-big.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(25, 25);

  var geometry = new THREE.PlaneGeometry(20000, 20000);
  let material = new THREE.MeshBasicMaterial({ map: texture });
  var mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;
  return mesh;

}


function createSphere(size) {
  var geometry = new THREE.SphereGeometry(size, 24, 24);
  //replace new THREE.MeshBasicMaterial for new THREE.MeshPhongMaterial
  var material = new THREE.MeshBasicMaterial({
    color: '#99ccff'
  });

  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  // mesh.castShadow = true;
  return mesh;
}

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d);

  // // ****with texture
  // let texture = new THREE.TextureLoader().load("../assets/grasslight-big.jpg");
  // let material = new THREE.MeshBasicMaterial({ map: texture });
  // myMesh = new THREE.Mesh(geometry, material);
  // return myMesh;

  let ranColor = new THREE.Color(0xffffff * Math.random());
  var material = new THREE.MeshPhongMaterial({
    color: ranColor
  });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  mesh.castShadow = true;
  return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (var i = 0; i < amount; i++) {
    var obj = getBox(1, 1, 1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height / 2;
    group.add(obj);
    for (var j = 1; j < amount; j++) {
      var obj = getBox(1, 1, 1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height / 2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
  }

  group.position.x = -(separationMultiplier * (amount - 1)) / 2;
  group.position.z = -(separationMultiplier * (amount - 1)) / 2;

  return group;
}


function getCone(r, h, rS) {

  const geometry = new THREE.ConeGeometry(r, h, rS);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  var mesh = new THREE.Mesh(
    geometry,
    material
  );
  // mesh.castShadow = true;

  return mesh;
}




function updateEnvironment(scene) {

  const delta = clock.getDelta();
  if (mixer) {
    // Update the animation mixer on each frame
    mixer.update(delta);
  }

  sphereArray.position.x += 0.01;
  // camera.position.set((globals.a * -1) * 4, .50, 5);

}


