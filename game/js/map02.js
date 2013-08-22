var Map02	= function(){
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var geometry	= new THREE.SphereGeometry(90, 32, 32)
		var material	= new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
			side	: THREE.BackSide
		})
		var starSphere	= new THREE.Mesh(geometry, material)
		scene.add(starSphere)
	}
	// init lighting
	var lighting	= new LightingDefault()
	this.lighting	= lighting
	scene.add(lighting.object3d)

	// add table
	var table	= new MapTable()
	this.table	= table;
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
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/jupitermap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/neptunemap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg')
		})
		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()

	;(function(){
		var botBall	= new BotBall({
			texture	: THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg')
		})
		botBall.object3d.material.bumpMap	= THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg'),
		botBall.object3d.material.bumpScale	= 0.01;

		updateFcts.push(function(delta, now){
			botBall.update(delta, now)
		})
	})()
}
