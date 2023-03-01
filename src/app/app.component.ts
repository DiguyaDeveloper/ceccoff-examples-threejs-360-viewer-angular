import * as THREE from 'three';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) private canvasRef: ElementRef;

  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private panorama: THREE.Mesh;
  private controls: OrbitControls;

  constructor() {}

  ngOnInit() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createPanorama();
    this.animate();
  }



  private createScene() {
    this.scene = new THREE.Scene();
  }

  private createCamera() {
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set( 10, 1, 5 );
    this.camera.lookAt( 0, 5, 0 );
  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  }

  private createPanorama() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'assets/image/IMG_20230205_212602_00_merged.jpg',
      (texture) => {
        texture.mapping = THREE.UVMapping;
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ map: texture });

        this.panorama = new THREE.Mesh(geometry, material);
        this.scene.add(this.panorama);
      },
      (err) => {
        console.error('Error loading panorama', err);
      }
    );

  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}
