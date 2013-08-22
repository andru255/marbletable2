var MapTable	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}

	var table	= new THREE.Object3D()
	this.object3d	= table
	var tileW	= GAME.tileW
	
	// add the ground
	addGround(-35*tileW, -20*tileW, 35*tileW, 20*tileW)

	addWallGridLine(-25,-14,-25, 14)
	addWallGridLine(-25, 15, 25, 15)
	addWallGridLine( 25, 14, 25,-14)
	addWallGridLine( 25,-15,-25,-15)
	

	// addWallGridLine( 19,-14, 19, -6)
	// addWallGridLine( 24,  4, 11,  4)
	// addWallGridLine( 10,  4, 10, -5)
	// addWallGridLine(  9, -5,-12, -5)
	// addWallGridLine(-13, -7,-13, -1)
	// addWallGridLine(-20, -3,-17, -3)
	// addWallGridLine(-21,  4,-21,  7)
	// addWallGridLine(-16,  7,-16, 10)

	// addWallGridLine( -6, 14, -6,  3)
	// addWallGridLine( -5,  3, -1,  3)
	// addWallGridLine(  0,  3,  0,  8)
	// addWallGridLine(  6, 11,  9, 11)
	
	// addHole( 16,-12)
	// addHole( 13,  1)
	// addHole(-11, -7)
	// addHole(-22,-12)
	// addHole(-13,  1)
	// addHole(-22, 12)
	// addHole(- 9, 12)
	// addHole(  2,  8)
	// addHole( 13,  9)
	return
	function addWallGridLine(gridX1, gridZ1, gridX2, gridZ2){
		if( gridX1 === gridX2 ){
			addWallVert(gridX1, gridZ1, gridZ2)
		}else if( gridZ1 === gridZ2 ){
			addWallHori(gridZ1, gridX1, gridX2)
		}else	console.assert(false);
	}
	function addWallHori(gridZ, gridX1, gridX2){
		if( gridX1 > gridX2 ){
			var tmp	= gridX2;
			gridX2	= gridX1;
			gridX1	= tmp;
		}
		var xMin	= gridX1*tileW - tileW/2;
		var zMin	= gridZ *tileW - tileW/2;
		var xMax	= gridX2*tileW + tileW/2;
		var zMax	= gridZ *tileW + tileW/2;
		return addWall(xMin, zMin, xMax, zMax)
	}
	function addWallVert(gridX, gridZ1, gridZ2){
		if( gridZ1 > gridZ2 ){
			var tmp	= gridZ2;
			gridZ2	= gridZ1;
			gridZ1	= tmp;
		}
		var xMin	= gridX *tileW - tileW/2;
		var zMin	= gridZ1*tileW - tileW/2;
		var xMax	= gridX *tileW + tileW/2;
		var zMax	= gridZ2*tileW + tileW/2;
		return addWall(xMin, zMin, xMax, zMax)
	}
	function addWall(x1, z1, x2, z2){
		var texture	= cache.getSet('texture.wood', function(){
			return THREE.ImageUtils.loadTexture('images/wood.jpg')
		});
		
		var width	= Math.abs(x2 - x1);
		var height	= 0.5;
		var depth	= Math.abs(z2 - z1);
		var geometry	= new THREE.CubeGeometry(width, height, depth)
		var material	= new THREE.MeshPhongMaterial({
			map	: texture,
			color	: 0xcccccc
		})
		material.map.wrapS	= THREE.RepeatWrapping;
		material.map.wrapT	= THREE.RepeatWrapping;
		material.map.repeat.x	= 1/16
		material.map.repeat.y	= 1/16
		
		// adapt the UVs to the cube size - to avoid to strech the texture 
		var faceVertexUvs	= geometry.faceVertexUvs[0];
		faceVertexUvs[0].forEach(function(vector){ vector.x *= depth;	})
		faceVertexUvs[1].forEach(function(vector){ vector.x *= depth;	})
		faceVertexUvs[4].forEach(function(vector){ vector.x *= width;	})
		faceVertexUvs[5].forEach(function(vector){ vector.x *= width;	})

		var mesh	= new THREE.Mesh(geometry, material)
		mesh.position.x	= x1 + width /2
		mesh.position.y	=      height/2
		mesh.position.z	= z1 + depth /2

		mesh.receiveShadow	= true
		mesh.castShadow		= true

		table.add( mesh )

		// init physics
		var body	= new THREEx.CannonBody({
			mesh	: mesh,
			mass	: 0,
			material: pMaterialWall,
			cannon2three	: false,
		}).addTo(physicsWorld)
		updateFcts.push(function(delta, now){
			body.update(delta, now)
		});
	}

	function addGround(x1, z1, x2, z2){
		var texture	= cache.getSet('texture.plywood.ground', function(){
			var texture	= THREE.ImageUtils.loadTexture('images/plywood.jpg')
			var texture	= THREE.ImageUtils.loadTexture('images/tile01.jpg')
			var texture	= THREE.ImageUtils.loadTexture('images/square-outline.png')
			// var texture	= THREE.ImageUtils.loadTexture('images/SUNNY-Pool-Table.jpg');
			return texture
		})
		var width	= Math.abs(x2 - x1)
		var height	= 0.25
		var depth	= Math.abs(z2 - z1)
		var geometry	= new THREE.CubeGeometry(width, height, depth)
		var material	= new THREE.MeshPhongMaterial({
			color		: 'hotpink',
			map		: texture,
			// bumpMap		: texture,
			// bumpScale	: 0.1,
		})
		texture.wrapS	= THREE.RepeatWrapping;
		texture.wrapT	= THREE.RepeatWrapping;
		texture.repeat.x= 35
		texture.repeat.y= 20
		// texture.repeat.x= 4
		// texture.repeat.y= 4


		var mesh	= new THREE.Mesh(geometry, material)
		mesh.name	+= ' ground ';
		table.add( mesh )

		mesh.position.x	= x1 + width/2
		mesh.position.y	=     -height/2
		mesh.position.z	= z1 + depth/2		
		mesh.receiveShadow	= true
		mesh.castShadow		= true


		// init physics
		var body	= new THREEx.CannonBody({
			mesh	: mesh,
			mass	: 0,
			material: pMaterialGround,
			cannon2three	: false,
		}).addTo(physicsWorld)
		updateFcts.push(function(delta, now){
			body.update(delta, now)
		});
	}

}
