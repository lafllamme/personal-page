<script setup>
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

// Get reactive window size
const { width, height } = useWindowSize()

const shaderContainer = ref(null)
let scene, camera, renderer, material, mesh
const startTime = Date.now()
const isLoaded = ref(true)
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const breakpoints = useBreakpoints(breakpointsTailwind)
const aspectRatio = computed(() => width.value / height.value)

const smallerMD = breakpoints.smaller('md')
const isSafari = computed(() => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent))

watch(() => smallerMD.value, (value) => {
  console.debug('[Background] => smallerMD:', value)
})
console.debug('[Background] => isDark:', isDark.value)

/**
 * Computes dynamic offset based on aspect ratio.
 */
function computeDynamicOffset() {
  let baseOffsetX = 0.7 // Base horizontal offset
  let baseOffsetY = 0.35 // Base vertical offset

  if (isSafari.value) {
    console.log('[Background] => Safari detected, adjusting offset')
    baseOffsetX *= 0.65
    baseOffsetY *= 0.65
  }

  console.log('[Background] => aspectRatio:', aspectRatio.value)
  // Dynamically adjust based on aspect ratio
  if (aspectRatio.value > 1.5) {
    return [baseOffsetX, baseOffsetY] // Desktop widescreen
  }
  else if (aspectRatio.value > 1.2) {
    return [baseOffsetX * 0.8, baseOffsetY * 1.1] // Tablet adjustment
  }
  else {
    return [baseOffsetX * 0.95, baseOffsetY * 3.5] // Mobile, more shift needed
  }
}

/**
 * Initializes the Three.js scene and applies the shader.
 */
