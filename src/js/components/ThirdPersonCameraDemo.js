import * as THREE from "three"

import BasicCharacterController from "./BasicCharacterController"
import ThirdPersonCamera from "./ThirdPersonCamera"

export default class ThirdPersonCameraDemo {
    constructor(canvas) {
        this._Initialize(canvas)
    }

    _Initialize(canvas) {
        this._threejs = new THREE.WebGLRenderer({
            antialias: true,
        })
        this._threejs.outputEncoding = THREE.sRGBEncoding
        this._threejs.shadowMap.enabled = true
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap
        this._threejs.setPixelRatio(window.devicePixelRatio)
        this._threejs.setSize(window.innerWidth, window.innerHeight)

        canvas.appendChild(this._threejs.domElement)

        window.addEventListener("resize", () => {
            this._OnWindowResize()
        }, false)

        const fov = 60
        const aspect = 1920 / 1080
        const near = 1.0
        const far = 1000.0
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this._camera.position.set(25, 10, 25)

        this._scene = new THREE.Scene()

        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0)
        light.position.set(-100, 100, 100)
        light.target.position.set(0, 0, 0)
        light.castShadow = true
        light.shadow.bias = -0.001
        light.shadow.mapSize.width = 4096
        light.shadow.mapSize.height = 4096
        light.shadow.camera.near = 0.1
        light.shadow.camera.far = 500.0
        light.shadow.camera.near = 0.5
        light.shadow.camera.far = 500.0
        light.shadow.camera.left = 50
        light.shadow.camera.right = -50
        light.shadow.camera.top = 50
        light.shadow.camera.bottom = -50
        this._scene.add(light)

        light = new THREE.AmbientLight(0xFFFFFF, 0.25)
        this._scene.add(light)

        const loader = new THREE.CubeTextureLoader()
        const texture = loader.load([
            "../../../assets/posx.jpg",
            "../../../assets/negx.jpg",
            "../../../assets/posy.jpg",
            "../../../assets/negy.jpg",
            "../../../assets/posz.jpg",
            "../../../assets/negz.jpg",
        ])
        texture.encoding = THREE.sRGBEncoding
        this._scene.background = texture

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0x808080,
            }))
        plane.castShadow = false
        plane.receiveShadow = true
        plane.rotation.x = -Math.PI / 2
        this._scene.add(plane)

        this._mixers = []
        this._previousRAF = null

        this._LoadAnimatedModel()
        this._RAF()
    }

    _LoadAnimatedModel() {
        const params = {
            camera: this._camera,
            scene: this._scene,
        }
        this._controls = new BasicCharacterController(params)

        this._thirdPersonCamera = new ThirdPersonCamera({
            camera: this._camera,
            target: this._controls,
        })
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight
        this._camera.updateProjectionMatrix()
        this._threejs.setSize(window.innerWidth, window.innerHeight)
    }

    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t
            }

            this._RAF()

            this._threejs.render(this._scene, this._camera)
            this._Step(t - this._previousRAF)
            this._previousRAF = t
        })
    }

    _Step(timeElapsed) {
        const timeElapsedS = timeElapsed * 0.001
        if (this._mixers) {
            this._mixers.map(m => m.update(timeElapsedS))
        }

        if (this._controls) {
            this._controls.Update(timeElapsedS)
        }

        this._thirdPersonCamera.Update(timeElapsedS)
    }
}


// function _LerpOverFrames(frames, t) {
//     const s = new THREE.Vector3(0, 0, 0);
//     const e = new THREE.Vector3(100, 0, 0);
//     const c = s.clone();
  
//     for (let i = 0; i < frames; i++) {
//       c.lerp(e, t);
//     }
//     return c;
//   }
  
//   function _TestLerp(t1, t2) {
//     const v1 = _LerpOverFrames(100, t1);
//     const v2 = _LerpOverFrames(50, t2);
//     console.log(v1.x + ' | ' + v2.x);
//   }
  
//   _TestLerp(0.01, 0.01);
//   _TestLerp(1.0 / 100.0, 1.0 / 50.0);
//   _TestLerp(1.0 - Math.pow(0.3, 1.0 / 100.0), 
//             1.0 - Math.pow(0.3, 1.0 / 50.0));