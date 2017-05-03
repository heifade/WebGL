function ThreeLoginBackground($canvas) {
    var I = this;

    I.randerer = null;
    I.scene = null;
    I.camera = null;
    I.cubeCircle = null;//圆盘
	I.cubeWords = null;//字

    I.duration = 5000;
    I.currentTime = Date.now();

    I.animate = function() {
        var now = Date.now();
        var deltat = now - I.currentTime;
        I.currentTime = now;
        var fract = deltat / I.duration;
        var angle = Math.PI * 2 * fract;
        
        I.cubeCircle.rotation.z += angle;//绕z轴转
        //I.cubeWords.rotation.z += angle;//绕z轴转
		I.wordsGroup.rotation.z += angle;//绕z轴转

    }

    I.run = function() {
        requestAnimationFrame(function () {
            I.run();
        });
        I.randerer.render(I.scene, I.camera);
        I.animate();
    }

    function getWords(){
        return [
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

        var map = THREE.ImageUtils.loadTexture('img/pic1.svg');//创建一个纹理映射，将其添加到场景中
        var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
            map: map,
            transparent: true
        });
        var geometry = new THREE.PlaneGeometry(2, 2, 2, 2 );
        
        I.cubeCircle = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
        I.cubeCircle.position.z = -5;
        I.cubeCircle.position.y = -0.8;
        I.cubeCircle.rotation.x = -Math.PI / 3;//绕x轴转45度
        I.cubeCircle.rotation.y = 0;//Math.PI / 2;
        group.add(I.cubeCircle);//将网格添加到场景中
    };
    //画转动的文字
    function drawWords(){
        I.wordsGroup = new THREE.Object3D;//创建一个分组
        I.scene.add(I.wordsGroup);

		var words = getWords();
		for(var i=0; i<words.length; i++){
			var word = words[i];
			drawWord(word.pic, i);
		}

		
		//I.wordsGroup.rotation.x = Math.PI / 3;//绕x轴转45度
    };

	function drawWord(word, index){
		var map = THREE.ImageUtils.loadTexture('img/' + word);//创建一个纹理映射，将其添加到场景中
        var material = new THREE.MeshBasicMaterial({ //创建一个基础材质，传入纹理映射参数
            map: map,
            //transparent: true
        });
        var geometry = new THREE.PlaneGeometry(0.4, 0.18, 2, 2 );

		var r = 1;
		var range = Math.PI * 2 / 11 * index;
		var x = r * Math.sin(range);
		var y = r * Math.cos(range);

        
    	var cubeWord = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
        cubeWord.position.z = -4;
        cubeWord.position.y = -0.8;
        cubeWord.rotation.x = x;//-Math.PI / 3;//绕x轴转45度
        cubeWord.rotation.y = y;
        I.wordsGroup.add(cubeWord);//将网格添加到场景中
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




        
        I.run();
    };
};
