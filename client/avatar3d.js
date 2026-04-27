/**
 * Avatar 3D Haute Définition (FBX) - Breakdance Solo
 */

class Avatar3D {
    constructor(containerId, modelPath) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.modelPath = modelPath;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.avatar = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        
        this.init();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Lumières Studio
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(2, 2, 4);
        this.scene.add(keyLight);

        const rimLight = new THREE.SpotLight(0xffffff, 2);
        rimLight.position.set(0, 5, -5);
        this.scene.add(rimLight);

        const loader = new THREE.FBXLoader();
        
        const loaderMsg = document.createElement('div');
        loaderMsg.id = 'avatar-loader';
        loaderMsg.className = 'absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 rounded-3xl';
        loaderMsg.innerHTML = '<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div><span class="text-white font-medium" id="loader-text">Chargement de la danse...</span></div>';
        this.container.appendChild(loaderMsg);
        this.loaderText = document.getElementById('loader-text');

        loader.load(
            this.modelPath,
            (object) => {
                this.avatar = object;

                // Calcul automatique de l'échelle
                const box = new THREE.Box3().setFromObject(this.avatar);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 4.5 / maxDim;
                this.avatar.scale.set(scale, scale, scale);

                // Centrage
                const updatedBox = new THREE.Box3().setFromObject(this.avatar);
                const center = updatedBox.getCenter(new THREE.Vector3());
                this.avatar.position.x = -center.x;
                this.avatar.position.y = -updatedBox.min.y - 2.5;
                this.avatar.position.z = -center.z;

                // Ombres
                this.avatar.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Animation
                this.mixer = new THREE.AnimationMixer(this.avatar);
                if (this.avatar.animations && this.avatar.animations.length > 0) {
                    const action = this.mixer.clipAction(this.avatar.animations[0]);
                    action.play();
                }

                this.scene.add(this.avatar);
                loaderMsg.style.display = 'none';
            },
            (xhr) => {
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                this.loaderText.innerText = `Chargement : ${percent}%`;
            },
            (error) => {
                console.error('Erreur FBX:', error);
                this.loaderText.innerHTML = `<span class="text-red-400">Erreur de chargement</span>`;
            }
        );

        this.camera.position.z = 8.5;
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('resize', () => this.onWindowResize());

        this.animate();
    }

    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.targetRotation.y = this.mouse.x * 0.3;
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);

        if (this.avatar) {
            this.avatar.rotation.y += (this.targetRotation.y - this.avatar.rotation.y) * 0.05;
            
            // Verrouillage au centre
            this.avatar.position.x = 0;
            this.avatar.position.z = 0;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Avatar3D('avatar-container', 'Breakdance Uprock Var 2.fbx');
});
