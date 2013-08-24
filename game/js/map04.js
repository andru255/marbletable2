var Map04	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var mesh	= THREEx.createSkymap('skybox')
		scene.add( mesh )		
	}
	// init lighting
	var lighting	= new LightingDefault()
	this.lighting	= lighting
	scene.add(lighting.object3d)

	// add table
	var table	= new MapTable()
	this.table	= table
	scene.add(table.object3d)
	updateFcts.push(function(delta, now){
		table.update(delta, now)
	})
	
	// add botGoal
	var botGoal	= new BotGoal
	table.object3d.add(botGoal.object3d)
	updateFcts.push(function(delta, now){
		botGoal.update(delta, now)
	})
	var body	= botGoal.object3d.userData.cannonBody.body
	body.position.set(24*GAME.tileW, 3 * GAME.tileW/2, 0*GAME.tileW)


	//////////////////////////////////////////////////////////////////////////////////
	//		init Player								//
	//////////////////////////////////////////////////////////////////////////////////
	;(function(){
		var texture	= THREE.ImageUtils.loadTexture('images/sports/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
		var player	= new Player()
		GAME.ball	= player.mesh
		updateFcts.push(function(delta, now){
			player.update(delta, now)
		})
		var body	= GAME.ball.userData.cannonBody.body
		body.position.set(-15*GAME.tileW, 20*GAME.tileW, 0*GAME.tileW)	
	})()


	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	;(function(){
		var texture	= cache.getSet('texture.basketball', function(){
			var texture	= THREE.ImageUtils.loadTexture('images/sports/Basketball texture small.jpgb0270bdb-8751-473f-86c6-0c72ca7480b9Large.jpg')
			return texture
		})
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var botBall	= new BotBall2({
			material	: material,
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var texture	= cache.getSet('texture.soccerball', function(){
			var texture	= THREE.ImageUtils.loadTexture('images/sports/Footballballfree.jpg59a2a1dc-64c8-4bc3-83ef-1257c9147fd1Large.jpg')
			return texture
		})
		var material	= new THREE.MeshPhongMaterial({
			map	: texture
		})
		var botBall	= new BotBall2({
			material	: material,
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
}
