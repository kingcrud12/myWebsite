/**
 * Background 3D - Floating Geometric Shapes
 * Inspired by itssharl.ee
 */

class Background3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.shapes = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
        pointLight2.position.set(-5, -5, 2);
        this.scene.add(pointLight2);

        // Create Shapes
        this.createShapes();

        this.camera.position.z = 5;

        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('resize', () => this.onWindowResize());

        this.animate();
    }

    createShapes() {
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100),
            new THREE.OctahedronGeometry(0.8),
            new THREE.ConeGeometry(0.6, 1.2, 32)
        ];

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: false,
            shininess: 100,
            transparent: true,
            opacity: 0.15
        });

        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.05
        });

        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(geometry, Math.random() > 0.5 ? material : wireframeMaterial);
            
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 5;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            const scale = Math.random() * 0.5 + 0.2;
            mesh.scale.set(scale, scale, scale);
            
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.005,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            this.shapes.push(mesh);
            this.scene.add(mesh);
        }
    }

    onMouseMove(e) {
        this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth mouse follow
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Move camera slightly with mouse
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        const time = performance.now() * 0.001;

        this.shapes.forEach((shape) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            
            // Subtle floating motion
            shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inject background container if it doesn't exist
    if (!document.getElementById('bg-canvas-container')) {
        const bg = document.createElement('div');
        bg.id = 'bg-canvas-container';
        bg.style.position = 'fixed';
        bg.style.top = '0';
        bg.style.left = '0';
        bg.style.width = '100%';
        bg.style.height = '100%';
        bg.style.zIndex = '-1';
        bg.style.pointerEvents = 'none';
        bg.style.background = '#000000'; // Pure black background
        document.body.prepend(bg);
    }
    new Background3D('bg-canvas-container');
});
