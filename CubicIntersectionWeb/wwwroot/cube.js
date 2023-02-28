let renderer, scene, camera, cube1, cube2;

function setup() {
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

    const size = 1;
    const center = 0.75;
    // create a cube geometry
    const geometry = new THREE.BoxGeometry(size, size, size);

    // create a material for the wireframe
    const wireframeMaterial = new THREE.LineDashedMaterial({
        color: 0x000000,
        linewidth: 1,
        scale: 1,
        dashSize: 5,
        gapSize: 3,
    });

    // create a wireframe geometry for the cube
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);

    // create a wireframe object for the cube
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    wireframe.computeLineDistances();

    // create a cube mesh
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.3, wireframe: true});

    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(center, -center, 0);
    // add the wireframe to the cube
    cube1.add(wireframe);
    scene.add(cube1);


    const geometry2 = new THREE.BoxGeometry(size, size, size);
    cube2 = new THREE.Mesh(geometry2, material.clone()); // clone the material so we can adjust it for the second cube
    cube2.material.color.set(0xff4d4d); // change the color of the material for the second cube
    cube2.position.set(-center, center, 0);
    scene.add(cube2);

    function animate() {
        requestAnimationFrame(animate);

        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;

        cube2.rotation.x -= 0.01;
        cube2.rotation.y -= 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

function updateCube(size, center) {
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
        const newSize2 = startSize2 + (size - startSize2) * progress;
        const newX = centerX + (center - centerX) * progress;
        const newY = centerY + (center - centerY) * progress;
        const newZ = centerZ + (center - centerZ) * progress;
        const new2X = center2X + (center - center2X) * progress;
        const new2Y = center2Y + (center - center2Y) * progress;
        const new2Z = center2Z + (center - center2Z) * progress;

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
