let renderer, scene, camera, cube1, cube2;

function setup(cubic, cubic2) {
    const canvas = document.getElementById("myCanvas");
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    scene.fog = new THREE.Fog(0x111111, 150, 200);
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // create a light to illuminate the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    scene.add(light);

    // create a cube geometry
    const geometry = new THREE.BoxGeometry(cubic.dimension.x, cubic.dimension.y, cubic.dimension.z);
    // create a material for the wireframe
    const wireframeMaterial = new THREE.LineDashedMaterial({color: 0xffaa00, dashSize: 0.1, gapSize: 0.1});

    // create a wireframe geometry for the cube
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);

    // create a wireframe object for the cube
    cube1 = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube1.computeLineDistances();
    cube1.position.set(cubic.center.x, cubic.center.y, cubic.center.z);
    scene.add(cube1);

    // create a cube geometry
    const geometry2 = new THREE.BoxGeometry(cubic2.dimension.x, cubic2.dimension.y, cubic2.dimension.z);
    // create a material for the wireframe
    const wireframeMaterial2 = new THREE.LineDashedMaterial({color: 0xffaa00, dashSize: 0.1, gapSize: 0.1});

    // create a wireframe geometry for the cube
    const wireframeGeometry2 = new THREE.EdgesGeometry(geometry2);
    cube2 = new THREE.LineSegments(wireframeGeometry2, wireframeMaterial2);
    cube2.computeLineDistances();
    cube2.position.set(cubic2.center.x, cubic2.center.y, cubic2.center.z);
    scene.add(cube2);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function updateCube(cubic, cubic2) {
    const animationDuration = 500; // in milliseconds
    const startSize = cube1.scale.x;
    const startSize2 = cube2.scale.x;
    const centerX = cube1.position.x;
    const centerY = cube1.position.y;
    const centerZ = cube1.position.z;
    const center2X = cube2.position.x;
    const center2Y = cube2.position.y;
    const center2Z = cube2.position.z;

    let startTime = null;

    function animate(time) {
        if (startTime === null) {
            startTime = time;
        }

        // console.log(cubic.dimension.x)
        // console.log(cubic2.center.x)
        
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const newSizeX = startSize + (cubic.dimension.x - startSize) * progress;
        const newSizeY = startSize + (cubic.dimension.y - startSize) * progress;
        const newSizeZ = startSize + (cubic.dimension.z - startSize) * progress;
        const newSize2X = startSize2 + (cubic2.dimension.x - startSize2) * progress;
        const newSize2Y = startSize2 + (cubic2.dimension.y - startSize2) * progress;
        const newSize2Z = startSize2 + (cubic2.dimension.z - startSize2) * progress;
        const newX = centerX + (cubic.center.x - centerX) * progress;
        const newY = centerY + (cubic.center.y - centerY) * progress;
        const newZ = centerZ + (cubic.center.z - centerZ) * progress;
        const new2X = center2X + (cubic2.center.x - center2X) * progress;
        const new2Y = center2Y + (cubic2.center.y - center2Y) * progress;
        const new2Z = center2Z + (cubic2.center.z - center2Z) * progress;

        cube1.scale.set(newSizeX, newSizeY, newSizeZ);
        cube2.scale.set(newSize2X, newSize2Y, newSize2Z);
        cube1.position.set(newX, newY, newZ);
        cube2.position.set(new2X, new2Y, new2Z);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

setup();
