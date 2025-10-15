import * as THREE from 'three';
import fragmentShader from '@/interactive/stage/interactive.stage.fragment_4.glsl?raw';
import vertexShader from '@/interactive/stage/interactive.stage.vertex.glsl?raw';
import { MeshBasicMaterial } from 'three';
import Constant from '@/constant/constant.ts';
import Address from '@/address.ts';

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj) as any;
  if (Array.isArray(obj)) return obj.map(deepClone) as any;

  const cloned: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone((obj as any)[key]);
    }
  }
  return cloned;
}

export default class InteractiveStage {
  private intervalId = 0;

  private isInit = false;
  private time = 0;
  private audioCtx: AudioContext | undefined;
  private analyser: AnalyserNode | undefined;
  private audioData: Uint8Array<ArrayBuffer> | undefined;
  private audioDataForSend: Array<any> = [];

  private scene: THREE.Scene | undefined;
  private camera: THREE.Camera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private uniforms: { [key: string]: { value: any } } | undefined;

  constructor(private el: HTMLDivElement) {
    Address.getInstance().setInteractiveStage(this);
  }

  public setStart = () => {
    if (this.isInit) return;
    this.init();
  };

  public setSave = () => {
    return JSON.stringify(this.audioDataForSend);
  };

  public init(): void {
    this.destroy();
    // const audioCtx = new window.AudioContext();
    // audioCtx.resume().then(() => {
    this.setMic();
    console.log('Playback resumed successfully');
    // });
  }

  private setMic(): void {
    this.audioCtx = new AudioContext();

    //@ts-ignore
    //prettier-ignore
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    //@ts-ignore
    if (navigator.getUserMedia) {
      //@ts-ignore
      navigator.getUserMedia(
        { audio: true, video: false },
        //@ts-ignore
        (stream) => {
          if (!this.audioCtx) return;
          this.analyser = this.audioCtx.createAnalyser();
          const source = this.audioCtx.createMediaStreamSource(stream);

          source.connect(this.analyser);
          this.analyser.fftSize = 128;
          this.audioData = new Uint8Array(this.analyser.frequencyBinCount);

          this.createScene();
        },
        () => {
          console.warn('Analyser error');
        }
      );
    } else {
      // alert('mic not supported');
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          if (!this.audioCtx) return;
          this.analyser = this.audioCtx.createAnalyser();
          const source = this.audioCtx.createMediaStreamSource(stream);

          source.connect(this.analyser);
          this.analyser.fftSize = 128;
          this.audioData = new Uint8Array(this.analyser.frequencyBinCount);

          this.createScene();
        });
    }
  }

  private createScene() {
    if (!this.analyser) return;

    this.scene = new THREE.Scene();
    // this.camera = new THREE.Camera();
    this.camera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near,
      1 // far
    );

    this.uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      iChannel0: {
        value: new THREE.DataTexture(
          this.audioData,
          this.analyser.fftSize / 2,
          1,
          THREE.RedFormat,
          THREE.UnsignedByteType
        ),
      },
    };
    const plane = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: this.uniforms,
    });
    this.scene.add(new THREE.Mesh(plane, material));

    const debugMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.2, 1),
      new MeshBasicMaterial({
        color: 0x00ff00,
      })
    );

    debugMesh.position.set(0.9, 0, 0);
    // this.scene.add(debugMesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(1.0);
    this.renderer.setSize(
      this.el.getBoundingClientRect().width,
      this.el.getBoundingClientRect().height
    );
    // this.renderer.setAnimationLoop(this.animate);
    this.el.appendChild(this.renderer.domElement);
    this.intervalId = window.setInterval(this.animate, 1000 / Constant.FPS);
  }

  private animate = () => {
    if (this.renderer === undefined) return;
    if (this.scene === undefined) return;
    if (this.camera === undefined) return;
    if (this.analyser === undefined) return;
    if (this.uniforms === undefined) return;
    if (this.audioData === undefined) return;

    this.analyser.getByteFrequencyData(this.audioData);
    this.uniforms.iTime.value = this.time += 0.01;
    this.uniforms.iResolution.value.set(
      this.el.getBoundingClientRect().width,
      this.el.getBoundingClientRect().height,
      1
    );

    // const data = new THREE.DataTexture(
    //   this.audioData,
    //   this.analyser.fftSize / 2,
    //   1,
    //   THREE.RedFormat,
    //   THREE.UnsignedByteType
    // );

    this.uniforms.iChannel0.value.needsUpdate = true;
    const item = deepClone(this.audioData);
    const tmpItem: Array<number> = Array.isArray(item)
      ? item
      : Object.values(item);
    this.audioDataForSend.push(tmpItem);
    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    this.isInit = false;
    this.audioDataForSend = [];

    console.log('Destroy');
    window.clearInterval(this.intervalId);

    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.el.removeChild(this.renderer.domElement);
      this.renderer.dispose();
      this.renderer = undefined;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = undefined;
      this.analyser = undefined;
      this.audioData = undefined;
    }
    this.scene = undefined;
    this.camera = undefined;
    this.uniforms = undefined;
    this.time = 0;
  }
}
