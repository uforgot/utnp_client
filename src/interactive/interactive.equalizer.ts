import * as THREE from 'three';
import fragmentShader from '@/interactive/equalizer/interactive.equalizer.fragment.glsl?raw';
import vertexShader from '@/interactive/equalizer/interactive.equalizer.vertex.glsl?raw';

export default class InteractiveEqualizer {
  private scene: THREE.Scene | undefined;
  private camera: THREE.Camera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private analyser: THREE.AudioAnalyser | undefined;
  private uniforms: { [key: string]: { value: any } } | undefined;

  constructor(private el: HTMLDivElement) {}

  public init(): void {
    const fftSize = 32;
    const container = this.el;
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    const listener = new THREE.AudioListener();
    const audio = new THREE.Audio(listener);

    const file = 'test.mp3';

    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      const loader = new THREE.AudioLoader();
      loader.load(file, function (buffer) {
        audio.setBuffer(buffer);
        audio.play();
      });
    } else {
      const mediaElement = new Audio(file);
      mediaElement.play().then(() => {});

      audio.setMediaElementSource(mediaElement);
    }
    this.analyser = new THREE.AudioAnalyser(audio, fftSize);
    this.uniforms = {
      tAudioData: {
        value: new THREE.DataTexture(
          this.analyser.data,
          fftSize / 2,
          1,
          THREE.RedFormat
        ),
      },
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      container.getBoundingClientRect().width,
      container.getBoundingClientRect().height
    );
    this.renderer.setAnimationLoop(this.animate);
    container.appendChild(this.renderer.domElement);
  }

  private animate = () => {
    if (this.renderer === undefined) return;
    if (this.scene === undefined) return;
    if (this.camera === undefined) return;
    if (this.analyser === undefined) return;
    if (this.uniforms === undefined) return;

    this.analyser.getFrequencyData();
    this.uniforms.tAudioData.value.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  };

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      this.scene = undefined;
    }
    this.camera = undefined;
    this.analyser = undefined;
    this.uniforms = undefined;
    this.el.innerHTML = '';
    console.log('InteractiveEqualizer destroyed');
  }
}
