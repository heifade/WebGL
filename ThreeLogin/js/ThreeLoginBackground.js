function ThreeLoginBackground($canvas) {
    var I = this;

    I.randerer = null;
    I.scene = null;
    I.camera = null;
    I.cubeCircle = null;

    I.duration = 5000;
    I.currentTime = Date.now();

    I.animate = function() {
        var now = Date.now();
        var deltat = now - I.currentTime;
        I.currentTime = now;
        var fract = deltat / I.duration;
        var angle = Math.PI * 2 * fract;
        if(I.cubeCircle){
            I.cubeCircle.rotation.z += angle;//绕z轴转
        }
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
            'login_font_api.png',
            'login_font_baojia.png',
            'login_font_dizhiku.png',
            'login_font_gpsgenzong.png',
            'login_font_jiagemoxing.png',
            'login_font_kaifangpingtai.png',
            'login_font_paidan.png',
            'login_font_paixian.png',
            'login_font_qiyezhanghu.png',
            'login_font_xinyongmoxing.png',
            'login_font_zhinengpeizai.png'
        ]
    };

    //画背景图片
    function drawBackground() {
        var group = new THREE.Object3D;//创建一个分组
        I.scene.add(group);
        
        var map = THREE.ImageUtils.loadTexture('img/bg.png');//创建一个纹理映射，将其添加到场景中
        var material = new THREE.MeshBasicMaterial({ map: map });//创建一个Phong材质，传入纹理映射参数
        var geometry = new THREE.PlaneGeometry(12, 12, 12, 12 );
        var cube = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
        cube.position.z = -20;
        cube.position.y = 0;
        cube.rotation.x = 0;//绕x轴转45度
        cube.rotation.y = 0;//Math.PI / 2;
        group.add(cube);//将网格添加到场景中
    };
    //画转动的圈
    function drawCircle() {
        var group = new THREE.Object3D;//创建一个分组
        I.scene.add(group);

        // var light = new THREE.DirectionalLight(0xffffff, 1);//添加用于突出显示物体的定向光
        // light.position.set(0, 0, 1);//将光源放在场景外，指向原点
        // group.add(light);

        var map = THREE.ImageUtils.loadTexture('img/pic1.png');//创建一个纹理映射，将其添加到场景中
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
        var group = new THREE.Object3D;//创建一个分组
        I.scene.add(group);

        var table = [
				"H", "Hydrogen", "1.00794", 1, 1,
				"He", "Helium", "4.002602", 18, 1,
				"Li", "Lithium", "6.941", 1, 2,
				"Be", "Beryllium", "9.012182", 2, 2,
				"B", "Boron", "10.811", 13, 2,
				"C", "Carbon", "12.0107", 14, 2,
				"N", "Nitrogen", "14.0067", 15, 2,
				"O", "Oxygen", "15.9994", 16, 2,
				"F", "Fluorine", "18.9984032", 17, 2,
				"Ne", "Neon", "20.1797", 18, 2,
				"Na", "Sodium", "22.98976...", 1, 3,
				"Mg", "Magnesium", "24.305", 2, 3,
				"Al", "Aluminium", "26.9815386", 13, 3,
				"Si", "Silicon", "28.0855", 14, 3,
				"P", "Phosphorus", "30.973762", 15, 3,
				"S", "Sulfur", "32.065", 16, 3,
				"Cl", "Chlorine", "35.453", 17, 3,
				"Ar", "Argon", "39.948", 18, 3,
				"K", "Potassium", "39.948", 1, 4,
				"Ca", "Calcium", "40.078", 2, 4,
				"Sc", "Scandium", "44.955912", 3, 4,
				"Ti", "Titanium", "47.867", 4, 4,
				"V", "Vanadium", "50.9415", 5, 4,
				"Cr", "Chromium", "51.9961", 6, 4,
				"Mn", "Manganese", "54.938045", 7, 4,
				"Fe", "Iron", "55.845", 8, 4,
				"Co", "Cobalt", "58.933195", 9, 4,
				"Ni", "Nickel", "58.6934", 10, 4,
				"Cu", "Copper", "63.546", 11, 4,
				"Zn", "Zinc", "65.38", 12, 4,
				"Ga", "Gallium", "69.723", 13, 4,
				"Ge", "Germanium", "72.63", 14, 4,
				"As", "Arsenic", "74.9216", 15, 4,
				"Se", "Selenium", "78.96", 16, 4,
				"Br", "Bromine", "79.904", 17, 4,
				"Kr", "Krypton", "83.798", 18, 4,
				"Rb", "Rubidium", "85.4678", 1, 5,
				"Sr", "Strontium", "87.62", 2, 5,
				"Y", "Yttrium", "88.90585", 3, 5,
				"Zr", "Zirconium", "91.224", 4, 5,
				"Nb", "Niobium", "92.90628", 5, 5,
				"Mo", "Molybdenum", "95.96", 6, 5,
				"Tc", "Technetium", "(98)", 7, 5,
				"Ru", "Ruthenium", "101.07", 8, 5,
				"Rh", "Rhodium", "102.9055", 9, 5,
				"Pd", "Palladium", "106.42", 10, 5,
				"Ag", "Silver", "107.8682", 11, 5,
				"Cd", "Cadmium", "112.411", 12, 5,
				"In", "Indium", "114.818", 13, 5,
				"Sn", "Tin", "118.71", 14, 5,
				"Sb", "Antimony", "121.76", 15, 5,
				"Te", "Tellurium", "127.6", 16, 5,
				"I", "Iodine", "126.90447", 17, 5,
				"Xe", "Xenon", "131.293", 18, 5,
				"Cs", "Caesium", "132.9054", 1, 6,
				"Ba", "Barium", "132.9054", 2, 6,
				"La", "Lanthanum", "138.90547", 4, 9,
				"Ce", "Cerium", "140.116", 5, 9,
				"Pr", "Praseodymium", "140.90765", 6, 9,
				"Nd", "Neodymium", "144.242", 7, 9,
				"Pm", "Promethium", "(145)", 8, 9,
				"Sm", "Samarium", "150.36", 9, 9,
				"Eu", "Europium", "151.964", 10, 9,
				"Gd", "Gadolinium", "157.25", 11, 9,
				"Tb", "Terbium", "158.92535", 12, 9,
				"Dy", "Dysprosium", "162.5", 13, 9,
				"Ho", "Holmium", "164.93032", 14, 9,
				"Er", "Erbium", "167.259", 15, 9,
				"Tm", "Thulium", "168.93421", 16, 9,
				"Yb", "Ytterbium", "173.054", 17, 9,
				"Lu", "Lutetium", "174.9668", 18, 9,
				"Hf", "Hafnium", "178.49", 4, 6,
				"Ta", "Tantalum", "180.94788", 5, 6,
				"W", "Tungsten", "183.84", 6, 6,
				"Re", "Rhenium", "186.207", 7, 6,
				"Os", "Osmium", "190.23", 8, 6,
				"Ir", "Iridium", "192.217", 9, 6,
				"Pt", "Platinum", "195.084", 10, 6,
				"Au", "Gold", "196.966569", 11, 6,
				"Hg", "Mercury", "200.59", 12, 6,
				"Tl", "Thallium", "204.3833", 13, 6,
				"Pb", "Lead", "207.2", 14, 6,
				"Bi", "Bismuth", "208.9804", 15, 6,
				"Po", "Polonium", "(209)", 16, 6,
				"At", "Astatine", "(210)", 17, 6,
				"Rn", "Radon", "(222)", 18, 6,
				"Fr", "Francium", "(223)", 1, 7,
				"Ra", "Radium", "(226)", 2, 7,
				"Ac", "Actinium", "(227)", 4, 10,
				"Th", "Thorium", "232.03806", 5, 10,
				"Pa", "Protactinium", "231.0588", 6, 10,
				"U", "Uranium", "238.02891", 7, 10,
				"Np", "Neptunium", "(237)", 8, 10,
				"Pu", "Plutonium", "(244)", 9, 10,
				"Am", "Americium", "(243)", 10, 10,
				"Cm", "Curium", "(247)", 11, 10,
				"Bk", "Berkelium", "(247)", 12, 10,
				"Cf", "Californium", "(251)", 13, 10,
				"Es", "Einstenium", "(252)", 14, 10,
				"Fm", "Fermium", "(257)", 15, 10,
				"Md", "Mendelevium", "(258)", 16, 10,
				"No", "Nobelium", "(259)", 17, 10,
				"Lr", "Lawrencium", "(262)", 18, 10,
				"Rf", "Rutherfordium", "(267)", 4, 7,
				"Db", "Dubnium", "(268)", 5, 7,
				"Sg", "Seaborgium", "(271)", 6, 7,
				"Bh", "Bohrium", "(272)", 7, 7,
				"Hs", "Hassium", "(270)", 8, 7,
				"Mt", "Meitnerium", "(276)", 9, 7,
				"Ds", "Darmstadium", "(281)", 10, 7,
				"Rg", "Roentgenium", "(280)", 11, 7,
				"Cn", "Copernicium", "(285)", 12, 7,
				"Uut", "Unutrium", "(284)", 13, 7,
				"Fl", "Flerovium", "(289)", 14, 7,
				"Uup", "Ununpentium", "(288)", 15, 7,
				"Lv", "Livermorium", "(293)", 16, 7,
				"Uus", "Ununseptium", "(294)", 17, 7,
				"Uuo", "Ununoctium", "(294)", 18, 7
			];

        var objects = [];
		var targets = { table: [], sphere: [], helix: [], grid: [] };

        for ( var i = 0; i < table.length; i += 5 ) {

					var element = document.createElement( 'div' );
					element.className = 'element';
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

					var number = document.createElement( 'div' );
					number.className = 'number';
					number.textContent = (i/5) + 1;
					element.appendChild( number );

					var symbol = document.createElement( 'div' );
					symbol.className = 'symbol';
					symbol.textContent = table[ i ];
					element.appendChild( symbol );

					var details = document.createElement( 'div' );
					details.className = 'details';
					details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
					element.appendChild( details );

					var object = new THREE.CSS3DObject( element );
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
					object.position.z = Math.random() * 4000 - 2000;
					I.scene.add( object );

					objects.push( object );

					//

					var object = new THREE.Object3D();
					object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
					object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

					targets.table.push( object );

				}

				// sphere

				var vector = new THREE.Vector3();
				var spherical = new THREE.Spherical();

				for ( var i = 0, l = objects.length; i < l; i ++ ) {

					var phi = Math.acos( -1 + ( 2 * i ) / l );
					var theta = Math.sqrt( l * Math.PI ) * phi;

					var object = new THREE.Object3D();

					spherical.set( 800, phi, theta );

					object.position.setFromSpherical( spherical );

					vector.copy( object.position ).multiplyScalar( 2 );

					object.lookAt( vector );

					targets.sphere.push( object );

				}

				// helix

				var vector = new THREE.Vector3();
				var cylindrical = new THREE.Cylindrical();

				for ( var i = 0, l = objects.length; i < l; i ++ ) {

					var theta = i * 0.175 + Math.PI;
					var y = - ( i * 8 ) + 450;

					var object = new THREE.Object3D();

					cylindrical.set( 900, theta, y );

					object.position.setFromCylindrical( cylindrical );

					vector.x = object.position.x * 2;
					vector.y = object.position.y;
					vector.z = object.position.z * 2;

					object.lookAt( vector );

					targets.helix.push( object );

				}

				// grid

				for ( var i = 0; i < objects.length; i ++ ) {

					var object = new THREE.Object3D();

					object.position.x = ( ( i % 5 ) * 400 ) - 800;
					object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
					object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

					targets.grid.push( object );

				}

				//

				var rendererCSS3 = new THREE.CSS3DRenderer();
				rendererCSS3.setSize( window.innerWidth, window.innerHeight );
				rendererCSS3.domElement.style.position = 'absolute';
				//document.getElementById( 'container' ).appendChild( renderer.domElement );
    };

    

    function createMesh(geometry){
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMaterial = new THREE.MeshBasicMaterial();
        wireFrameMaterial.wireframe = true;

        var mesh = THREE.SceneUtils.createMultiMaterialObject(
            geometry, [meshMaterial, wireFrameMaterial]
        );
        return mesh;
    };

    I.init = function() {
        var canvas = $canvas[0];

        I.randerer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});//创建渲染器， 抗锯齿
        I.randerer.setSize(canvas.width, canvas.height);//设置视口尺寸

        I.randerer.setClearColor( 0xf0f0f0 );
		I.randerer.setPixelRatio( window.devicePixelRatio );
		//I.randerer.setSize( window.innerWidth, window.innerHeight );

        I.scene = new THREE.Scene();//创建一个场景
        I.camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);//添加一个相机以便观察整个场景(视野角度,宽高比,最近平面位置,最远平面位置)
        I.camera.position.z = 1;
        //I.camera.position.set(0, 150, 500);
        I.scene.add(I.camera);

        drawBackground();//画背景图片
        drawCircle();//画转动的圈
        //drawWords();//画转动的文字

        
        //drawWord();




        
        I.run();
    }
};
