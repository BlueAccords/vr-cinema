// Creating the mainCube, and 6 satellite cubes

  // create the videoTexture
  var updateFcts	= [];

  // Check if can play and load movie
  var canPlayMp4	= document.createElement('video').canPlayType('video/mp4') !== '' ? true : false
  var canPlayOgg	= document.createElement('video').canPlayType('video/ogg') !== '' ? true : false
  if( canPlayMp4 ){
    var url	= 'assets/welcome.mp4'
  }else if( canPlayOgg ){
    var url	= 'assets/sintel.ogv'
  }else	alert('cant play mp4 or ogv')

  // create the videoTexture
  var videoTexture = new THREEx.VideoTexture(url)
  var video	= videoTexture.video;
  updateFcts.push(function(delta, now){
    videoTexture.update(delta, now)
  });
  videoTexture.texture.needsUpdate = true;

  // Create the audio
  window.AudioContext	= window.AudioContext || window.webkitAudioContext;
  var context	= new AudioContext();
  // wait until the vid is loaded
  videoTexture.video.addEventListener('canplaythrough', function(event){
    // create a source node from the mediaElement
    var sourceNode	= context.createMediaElementSource(videoTexture.video);
    // connect it to WebAudio API
    sourceNode.connect(context.destination);
  });

  var mainCubeGeometry = new THREE.BoxGeometry(160,90,1); // This is the aspect ratio of 16:9
  var mainCubeMaterial = new THREE.MeshBasicMaterial({
    map : videoTexture.texture
  });

  //var mainCubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
  var mainCube = new THREE.Mesh(mainCubeGeometry, mainCubeMaterial);
  mainCube.name = "mainCube";

  function updateVideo(vUrl){
    //if (scene.getObjectByName( "mainCube1", true ) == undefined){
      // add mainCube
      //updateFcts	= []; // remove
      scene.remove(mainCube);
      var videoTexture = new THREEx.VideoTexture(vUrl)
      var video	= videoTexture.video;
      updateFcts.push(function(delta, now){
        videoTexture.update(delta, now)
      });
      videoTexture.texture.needsUpdate = true;

      // Create the audio
      context.close();
      window.AudioContext	= window.AudioContext || window.webkitAudioContext;
    	context	= new AudioContext();
      // wait until the vid is loaded
    	videoTexture.video.addEventListener('canplaythrough', function(event){
    		// create a source node from the mediaElement
    		sourceNode	= context.createMediaElementSource(videoTexture.video);
    		// connect it to WebAudio API
    		sourceNode.connect(context.destination);
    	});

      var mainCubeGeometry = new THREE.BoxGeometry(160,90,1); // This is the aspect ratio of 16:9
      var mainCubeMaterial = new THREE.MeshBasicMaterial({
        map : videoTexture.texture
      });

      //var mainCubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 }); // remove
      var mainCube1 = new THREE.Mesh(mainCubeGeometry, mainCubeMaterial);
      //mainCube1.name = "mainCube1";
      // second loader mainCube
      mainCube1.rotation.x += -0.05;
      mainCube1.rotation.y += 0.05;
      mainCube1.position.x += 0;
      mainCube1.position.y += 70;
      mainCube1.position.z += 10;

      mainCube = mainCube1

      scene.add(mainCube);
  }

  // satellite cubes
  var sCubeGeo1 = new THREE.BoxGeometry(30,15,0.5);
  //var sCubeTex1 = new THREE.MeshBasicMaterial({color: 0x0000ff}); // old color fill
  var dynamicTexture1  = new THREEx.DynamicTexture(50,30);
  var sCubeTex1 = new THREE.MeshBasicMaterial({
    map : dynamicTexture1.texture
  })
  var sCube1 = new THREE.Mesh(sCubeGeo1, sCubeTex1);

  var sCubeGeo2 = new THREE.BoxGeometry(30,15,0.5);
  var dynamicTexture2  = new THREEx.DynamicTexture(50,30);
  var sCubeTex2 = new THREE.MeshBasicMaterial({
    map : dynamicTexture2.texture
  })
  var sCube2 = new THREE.Mesh(sCubeGeo2, sCubeTex2);

  var sCubeGeo3 = new THREE.BoxGeometry(30,15,0.5);
  var dynamicTexture3  = new THREEx.DynamicTexture(50,30);
  var sCubeTex3 = new THREE.MeshBasicMaterial({
    map : dynamicTexture3.texture
  })
  var sCube3 = new THREE.Mesh(sCubeGeo3, sCubeTex3);

  var sCubeGeo4 = new THREE.BoxGeometry(30,15,0.5);
  var dynamicTexture4  = new THREEx.DynamicTexture(50,30);
  var sCubeTex4 = new THREE.MeshBasicMaterial({
    map : dynamicTexture4.texture
  })
  var sCube4 = new THREE.Mesh(sCubeGeo4, sCubeTex4);

  var sCubeGeo5 = new THREE.BoxGeometry(30,15,0.5);
  var dynamicTexture5  = new THREEx.DynamicTexture(50,30);
  var sCubeTex5 = new THREE.MeshBasicMaterial({
    map : dynamicTexture5.texture
  })
  var sCube5 = new THREE.Mesh(sCubeGeo5, sCubeTex5);

  var sCubeGeo6 = new THREE.BoxGeometry(30,15,0.5);
  var dynamicTexture6  = new THREEx.DynamicTexture(50,30);
  var sCubeTex6 = new THREE.MeshBasicMaterial({
    map : dynamicTexture6.texture
  })
  var sCube6 = new THREE.Mesh(sCubeGeo6, sCubeTex6);

  // logo shape
  var logoCubeGeo = new THREE.BoxGeometry(300,300,0.5);
  // var logoCubeTex = new THREE.MeshBasicMaterial({color: 0xffffff});
  var logoCubeTex = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('assets/logo.png'), transparent: true, opacity: 1 });
  var logoCube = new THREE.Mesh(logoCubeGeo, logoCubeTex);

  // logo shape
  var secCubeGeo = new THREE.BoxGeometry(300,300,0.5);
  // var logoCubeTex = new THREE.MeshBasicMaterial({color: 0xffffff});
  var secCubeTex = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('assets/cLogo.png'), transparent: true, opacity: 1 });
  var secCube = new THREE.Mesh(secCubeGeo, secCubeTex);

  // cross shape
  var rectShape = new THREE.Shape();
  rectShape.moveTo( 2, 0);
  rectShape.lineTo( 3, 0);
  rectShape.lineTo( 3, 2);
  rectShape.lineTo( 5, 2);
  rectShape.lineTo( 5, 3);
  rectShape.lineTo( 3, 3);
  rectShape.lineTo( 3, 5);
  rectShape.lineTo( 2 ,5);
  rectShape.lineTo( 2, 3);
  rectShape.lineTo( 0, 3);
  rectShape.lineTo( 0, 2);
  rectShape.lineTo( 2, 2);
  rectShape.lineTo( 2, 0);
  var rectGeom = new THREE.ShapeGeometry( rectShape );
  var crossMesh = new THREE.Mesh( rectGeom, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) ;

  // circle count down
  var radius   = 3,
  segments = 64,
  circGeometry = new THREE.CircleGeometry( radius, segments );
  circMaterial = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 5 } );

  // Remove center vertex
  circGeometry.vertices.shift();

  var circMesh = new THREE.Line( circGeometry, circMaterial )
