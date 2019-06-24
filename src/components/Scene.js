import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }


  componentDidMount() {
    console.log(this.mount)
    console.log(this.mount.clientHeight)
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    scene.background = 'white';
    const camera = new THREE.PerspectiveCamera(
      70,
      width / height,
      2,
      6
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize( width, height );
    camera.position.z = 3.2

    let spiral = new THREE.Line(
      new THREE.Geometry(), new THREE.LineBasicMaterial({color: 'red'}));
    spiral.geometry.dynamic = true;
    this.spiral = spiral;

    let spiralTwo = new THREE.Line(
      new THREE.Geometry(), new THREE.LineBasicMaterial({color: 'black'}));
    spiralTwo.geometry.dynamic = true;
    this.spiralTwo = spiralTwo

    let spiralThree = new THREE.Line(
      new THREE.Geometry(), new THREE.LineBasicMaterial({color: 'red'}));
    spiralThree.geometry.dynamic = true;
    this.spiralThree = spiralThree
    // ES6 Math polyfill
    let tanh = Math.tanh || function tanh(x) {
      return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    };
    let cosh = Math.cosh || function cosh(x) {
      return (Math.exp(x) + Math.exp(-x)) / 2;
    };
    let sinh = Math.sinh || function sinh(x) {
      return (Math.exp(x) - Math.exp(-x)) / 2;
    };
    // sphere spiral
    let sz = 16, cxy = 100, cz = cxy * sz;
    let hxy = Math.PI ** 2, hz = Math.PI / 1000;
    let r = 1.2;
    for (let i = -cz; i < cz; i++) {
      let lxy = i * hxy;
      let lz = i * hz;
      let rxy = r /  cosh(lz);
      let x = rxy * Math.cos(lxy);
      let y = rxy * Math.sin(lxy);
      let z = r * tanh(lz);
      spiral.geometry.vertices.push(new THREE.Vector3(x, y, z));
      spiralTwo.geometry.vertices.push((new THREE.Vector3(x*1.007, y*1.007, z*1.007)));
      spiralThree.geometry.vertices.push((new THREE.Vector3(x*.999, y*.999, z*.999)));
    }
    scene.add(spiralThree);
    scene.add(spiralTwo);
    scene.add(spiral);
    spiralTwo.rotation.set(0, 30, 0)
    spiralThree.rotation.set(0, 30, 0)
    spiral.rotation.set(0, 30, 0)
    // spiral.position.set(0.1, 0, 0)
    renderer.setSize(width, height)

    const lightIn = new THREE.PointLight("#4CAF50", 30);
    const lightOut = new THREE.PointLight("#2196F3", 10);
    lightOut.position.set(40,20,40);

    scene.add(lightIn);
    scene.add(lightOut);

    this.camera = camera
    this.scene = scene
    this.renderer = renderer


    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.spiral.rotation.z += 0.05;
    this.spiralTwo.rotation.z += 0.05001;
    this.spiralThree.rotation.z += 0.05001;
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '600px', height: '600px',  flexGrow: '3'}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene