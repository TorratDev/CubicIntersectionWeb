let renderer, scene, camera, cube1, cube2;

function setup(size, center, size2, center2) {
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
    const geometry = new THREE.BoxGeometry(size, size, size);
    // create a material for the wireframe
    const wireframeMaterial = new THREE.LineDashedMaterial({color: 0xffaa00, dashSize: 0.1, gapSize: 0.1});

    // create a wireframe geometry for the cube
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);

    // create a wireframe object for the cube
    cube1 = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube1.computeLineDistances();
    cube1.position.set(center, center, 0);
    scene.add(cube1);

    // create a cube geometry
    const geometry2 = new THREE.BoxGeometry(size2, size2, size2);
    // create a material for the wireframe
    const wireframeMaterial2 = new THREE.LineDashedMaterial({color: 0xffaa00, dashSize: 0.1, gapSize: 0.1});

    // create a wireframe geometry for the cube
    const wireframeGeometry2 = new THREE.EdgesGeometry(geometry2);
    cube2 = new THREE.LineSegments(wireframeGeometry2, wireframeMaterial2);
    cube2.computeLineDistances();
    cube2.position.set(-center2, center2, 0);
    scene.add(cube2);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function updateCube(size, center, size2, center2) {
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
        
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        const newSize = startSize + (size - startSize) * progress;
        const newSize2 = startSize2 + (size2 - startSize2) * progress;
        const newX = centerX + (center - centerX) * progress;
        const newY = centerY + (center - centerY) * progress;
        const newZ = centerZ + (center - centerZ) * progress;
        const new2X = center2X + (center2 - center2X) * progress;
        const new2Y = center2Y + (center2 - center2Y) * progress;
        const new2Z = center2Z + (center2 - center2Z) * progress;

        cube1.scale.set(newSize, newSize, newSize);
        cube2.scale.set(newSize2, newSize2, newSize2);
        cube1.position.set(newX, newY, newZ);
        cube2.position.set(-new2X, -new2Y, -new2Z);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

setup();
