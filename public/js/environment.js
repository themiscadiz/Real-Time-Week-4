
var sphereArray;
var diamSphere = 3;
var shapeShere = 24;
// let group = new THREE.Group();

function createEnvironment(scene) {

  console.log("Adding environment");

  // loadModel(scene);

  let ground = getGround();

  ground.position.y = 0.01;
  ground.rotation.x = - Math.PI / 2;
  ground.scale.set(.01, .01, .01);
  scene.add( ground );


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

  // sphere.name = 'sphere-1';
  // sphereArray = scene.getObjectByName('sphere-1');

  // light
  // White directional light at half intensity shining from the top.
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

// ***************

// ***************

}

function getGround(){
// load a texture, set wrap mode to repeat
const texture = new THREE.TextureLoader().load( "../assets/grasslight-big.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 25, 25 );

var geometry = new THREE.PlaneGeometry( 20000, 20000 );
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


function getCone(r,h,rS){

const geometry = new THREE.ConeGeometry( r,h,rS );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var mesh = new THREE.Mesh(
  geometry,
  material
);
// mesh.castShadow = true;

return mesh;
}




// // Grass model
// function loadModel(scene) {

//   // model
//   const onProgress = function (xhr) {

//     if (xhr.lengthComputable) {

//       const percentComplete = xhr.loaded / xhr.total * 100;
//       console.log(Math.round(percentComplete, 2) + '% downloaded');
//     }
//   };

//   const onError = function () { };

//   const manager = new THREE.LoadingManager();

//   new THREE.TextureLoader(manager)
//     .setPath('../assets/grass-cubic/textures')
//     .load('texuregrass.png', function (materials) {

//       materials.preload();

//       new THREE.OBJLoader(manager)
//         .setMaterials(materials)
//         .setPath('../assets/grass-cubic/source')
//         .load('Grass.obj', function (object) {

//           object.position.y = 0;
//           object.position.z = 0;
//           object.position.x = 0;

//           scene.add(object);

//         }, onProgress, onError);

//     });
// }

// *******************

// // static model


// // Load the GLTF space model
// loaderGrass = new THREE.GLTFLoader();
// loaderGrass.load(

// 	// resource URL
// 	'./assets/grass/scene.gltf',
// 	// onLoad callback: what get's called once the full model has loaded
// 	(gltf) => {
// 		grassModel = gltf.scene;

// 		grassModel.position.z = .60;
// 		grassModel.position.x = 1;
// 		grassModel.position.y = -.20;

// 		// let scaleModel = 5;
//     // grassModel.scale.set(scaleModel, scaleModel, scaleModel);
// 		// // dropModel.scale.x = scaleIcoModel;
// 		// // dropModel.scale.y = scaleIcoModel;
// 		// // dropModel.scale.z = scaleIcoModel;

// 		// // model cast shadow
// 		// gltf.scene.traverse(function (node) {

// 		// 	if (node.isMesh) { node.castShadow = true; }

// 		// });

// 		console.log("icosahedron is here: model");
// 		scene.add(gltf.scene);
// 	},
// 	// onProgress callback: optional function for showing progress on model load
// 	undefined,
// 	// onError callback
// 	(error) => {
// 		console.error(error);
// 	}
// );





function updateEnvironment(scene) {

  // sphereArray.position.x += 0.01;
  // camera.position.set((globals.a * -1) * 4, .50, 5);

}


