angular.module('app')
	.directive('directiveLoginBackground', function(){
		return {
			restrict: 'A',
			scope: {
				width: '@',
                height: '@'
			},
			template: '<canvas width="{{width}}" height="{{height}}"></canvas>',
			replace: false,
			link: function(scope, element, attrs){

				var randerer;
                var scene;
                var camera;
                var cube1;

                var duration = 5000;
                var currentTime = Date.now();

                function animate() {
                    var now = Date.now();
                    var deltat = now - currentTime;
                    currentTime = now;
                    var fract = deltat / duration;
                    var angle = Math.PI * 2 * fract;
                    cube1.rotation.z += angle;//绕z轴转
                }

                function run() {
                    requestAnimationFrame(function () {
                        run();
                    });
                    randerer.render(scene, camera);
                    animate();
                }

                function createMesh(geometry){
                    var meshMaterial = new THREE.MeshNormalMaterial();
                    meshMaterial.side = THREE.DoubleSide;

                    var wireFrameMaterial = new THREE.MeshBasicMaterial();
                    wireFrameMaterial.wireframe = true;

                    var mesh = THREE.SceneUtils.createMultiMaterialObject(
                        geometry, [meshMaterial, wireFrameMaterial]
                    );
                    return mesh;
                }

                $(document).ready(function () {

                    var canvas = element.find('canvas')[0];
                    randerer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});//创建渲染器， 抗锯齿
                    randerer.setSize(canvas.width, canvas.height);//设置视口尺寸

                    scene = new THREE.Scene();//创建一个场景
                    camera = new THREE.PerspectiveCamera(30, 1, 1, 100000);//添加一个相机以便观察整个场景(视野角度,宽高比,最近平面位置,最远平面位置)
                    camera.position.z = 1;
                    scene.add(camera);



                    var groupBackground = new THREE.Object3D;//创建一个分组
                    scene.add(groupBackground);
                    

                    var map = THREE.ImageUtils.loadTexture('img/bg.png');//创建一个纹理映射，将其添加到场景中
                    var material = new THREE.MeshPhongMaterial({ map: map });//创建一个Phong材质，传入纹理映射参数
                    var geometry = new THREE.PlaneGeometry(12, 12, 12, 12 );
                    var cubeBackground = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
                    cubeBackground.position.z = -20;
                    cubeBackground.position.y = 0;
                    cubeBackground.rotation.x = 0;//绕x轴转45度
                    cubeBackground.rotation.y = 0;//Math.PI / 2;
                    groupBackground.add(cubeBackground);//将网格添加到场景中







                    var group1 = new THREE.Object3D;//创建一个分组
                    scene.add(group1);
                    var light = new THREE.DirectionalLight(0xffffff, 1.5);//添加用于突出显示物体的定向光
                    light.position.set(0, 0, 1);//将光源放在场景外，指向原点
                    group1.add(light);

                    

                    var map = THREE.ImageUtils.loadTexture('img/pic1.png');//创建一个纹理映射，将其添加到场景中
                    //var material = new THREE.MeshBasicMaterial({ 
                    var material = new THREE.MeshLambertMaterial({
                        //opacity: 0.6,
                        //color: 0x44ff44,
                        map: map,
                        transparent: true
                    });//创建一个Phong材质，传入纹理映射参数
                    var geometry = new THREE.PlaneGeometry(2, 2, 2, 2 );
                    cube1 = new THREE.Mesh(geometry, material);//将几何形状和材质整合到一个网格中
                    cube1.position.z = -5;
                    cube1.position.y = -0.8;
                    cube1.rotation.x = -Math.PI / 4;//绕x轴转45度
                    cube1.rotation.y = 0;//Math.PI / 2;
                    group1.add(cube1);//将网格添加到场景中


            


                    //文字
                    var options = {
                        size: 90,
                        height: 90,
                        weight: 'normal',
                        font: 'helvetiker',
                        style: 'normal',
                        bevelThickness:2,
                        bevelSize: 4,
                        bevelSegments: 3, 
                        bevelEnabled: true,
                        curveSegments: 12,
                        steps:1
                    }

                    //var text1 = createMesh(new THREE.TextGeometry('Learning', options));
                    //text1.position.z = -10;
                    //text1.position.y = 1;
                    //scene.add(text1);

                    

                    
                    run();
                });
				
			}
		}
	});