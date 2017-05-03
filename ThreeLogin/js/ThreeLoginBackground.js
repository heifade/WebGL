function ThreeLoginBackground($canvas) {
    var I = this;

    I.randerer = null;
    I.scene = null;
    I.camera = null;
    I.cubeCircle = null;//圆盘
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
        
		if(I.cubeCircle){
			I.cubeCircle.rotation.z += angle;//绕z轴转
		}
        
        //I.cubeWords.rotation.z += angle;//绕z轴转
		//I.wordsGroup.rotation.z += angle;//绕z轴转
		I.wordsRange += -0.002;
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
				{pic: 'login_font_api.svg' },
				{pic: 'login_font_baojia.svg' },
				{pic: 'login_font_dizhiku.svg' },
				{pic: 'login_font_gpsgenzong.svg' },
				{pic: 'login_font_jiagemoxing.svg' },
				{pic: 'login_font_kaifangpingtai.svg' },
				{pic: 'login_font_paidan.svg' },
				{pic: 'login_font_paixian.svg' },
				{pic: 'login_font_qiyezhanghu.svg' },
				{pic: 'login_font_xinyongmoxing.svg' },
				{pic: 'login_font_zhinengpeizai.svg' }
			];
		}
        return I.words;
    };

    //画背景图片
    // function drawBackground() {
    //     var group = new THREE.Object3D;//创建一个分组
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
    //画转动的圈
    function drawCircle() {
        var group = new THREE.Object3D;//创建一个分组
        I.scene.add(group);

        // var light = new THREE.DirectionalLight(0xffffff, 1);//添加用于突出显示物体的定向光
        // light.position.set(0, 0, 1);//将光源放在场景外，指向原点
        // group.add(light);

		var loader = new THREE.TextureLoader();
		loader.load('img/pic1.svg', function ( map ) {//创建一个纹理映射，将其添加到场景中
			//var map = THREE.ImageUtils.loadTexture('img/pic1.svg');//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(2, 2, 2, 2);
			
			I.cubeCircle = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
			I.cubeCircle.position.z = -5;
			I.cubeCircle.position.y = -0.8;
			I.cubeCircle.rotation.x = -Math.PI / 2.5;//绕x轴转45度
			I.cubeCircle.rotation.y = 0;//Math.PI / 2;
			group.add(I.cubeCircle);//将网格添加到场景中
		});
    };

	function getWordPosition(pos){
		
		var pm1 = new THREE.Matrix4();
		pm1.lookAt(
			new THREE.Vector3(0,0,10),
			new THREE.Vector3(0,0,-5),
			new THREE.Vector3(0,1,0),
		);

		var pm2 = new THREE.Matrix4();
		var q = new THREE.Quaternion(0.6, 0, 0, 0);
		//q.setFromAxisAngle(new THREE.Vector3(0.4, 0, 0), 45);
		pm2.makeRotationFromQuaternion(q);

		var pm3 = pm1.multiply(pm2);
		
			
		var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
		var v3p = v3.applyMatrix4(pm3);

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
				y: I.wordRadius * Math.cos(range),
				z: -6
			}

			var p = getWordPosition(pos);

			if(word.cube){
				word.cube.position.x = p.x;
				word.cube.position.y = p.y;
				word.cube.position.z = p.z;
			}
			
		}
	};

    //画转动的文字
    function drawWords(){
        I.wordsGroup = new THREE.Object3D;//创建一个分组
        I.scene.add(I.wordsGroup);

		var words = getWords();

		I.wordRadius = 0.5;
		var count = words.length;

		for(var i=0;i<count;i++){
			drawWord(words[i]);
		}
    };

	function drawWord(word){

		var loader = new THREE.TextureLoader();
		loader.load('img/' + word.pic, function ( map ) {//创建一个纹理映射，将其添加到场景中
			var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
				map: map,
				transparent: true
			});
			var geometry = new THREE.PlaneGeometry(0.20, 0.07, 2, 2 );

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

    I.init = function() {
        var canvas = $canvas[0];

        I.randerer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,alpha:true});//创建渲染器， 抗锯齿
        I.randerer.setSize(canvas.width, canvas.height);//设置视口尺寸

        I.randerer.setClearColor( 0xf0f0f0,0.0 );
		//I.randerer.setPixelRatio( window.devicePixelRatio );
		//I.randerer.setSize( window.innerWidth, window.innerHeight );

        I.scene = new THREE.Scene();//创建一个场景
        I.camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);//添加一个相机以便观察整个场景(视野角度,宽高比,最近平面位置,最远平面位置)
        I.camera.position.z = 1;
        //I.camera.position.set(0, 0, 10);
        I.scene.add(I.camera);

        //drawBackground();//画背景图片
        drawCircle();//画转动的圈
        drawWords();//画转动的文字
        
        //drawWord();
        
        run();
    };
};
