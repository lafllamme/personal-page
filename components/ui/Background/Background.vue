<script setup>
import { useWindowSize } from '@vueuse/core'
import { Mesh, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, Vector3, WebGLRenderer } from 'three'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const shaderContainer = ref(null)
let scene, camera, renderer, material, mesh
const startTime = Date.now()

// Mit useWindowSize hast du reactive window width/height (optional, falls du später dynamisch darauf reagieren willst)
const { width, height } = useWindowSize()

// Initialisierung der Three.js-Szene und des Shaders
function init() {
  const container = shaderContainer.value
  const w = width.value
  const h = height.value

  console.log('w:', w, 'h:', h)

  scene = new Scene()

  camera = new PerspectiveCamera(75, w / h, 0.1, 1000)
  camera.position.z = 1

  // Renderer mit transparentem Hintergrund (alpha: true) – so sieht der Canvas keine schwarze Clear-Farbe
  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0) // Clear-Farbe Schwarz, aber 0 Alpha (volltransparent)
  container.appendChild(renderer.domElement)

  // Standard-Vertex-Shader
  const vertexShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Fragment-Shader (dein Shadertoy-Code)
  const fragmentShader = `
    uniform vec3 iResolution;
    uniform float iTime;

    #define SPIN_ROTATION -2.0
    #define SPIN_SPEED 7.0
    #define OFFSET vec2(0.0)
    #define COLOUR_1 vec4(0.871, 0.267, 0.231, 1.0)
    #define COLOUR_2 vec4(0.0, 0.42, 0.706, 1.0)
    #define COLOUR_3 vec4(0.086, 0.137, 0.145, 1.0)
    #define CONTRAST 3.5
    #define LIGTHING 0.4
    #define SPIN_AMOUNT 0.25
    #define PIXEL_FILTER 1100.0
    #define SPIN_EASE 1.0
    #define PI 3.14159265359
    #define IS_ROTATE false

    vec4 effect(vec2 screenSize, vec2 screen_coords) {
        float pixel_size = length(screenSize.xy) / PIXEL_FILTER;
        vec2 uv = (floor(screen_coords.xy*(1.0/pixel_size))*pixel_size - 0.5*screenSize.xy) / length(screenSize.xy) - OFFSET;
        float uv_len = length(uv);

        float speed = (SPIN_ROTATION * SPIN_EASE * 0.2);
        if(IS_ROTATE){
           speed = iTime * speed;
        }
        speed += 302.2;
        float new_pixel_angle = atan(uv.y, uv.x) + speed - SPIN_EASE * 20.0 * (SPIN_AMOUNT * uv_len + (1.0 - SPIN_AMOUNT));
        vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
        uv = vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid;

        uv *= 30.0;
        speed = iTime * SPIN_SPEED;
        vec2 uv2 = vec2(uv.x + uv.y);

        for(int i = 0; i < 5; i++) {
            uv2 += sin(max(uv.x, uv.y)) + uv;
            uv  += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
                               sin(uv2.x - 0.113 * speed));
            uv  -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
        }

        float contrast_mod = (0.25 * CONTRAST + 0.5 * SPIN_AMOUNT + 1.2);
        float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
        float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
        float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
        float c3p = 1.0 - min(1.0, c1p + c2p);
        float light = (LIGTHING - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + LIGTHING * max(c2p * 5.0 - 4.0, 0.0);
        return (0.3 / CONTRAST) * COLOUR_1 + (1.0 - 0.3 / CONTRAST) *
               (COLOUR_1 * c1p + COLOUR_2 * c2p + vec4(c3p * COLOUR_3.rgb, c3p * COLOUR_1.a)) + light;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        fragColor = effect(iResolution.xy, uv * iResolution.xy);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `

  // ShaderMaterial mit den benötigten Uniforms
  material = new ShaderMaterial({
    uniforms: {
      iResolution: { value: new Vector3(w, h, 1) },
      iTime: { value: 0 },
    },
    vertexShader,
    fragmentShader,
  })

  // Erstellen einer vollflächigen Plane, auf die der Shader angewandt wird
  const geometry = new PlaneGeometry(2, 2)
  mesh = new Mesh(geometry, material)
  scene.add(mesh)
}

function animate() {
  requestAnimationFrame(animate)
  material.uniforms.iTime.value = (Date.now() - startTime) * 0.001 // iTime in Sekunden
  renderer.render(scene, camera)
}

function onWindowResize() {
  const container = shaderContainer.value
  const w = width.value
  const h = height.value
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  material.uniforms.iResolution.value.set(w, h, 1)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <!-- Der Container nimmt dank Tailwind/UnoCSS die gesamte Ansicht ein und ist nicht klickbar -->
  <div ref="shaderContainer" class="h-full w-full" />
</template>
