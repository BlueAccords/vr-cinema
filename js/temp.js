// Main file for the Demo

// Declare the scene, camera and renderer
var effect, controls;
var element, container;
var clock = new THREE.Clock();

var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75, window.innerWidth /
            //window.innerHeight, 0.1, 1000);
var camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
camera.position.set(0, 10, 0);
scene.add(camera);
var renderer = new THREE.WebGLRenderer({
  antialias	: true,
});

element = renderer.domElement;
container = document.getElementById('example');
container.appendChild(element);

// Declare variables for the stereo, etc
effect = new THREE.StereoEffect(renderer);

controls = new THREE.OrbitControls(camera, element);
controls.rotateUp(Math.PI / 4);
controls.target.set(
  camera.position.x + 0.1,
  camera.position.y,
  camera.position.z
);
controls.noZoom = true;
controls.noPan = true;

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }

  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();

  element.addEventListener('click', fullscreen, false);

  window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);

      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      scene.add(light);

      var texture = THREE.ImageUtils.loadTexture(
        'checker.png'
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();

      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);


    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }


    function animate(t) {
      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color('lightgrey'), 1)
document.body.appendChild(element);

camera.position.z = 150;


updateFcts.push(function(){
  renderer.render( scene, camera );
})
//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec= null

requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec	= nowMsec
  // call each update function
  updateFcts.forEach(function(updateFn){
    updateFn(deltaMsec/1000, nowMsec/1000)
  })
})

// Add all objects to scene
scene.add(mainCube);
scene.add(sCube1);
scene.add(sCube2);
scene.add(sCube3);
scene.add(sCube4);
scene.add(sCube5);
scene.add(sCube6);

// Add the animations object
var animations = new Animations();


// Rendering the scene
function render(dt){
  requestAnimationFrame(render);

  // Execute the iteration at each repeatition of the renderer @ 60fps
  animations.animateYRotation(sCube1,0.02);
  animations.animateYRotation(sCube2,0.02);
  animations.animateYRotation(sCube3,0.02);
  animations.animateYRotation(sCube4,0.02);
  animations.animateYRotation(sCube5,0.02);
  animations.animateYRotation(sCube6,0.02);

  effect.render(scene, camera);

  //renderer.render(scene, camera);
}

render();
