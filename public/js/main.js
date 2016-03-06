// Main file for the Demo

// Declare the scene, camera and renderer
var camera, scene, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

// Add the animations object
var animations = new Animations();

// For timeout and function calls
var tmo;
var executed = false;

// To hold the position of the camera
var camPos = {};

// To set off to trigger head cross targets
var isRes = false;
// To make the buttons clickable
isRes = true;


init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('main');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(0, 100, 150);
  scene.add(camera);

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
    'assets/checker.png'
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

  // Add video inits
  updateFcts.push(function(){
    renderer.render( scene, camera );
  })
  //		loop runner
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
  scene.add(logoCube);
  scene.add(secCube);

  updateButtons(['movie tag1','movie tag2','movie tag3','movie tag4',
                'movie tag5','movie tag6'])

  camera.add(crossMesh); // rectMesh name of the cross
  crossMesh.position.set( 0, 0, - 100 );

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);
}

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

function render(dt) {
  once=0;

  effect.render(scene, camera);
  // Execute the iteration at each repeatition of the renderer @ 60fps
  animations.animateYRotation(sCube1,0.02);
  animations.animateYRotation(sCube2,0.02);
  animations.animateYRotation(sCube3,0.02);
  animations.animateYRotation(sCube4,0.02);
  animations.animateYRotation(sCube5,0.02);
  animations.animateYRotation(sCube6,0.02);

  camPos.x = Math.floor(((camera.rotation.x*180)/Math.PI));
  camPos.y = Math.floor(((camera.rotation.y*180)/Math.PI));
  camPos.z = Math.floor(((camera.rotation.z*180)/Math.PI));
  //console.log( camPos.x + ',' + camPos.y + ',' + camPos.z);

  if (camPos.x  > -5 && camPos.x < 0 && camPos.y > -37 && camPos.y < -29 && isRes == true){
      showCircRedir('assets/example1.mp4');
      }
  else if (camPos.x  > -16 && camPos.x < -11 && camPos.y > -37 && camPos.y < -29 && isRes == true){
    showCircRedir('assets/small.ogv');
  }
  else if (camPos.x  > -26 && camPos.x < -22 && camPos.y > -37 && camPos.y < -29 && isRes == true){
    showCircRedir('assets/sintel.mp4');
  }
  else if (camPos.x  > -5 && camPos.x < 0 && camPos.y > 31 && camPos.y < 38 && isRes == true){
    showCircRedir('assets/example2.mp4');
      }
  else if (camPos.x  > -16 && camPos.x < -11 && camPos.y > 31 && camPos.y < 38 && isRes == true){
    showCircRedir('http://localhost');
      }
  else if (camPos.x  > -26 && camPos.x < -22 && camPos.y > 31 && camPos.y < 38 && isRes == true){
    showCircRedir('http://localhost');
      }
  else {
    clearCircRedir(); // clear the timeout
    executed = false;
  }

}

var showCircRedir = (function(target) {
    executed = false;
    return function (target) {
        if (!executed) {
            executed = true;
            // body
            camera.add( circMesh );
            circMesh.position.set( 7, 7, - 100 );
            setTimeout(function(){ circMesh.position.set( 9, 9, - 150 ); }, 1000);
            setTimeout(function(){ circMesh.position.set( 11, 11, - 300 ); }, 1500);
            tmo = window.setTimeout(function(){
              updateVideo(target);
              updateButtons(['NAME1','NAME2','NAME3','NAME4',
                            'NAME5','NAME6'])

              //window.location = target;
           }, 2000);
        }
    };
})();


function clearCircRedir(){
  for (var i =0; i < 100; i++){
    window.clearTimeout(tmo--); // will do nothing if no timeout with id is present
    }
  camera.remove(circMesh);
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
