import * as THREE from 'three';
import fragmentShader from '@/interactive/equalizer/interactive.equalizer.fragment.glsl?raw';
import vertexShader from '@/interactive/equalizer/interactive.equalizer.vertex.glsl?raw';

export default class InteractiveEqualizer {
  private scene: THREE.Scene | undefined;
  private camera: THREE.Camera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private analyser: THREE.AudioAnalyser | undefined;
  private uniforms: { [key: string]: { value: any } } | undefined;
  private listener: THREE.AudioListener | undefined;
  private audio: THREE.Audio | undefined;
  private mediaAudio: HTMLAudioElement | undefined;
  private isInit = false;

  constructor(private el: HTMLDivElement) {}

  public setAudio(): void {
    if (this.isInit) return;

    this.listener = new THREE.AudioListener();
    this.audio = new THREE.Audio(this.listener);

    const file = 'test.mp3';
    this.mediaAudio = new Audio(file);
    this.mediaAudio
      .play()
      .then(() => {
        if (!this.audio || !this.mediaAudio) return;
        this.audio.setMediaElementSource(this.mediaAudio);
        this.init();
      })
      .catch((e) => {
        this.destroy();
      });
    /**
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      const loader = new THREE.AudioLoader();
      loader.load(file, (buffer) => {
        if (!this.audio) return;
        this.audio.setBuffer(buffer);
        this.audio.play();
        this.init();
      });
    } else {

    }**/
  }

  public init(): void {
    if (this.isInit) return;
    this.isInit = true;
    if (!this.audio) return;

    const fftSize = 32;
    const container = this.el;
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.analyser = new THREE.AudioAnalyser(this.audio, fftSize);
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
    console.log('---> InteractiveEqualizer destroy');
    this.audio?.stop();
    this.audio = undefined;
    this.listener = undefined;

    this.mediaAudio?.pause();
    this.mediaAudio = undefined;

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

    this.isInit = false;
    console.log('InteractiveEqualizer destroyed');
  }
}
