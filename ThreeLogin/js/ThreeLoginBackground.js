function ThreeLoginBackground($canvas) {
    var I = this;

    I.randerer = null;
    I.scene = null;
    I.camera = null;
    I.cubeCircle1 = null;//圆盘1
	I.cubeCircle2 = null;//圆盘2
	I.cubeWords = null;//字
	I.wordsRange = 0;

    I.duration = 5000;
    I.currentTime = Date.now();

    function animate() {
        var now = Date.now();
        var deltat = now - I.currentTime;
        I.currentTime = now;
        var fract = deltat / I.duration;
        var angle = Math.PI * 2 * fract;
        
		if(I.cubeCircle1){
			I.cubeCircle1.rotation.z += angle / 4;//绕z轴转
		}
		if(I.cubeCircle2){
			I.cubeCircle2.rotation.z += angle / 3;//绕z轴转
		}
		if(I.cubeCircle3){
			I.cubeCircle3.rotation.z += angle / 2;//绕z轴转
		}
		if(I.cubeCircle4){
			I.cubeCircle4.rotation.z += angle;//绕z轴转
		}

		downLine(I.cubeLine11);
		downLine(I.cubeLine12);
		downLine(I.cubeLine21);
		downLine(I.cubeLine22);
		downLine(I.cubeLine31);
		downLine(I.cubeLine32);
		downLine(I.cubeLine41);
		downLine(I.cubeLine42);
		
		I.wordsRange += -0.002;
    };

	function downLine(cube){
		if(cube){
			var maxY = 1.8;
			cube.position.y -= 0.01;
			cube.position.z -= 0.01;
			cube.material.opacity = (maxY + cube.position.y) / maxY / 2;
			if(cube.position.y < -maxY - 1){
				cube.position.y = maxY;
				cube.position.z = -6;

				cube.material.opacity = 1;
			}
		}
	};

	function run() {
        requestAnimationFrame(function () {
            run();
        });
        I.randerer.render(I.scene, I.camera);
        animate();
		moveWords();
    };

    function getWords(){
		if(I.words == null){
			I.words = [
				{pic: 'login_font_api.png' },
				{pic: 'login_font_baojia.png' },
				{pic: 'login_font_dizhiku.png' },
				{pic: 'login_font_gpsgenzong.png' },
				{pic: 'login_font_jiagemoxing.png' },
				{pic: 'login_font_kaifangpingtai.png' },
				{pic: 'login_font_paidan.png' },
				{pic: 'login_font_paixian.png' },
				{pic: 'login_font_qiyezhanghu.png' },
				{pic: 'login_font_xinyongmoxing.png' },
				{pic: 'login_font_zhinengpeizai.png' }
			];
		}
        return I.words;
    };

    //画背景图片
    // function drawBackground() {
    //     var group = new THREE.Object3D();//创建一个分组
    //     I.scene.add(group);
    //     var map = THREE.ImageUtils.loadTexture('img/bg.png');//创建一个纹理映射，将其添加到场景中
    //     var material = new THREE.MeshBasicMaterial({ map: map });//创建一个Phong材质，传入纹理映射参数
    //     var geometry = new THREE.PlaneGeometry(12, 12, 12, 12 );
    //     var cube = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
    //     cube.position.z = -20;
    //     cube.position.y = 0;
    //     cube.rotation.x = 0;//绕x轴转45度
    //     cube.rotation.y = 0;//Math.PI / 2;
    //     group.add(cube);//将网格添加到场景中
    // };
    //画转动的圈1
    function drawCircle1() {
		loadTexture('img/pic1.png', function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(1.55, 1.55, 2, 2);
			
			I.cubeCircle1 = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			I.cubeCircle1.position.z = -5;
			I.cubeCircle1.position.y = -0.75;
			I.cubeCircle1.rotation.x = -Math.PI / 4.5;//绕x轴转45度
			I.cubeCircle1.rotation.y = 0;//Math.PI / 2;
			I.scene.add(I.cubeCircle1);//将网格添加到场景中
		});
    };

	//画转动的圈2
    function drawCircle2() {
		loadTexture('img/pic2.png', function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true,
				opacity: 1
			});
			var geometry = new THREE.PlaneGeometry(1.18, 1.18, 2, 2);
			
			I.cubeCircle2 = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			I.cubeCircle2.position.z = -4.9;
			I.cubeCircle2.position.y = -0.72;
			I.cubeCircle2.rotation.x = -Math.PI / 4.5;//绕x轴转45度
			I.cubeCircle2.rotation.y = 0;//Math.PI / 2;
			I.scene.add(I.cubeCircle2);//将网格添加到场景中
		});
    };

	//画转动的圈3
    function drawCircle3() {
		loadTexture('img/pic3.png', function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(0.9, 0.9, 2, 2);
			
			I.cubeCircle3 = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			I.cubeCircle3.position.z = -4.8;
			I.cubeCircle3.position.y = -0.64;
			I.cubeCircle3.rotation.x = -Math.PI / 4.5;//绕x轴转45度
			I.cubeCircle3.rotation.y = 0;//Math.PI / 2;
			I.scene.add(I.cubeCircle3);//将网格添加到场景中
		});
    };

	//画转动的圈4
    function drawCircle4() {
		loadTexture('img/pic4.png', function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(0.42, 0.42, 2, 2);
			
			I.cubeCircle4 = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			I.cubeCircle4.position.z = -4.7;
			I.cubeCircle4.position.y = -0.57;
			I.cubeCircle4.rotation.x = -Math.PI / 4.5;//绕x轴转45度
			I.cubeCircle4.rotation.y = 0;//Math.PI / 2;
			I.scene.add(I.cubeCircle4);//将网格添加到场景中
		});
    };

	function getWordPosition(pos){

		var pm = new THREE.Matrix4();
		pm.makeRotationFromQuaternion(new THREE.Quaternion(0.53, 0, 0, 0));
			
		var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
		var v3p = v3.applyMatrix4(pm);

		return {
			x: v3p.x,
			y: v3p.y,
			z: v3p.z
		}
	};

	function moveWords(){
		var words = getWords();
		var count = words.length;
		for(var i=0;i<count;i++){
			var word = words[i];

			var range = Math.PI * 2 / count * i + I.wordsRange;
			var pos = {
				x: I.wordRadius * Math.sin(range),
				y: I.wordRadius * Math.cos(range) - 0.5,//文字y坐标
				z: -6
			}

			var p = getWordPosition(pos);
			p.z = p.z * Math.cos(range) / 2.5 - 2.2 ; //修改z坐标

			if(word.cube){
				word.cube.position.x = p.x;
				word.cube.position.y = p.y;
				word.cube.position.z = p.z;
			}	
		}
	};

    //画转动的文字
    function drawWords(){
        I.wordsGroup = new THREE.Object3D();//创建一个分组
        I.scene.add(I.wordsGroup);

		var words = getWords();

		I.wordRadius = 0.4;
		var count = words.length;

		for(var i=0;i<count;i++){
			drawWord(words[i]);
		}
    };

	function drawWord(word){
		loadTexture('img/' + word.pic, function ( map ) {
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true//透明
			});
			var geometry = new THREE.PlaneGeometry(0.1, 0.046, 2, 2);

			var cube = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			word.cube = cube;
			cube.position.x = word.x;
			cube.position.y = word.y;
			cube.position.z = word.z;
			cube.rotation.x = 0;//-Math.PI / 3;//绕x轴转45度
			cube.rotation.y = 0;
			I.wordsGroup.add(cube);//将网格添加到场景中
		});
	};

	function createDrawLine(params, finish){
		loadTexture(params.imgUrl, function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(0.01, 0.13, 2, 2);
			
			var cube = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			cube.position.z = -6;//params.pos.z;
			cube.position.x = params.pos.x;
			cube.position.y = params.pos.y;
			cube.rotation.x = 0;//绕x轴转45度
			cube.rotation.y = 0;//Math.PI / 2;
			finish(cube);
		});
	};

	function createDrawLine2(params, finish){
		loadTexture(params.imgUrl, function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(0.01, 0.13, 2, 2);
			
			var cube = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			cube.position.z = -6;//params.pos.z;
			cube.position.x = params.pos.x;
			cube.position.y = params.pos.y;
			cube.rotation.x = 0;//绕x轴转45度
			cube.rotation.y = 0;//Math.PI / 2;
			finish(cube);
		});
	};

	function drawLines(){
		var group = new THREE.Object3D();//创建一个分组
        I.scene.add(group);

		createDrawLine({
				imgUrl: 'img/light1.png',
				pos:{x: -1,	y: 1.6 }
			}, function(cube){
			I.cubeLine11 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine({
				imgUrl: 'img/light1.png',
				pos:{x: -1,	y: -0.5 }
			}, function(cube){
			I.cubeLine12 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine({
				imgUrl: 'img/light1.png',
				pos:{x: -0.8,	y: 1.4 }
			}, function(cube){
			I.cubeLine21 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine({
				imgUrl: 'img/light1.png',
				pos:{x: -0.8,	y: -0.3 }
			}, function(cube){
			I.cubeLine22 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine2({
				imgUrl: 'img/light2.png',
				pos:{x: 0.8,	y: 1.6 }
			}, function(cube){
			I.cubeLine31 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine2({
				imgUrl: 'img/light2.png',
				pos:{x: 0.8,	y: -0.5 }
			}, function(cube){
			I.cubeLine32 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine2({
				imgUrl: 'img/light2.png',
				pos:{x: 1,	y: -1.4 }
			}, function(cube){
			I.cubeLine41 = cube;
			group.add(cube);//将网格添加到场景中
		});

		createDrawLine2({
				imgUrl: 'img/light2.png',
				pos:{x: 1,	y: -0.3 }
			}, function(cube){
			I.cubeLine42 = cube;
			group.add(cube);//将网格添加到场景中
		});
	};




	//加载纹理
	function loadTexture(imgUrl, finish){
		var loader = new THREE.TextureLoader();
		loader.load(imgUrl, function ( map ) {
			finish(map);
		});
	};

    I.init = function() {
        var canvas = $canvas[0];

        I.randerer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha:true});//创建渲染器，抗锯齿，透明
        I.randerer.setSize(canvas.width, canvas.height);//设置视口尺寸
        I.randerer.setClearColor(0xf0f0f0, 0.0);
		//I.randerer.setPixelRatio( window.devicePixelRatio );
		//I.randerer.setSize( window.innerWidth, window.innerHeight );

        I.scene = new THREE.Scene();//创建一个场景
        I.camera = new THREE.PerspectiveCamera(28, 1, 1, 10);//添加一个相机以便观察整个场景(视野角度,宽高比,最近平面位置,最远平面位置)
        I.camera.position.set(0, 0, 1);//设置像机位置
        I.scene.add(I.camera);

		// var light = new THREE.DirectionalLight(0xffffff, 1);//添加用于突出显示物体的定向光
        // light.position.set(0, 0, 1);//将光源放在场景外，指向原点
        // group.add(light);

        //drawBackground();//画背景图片
        drawCircle1();//画转动的圈1
		drawCircle2();//画转动的圈2
		drawCircle3();//画转动的圈3
		drawCircle4();//画转动的圈4
        drawWords();//画转动的文字
		drawLines();
        
        run();

		document.body.addEventListener('mousemove', onMouseOver);
    };


	function setCameraPosition(pos){
		I.camera.position.setX(pos.x);
		I.camera.position.setY(pos.y);
	};


	function onMouseOver(e){
		setCameraPosition({
			x: (e.clientX / $(document.body).width() - 0.5) / 10,
			y: -(e.clientY / $(document.body).height() - 0.5) / 10
		});
	}
};
