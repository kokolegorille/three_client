import { Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const PATH = "../../../../assets/"

export default class Plane {
    constructor(callback) {
        this.file = "plane/microplane.glb"
        this.callback = callback
        this.load()
        this.tmpPos = new Vector3()
    }

    load() {
        const loader = new GLTFLoader().setPath(PATH)
        loader.load(
            this.file,
            gltf => {
                this.plane = gltf.scene
                this.scene = this.plane
                this.propeller = this.plane.getObjectByName("propeller")

                console.log(this)
                this.callback(this)
            },
            xhr => {
                const progress = xhr.loaded / xhr.total
                console.log(xhr.loaded, xhr.total)
                console.log(progress)
            },
            err => {
                console.log(err)
            }
        )
    }

    update(time) {
        this.propeller && this.propeller.rotateZ(1)
    }
}