function init() {
  if (!shaderContainer.value)
    return

  const container = shaderContainer.value
  const aspect = width.value / height.value

  // Clean up previous instances
  if (renderer) {
    container.removeChild(renderer.domElement)
    renderer.dispose()
  }

  // Create Three.js Scene and Camera
  scene = new Scene()
  camera = new PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.z = 1.2 // Adjusted for better centering

  // Setup WebGL Renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width.value, height.value)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Calculate dynamic offset
  const dynOffset = computeDynamicOffset()

  // Vertex Shader (Pass-through)
  const vertexShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Palettes for dark/light
  const darkShades = `
    #define COLOUR_1 vec4(0.298, 0.733, 0.647, 1.0)
    #define COLOUR_2 vec4(0.0, 0.282, 0.345, 1.0)
    #define COLOUR_3 vec4(0.02, 0.02, 0.02, 1.0)
  `
  const lightShades = `
    #define COLOUR_1 vec4(0.0, 0.439, 0.373, 1.0)
    #define COLOUR_2 vec4(0.0, 0.412, 0.502, 1.0)
    #define COLOUR_3 vec4(0.941, 0.941, 0.941, 1.0)
  `

  // Fragment Shader
  const fragmentShader = `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform vec2 dynamicOffset;
    uniform vec2 iMouse;

    #define SPIN_ROTATION -2.0
    #define SPIN_SPEED 7.0
    ${isDark.value ? darkShades : lightShades}
    #define CONTRAST 3.5
    #define LIGTHING 0.4
    #define SPIN_AMOUNT 0.25
    #define PIXEL_FILTER 1000.0
    #define SPIN_EASE 1.0
    #define PI 3.14159265359
    #define IS_ROTATE false

    // Helper: localized swirl around the mouse
    // Only warps uv if distance < swirlRadius
    vec2 localSwirl(vec2 uv, vec2 center, float swirlRadius, float swirlStrength, float time) {
      float dist = distance(uv, center);
      if (dist < swirlRadius) {
        // fade from 0..1 as you go from swirlRadius -> center
        float t = 1.0 - (dist / swirlRadius);
        // swirl angle gets bigger near the center
        float angle = swirlStrength * t * t;  // subtle fade
        // optionally add a tiny time-based wiggle
        angle += 0.2 * sin(time + dist * 10.0);

        float s = sin(angle);
        float c = cos(angle);

        // rotate uv around the center
        vec2 fromCenter = uv - center;
        uv = center + mat2(c, -s, s, c) * fromCenter;
      }
      return uv;
    }

    vec4 effect(vec2 screenSize, vec2 screen_coords) {
        float pixel_size = length(screenSize.xy) / PIXEL_FILTER;

        // Base swirl UV
        vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size
                   - 0.5 * screenSize.xy) / length(screenSize.xy)
                   - dynamicOffset;

        float uv_len = length(uv);

        float speed = (SPIN_ROTATION * SPIN_EASE * 0.2);
        if(IS_ROTATE){
           speed = iTime * speed;
        }
        speed += 302.2;

        float new_pixel_angle = atan(uv.y, uv.x)
          + speed
          - SPIN_EASE * 20.0
            * (SPIN_AMOUNT * uv_len + (1.0 - SPIN_AMOUNT));

        vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
        uv = vec2(uv_len * cos(new_pixel_angle) + mid.x,
                  uv_len * sin(new_pixel_angle) + mid.y)
             - mid;

        uv *= 30.0;
        speed = iTime * SPIN_SPEED;
        vec2 uv2 = vec2(uv.x + uv.y);

        // Original swirl "paint" loop
        for(int i = 0; i < 5; i++) {
            uv2 += sin(max(uv.x, uv.y)) + uv;
            uv  += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
                              sin(uv2.x - 0.113 * speed));
            uv  -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
        }

        // ========== Local swirl near mouse (subtle) ==========
        // Shift iMouse from [0..1] to ~[-0.5..+0.5]
        vec2 mouse = iMouse - 0.5;
        // radius in UV space (try 0.25)
        // strength (try 2.0 or 3.0)
        uv = localSwirl(uv, mouse, 0.25, 2.0, iTime);
        // =====================================================

        float contrast_mod = (0.25 * CONTRAST + 0.5 * SPIN_AMOUNT + 1.2);
        float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
        float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
        float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
        float c3p = 1.0 - min(1.0, c1p + c2p);
        float light = (LIGTHING - 0.2) * max(c1p * 5.0 - 4.0, 0.0)
                    + LIGTHING * max(c2p * 5.0 - 4.0, 0.0);

        return (0.3 / CONTRAST) * COLOUR_1
               + (1.0 - 0.3 / CONTRAST) * (
                    COLOUR_1 * c1p
                    + COLOUR_2 * c2p
                    + vec4(c3p * COLOUR_3.rgb, c3p * COLOUR_1.a)
                 )
               + light;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        fragColor = effect(iResolution.xy, uv * iResolution.xy);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `

  material = new ShaderMaterial({
    uniforms: {
      iResolution: { value: new Vector3(width.value, height.value, 1) },
      iTime: { value: 0 },
      iMouse: { value: new Vector2(0.5, 0.5) }, // Start in center
      dynamicOffset: { value: new Vector2(...dynOffset) },
    },
    vertexShader,
    fragmentShader,
  })

  // Plane geometry
  const scale = 2
  const geometry = new PlaneGeometry(scale * aspect, scale)
  mesh = new Mesh(geometry, material)
  scene.add(mesh)

  // Mouse listener
  if (!window.__bgMouseListener) {
    window.__bgMouseListener = true
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / width.value
      const y = 1.0 - (e.clientY / height.value) // flip Y
      material.uniforms.iMouse.value.set(x, y)
    })
  }
}

/**
 * Animation loop to update the shader time.
 */
function animate() {
  requestAnimationFrame(animate)
  material.uniforms.iTime.value = (Date.now() - startTime) * 0.001
  renderer.render(scene, camera)
}

/**
 * Updates the Three.js scene on window resize.
 */
function updateCanvas() {
  if (!shaderContainer.value)
    return

  const aspect = width.value / height.value
  camera.aspect = aspect
  camera.updateProjectionMatrix()

  renderer.setSize(width.value, height.value)
  material.uniforms.iResolution.value.set(width.value, height.value, 1)

  // Update dynamic offset on resize
  material.uniforms.dynamicOffset.value.set(...computeDynamicOffset())

  // Adjust plane geometry dynamically
  const scale = 2.5
  mesh.geometry.dispose()
  mesh.geometry = new PlaneGeometry(scale * aspect, scale)

  initShaders()
}

function initShaders() {
  init()
  animate()
  isLoaded.value = true
  window.addEventListener('resize', updateCanvas)
}

// Watch for window size changes
watch([width, height], updateCanvas)

onMounted(() => {
  initShaders()
  window.addEventListener('resize', updateCanvas)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvas)
  if (renderer)
    renderer.dispose()
})

watch(isDark, () => {
  initShaders()
})
</script>

<template>
  <div ref="shaderContainer" />
</template>
