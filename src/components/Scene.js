import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.cubes = []
  }


  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize( window.innerWidth, window.innerHeight );

    const cubeOne = this.createCube([0.8, 1, 1, 2,2], 'blue')
    const cubeTwo = this.createCube([1, 0.5, 1, 2], 'purple')
    const cubeThree = this.createCube([1, 0.5, 1.5, 3], 'green')
    
    camera.position.z = 4
    scene.add(cubeOne)
    scene.add(cubeTwo)
    scene.add(cubeThree)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)
    
    this.camera = camera
    this.scene = scene
    this.renderer = renderer

    this.cube = cubeOne;
    this.cubes.push(cubeOne);
    this.cubes.push(cubeTwo);
    this.cubes.push(cubeThree);
    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  createCube(x, colour) {
    let geometry = new THREE.BoxGeometry(...x);
    let material = new THREE.MeshBasicMaterial({ color: colour });
    return new THREE.Mesh(geometry, material);
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
    this.cubes.map((cube, i) => {
      cube.rotation.x += 0.01 + i * 0.02
      cube.rotation.y += 0.01 + i * 0.02
    });

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene