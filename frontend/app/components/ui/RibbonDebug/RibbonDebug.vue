<script setup lang="ts">
  import consola from 'consola'
  import {
    CanvasTexture,
    ClampToEdgeWrapping,
    Color,
    DoubleSide,
    DynamicDrawUsage,
    InstancedBufferAttribute,
    InstancedMesh,
    LinearFilter,
    Matrix4,
    MeshBasicMaterial,
    PlaneGeometry,
    SRGBColorSpace,
  } from 'three'
  import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
  
  const props = withDefaults(defineProps<{
    full?: boolean
    height?: number
  }>(), {
    full: true,
    height: 520,
  })
  
  /**
   * SSR guard
   */
  const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
  
  const ready = ref(false)
  const dpr = ref(1.5)
  
  /**
   * Ribbon text and length
   */
  const ribbonText = ref(
    (' THE SEA IS A DESERT OF WAVES, A WILDERNESS OF WATER.').repeat(5).slice(0, 160),
  )
  const runLength = computed(() => Math.max(1, ribbonText.value.length))
  
  /**
   * Streamers preset params
   */
  const segmentSpace = ref(23)
  const segmentCount = ref(22)
  const depth = ref(56)
  const middleStretch = ref(0)
  const speed = ref(0.4)
  const count = ref(4)
  const zSpace = ref(1.62)
  const xSpace = ref(1.3)
  const alt = ref(false)
  
  /**
   * Debug scale and shift
   */
  const scaler = ref(0.017)
  const groupScale = computed(() => [scaler.value, scaler.value, scaler.value] as const)

  const shiftX = ref(2)
  const shiftY = ref(3)
  const shiftZ = ref(7)
  const groupPos = computed(() => [shiftX.value, shiftY.value, shiftZ.value] as const)
  
  /**
   * Camera and group rotation
   */
  const camX = ref(10)
  const camY = ref(12)
  const camZ = ref(29.75)
  const fov = ref(28)

  const rotX = ref(1.74)
  const rotY = ref(0.48)
  const rotZ = ref(6.28)
  
  const timeScale = ref(1)
  
  const cameraPos = computed(() => [camX.value, camY.value, camZ.value] as const)
  const groupRot = computed(() => [rotX.value, rotY.value, rotZ.value] as const)
  
  
  /**
   * Visual styling controls
   */
  const bgA = ref('#0b1020')
  const bgB = ref('#23103a')
  const bgC = ref('#0b2a2a')
  
  const col1 = ref('#FFFC79')
  const col2 = ref('#FF2F92')
  const col3 = ref('#011993')
  const col4 = ref('#0096FF')

  const showText = ref(false)
  const textColor = ref('#ffffff')
  const textOpacity = ref(0.95)
  const textSize = ref(92)
  const textStroke = ref(10)
  const showSegmentFrame = ref(true)
  const frameStrength = ref(0.25)
  const showBands = ref(true)
  const bandStrength = ref(0.18)

  const logState = () => {
    consola.info(
      '[RibbonDebug]',
      `cam (${camX.value.toFixed(2)}, ${camY.value.toFixed(2)}, ${camZ.value.toFixed(2)}) fov ${fov.value.toFixed(1)} | rot (${rotX.value.toFixed(2)}, ${rotY.value.toFixed(2)}, ${rotZ.value.toFixed(2)}) | scale ${scaler.value.toFixed(4)} | shift (${shiftX.value.toFixed(2)}, ${shiftY.value.toFixed(2)}, ${shiftZ.value.toFixed(2)}) | motion speed ${speed.value.toFixed(2)} time ${timeScale.value.toFixed(2)} alt ${alt.value ? 1 : 0} | segs space ${segmentSpace.value} count ${segmentCount.value} depth ${depth.value} mid ${middleStretch.value} xSpace ${xSpace.value} zSpace ${zSpace.value} | text ${showText.value ? 1 : 0} size ${textSize.value} stroke ${textStroke.value} opacity ${textOpacity.value.toFixed(2)} | colors c1 ${col1.value} c2 ${col2.value} c3 ${col3.value} c4 ${col4.value} bg (${bgA.value}, ${bgB.value}, ${bgC.value}) | frame ${showSegmentFrame.value ? frameStrength.value.toFixed(2) : 0} bands ${showBands.value ? bandStrength.value.toFixed(2) : 0} | runLen ${runLength.value} textLen ${ribbonText.value.length}`,
    )
  }

  watch([
    camX, camY, camZ, fov, rotX, rotY, rotZ, scaler, shiftX, shiftY, shiftZ,
    speed, timeScale, alt,
    segmentSpace, segmentCount, depth, middleStretch, xSpace, zSpace, count,
    ribbonText, showText, textColor, textOpacity, textSize, textStroke,
    showSegmentFrame, frameStrength, showBands, bandStrength,
    col1, col2, col3, col4, bgA, bgB, bgC,
  ], () => {
    logState()
  }, { immediate: true })
  
  const instanced = shallowRef<InstancedMesh | null>(null)
  const segGeomRef = shallowRef<PlaneGeometry | null>(null)
  
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    side: DoubleSide,
  })
  
  /**
   * Canvas based typography texture (SSR safe)
   * Created ONLY on client (onMounted). On SSR these stay null.
   */
  const textCanvas = shallowRef<HTMLCanvasElement | null>(null)
  const textCtx = shallowRef<CanvasRenderingContext2D | null>(null)
  const textTex = shallowRef<CanvasTexture | null>(null)
  
  function ensureTextTexture() {
    if (!isClient) return
    if (textTex.value && textCanvas.value && textCtx.value) return
  
    const c = document.createElement('canvas')
    c.width = 4096
    c.height = 256
    const ctx = c.getContext('2d')
    if (!ctx) return
  
    const tex = new CanvasTexture(c)
    tex.colorSpace = SRGBColorSpace
    tex.wrapS = ClampToEdgeWrapping
    tex.wrapT = ClampToEdgeWrapping
    tex.minFilter = LinearFilter
    tex.magFilter = LinearFilter
    tex.needsUpdate = true
  
    textCanvas.value = c
    textCtx.value = ctx
    textTex.value = tex
  }
  
  function drawTextTexture() {
    if (!isClient) return
    ensureTextTexture()
  
    const c = textCanvas.value
    const ctx = textCtx.value
    const tex = textTex.value
    if (!c || !ctx || !tex) return
  
    const w = c.width
    const h = c.height
  
    ctx.clearRect(0, 0, w, h)
  
    if (!showText.value) {
      tex.needsUpdate = true
      return
    }
  
    const size = Math.max(10, Math.floor(textSize.value))
    const stroke = Math.max(0, Math.floor(textStroke.value))
  
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.font = `800 ${size}px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
  
    const y = Math.floor(h * 0.52)
    const s = ribbonText.value
    const pad = Math.max(40, Math.floor(size * 0.6))
  
    const widthOne = Math.max(1, ctx.measureText(s).width + pad)
    const repeats = Math.ceil(w / widthOne) + 2
  
    const fill = new Color(textColor.value)
    const fillCss = `rgba(${Math.floor(fill.r * 255)}, ${Math.floor(fill.g * 255)}, ${Math.floor(fill.b * 255)}, ${Math.min(1, Math.max(0, textOpacity.value))})`
  
    for (let i = 0; i < repeats; i++) {
      const x = i * widthOne
  
      if (stroke > 0) {
        ctx.lineWidth = stroke
        ctx.strokeStyle = 'rgba(0,0,0,0.55)'
        ctx.strokeText(s, x, y)
      }
  
      ctx.fillStyle = fillCss
      ctx.fillText(s, x, y)
    }
  
    ctx.restore()
    tex.needsUpdate = true
  }
  
  watch([ribbonText, showText, textColor, textOpacity, textSize, textStroke], () => {
    // SSR safe: no-op on server
    drawTextTexture()
  })
  
  /**
   * Shader injection for per segment gradient and per segment text sampling
   * SSR safe: only runs on client, and uses textTex.value (created in ensureTextTexture)
   */
  onMounted(() => {
    ensureTextTexture()
  
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uScroll = { value: 0 }
      shader.uniforms.uRunLength = { value: runLength.value }
  
      shader.uniforms.uCol1 = { value: new Color(col1.value) }
      shader.uniforms.uCol2 = { value: new Color(col2.value) }
      shader.uniforms.uCol3 = { value: new Color(col3.value) }
      shader.uniforms.uCol4 = { value: new Color(col4.value) }
  
      shader.uniforms.uTextMap = { value: textTex.value } // may be null briefly, we keep updating in loop
      shader.uniforms.uShowText = { value: showText.value ? 1 : 0 }
  
      shader.uniforms.uShowFrame = { value: showSegmentFrame.value ? 1 : 0 }
      shader.uniforms.uFrameStrength = { value: frameStrength.value }
  
      shader.uniforms.uShowBands = { value: showBands.value ? 1 : 0 }
      shader.uniforms.uBandStrength = { value: bandStrength.value }
  
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
  attribute float aSegIndex;
  attribute float aRibbonId;
  
  uniform float uScroll;
  uniform float uRunLength;
  
  varying vec2 vUv;
  varying float vGradT;
  varying float vTextU;
  varying float vRibbonId;
          `,
        )
        .replace(
          '#include <uv_vertex>',
          `#include <uv_vertex>
  vUv = uv;
  
  vRibbonId = aRibbonId;
  
  float rl = max(1.0, uRunLength);
  vGradT = clamp(aSegIndex / max(1.0, rl - 1.0), 0.0, 1.0);
  
  vTextU = fract((aSegIndex + uScroll) / rl);
          `,
        )
  
      shader.fragmentShader = `
  uniform float uRunLength;
  uniform vec3 uCol1;
  uniform vec3 uCol2;
  uniform vec3 uCol3;
  uniform vec3 uCol4;
  
  uniform sampler2D uTextMap;
  uniform int uShowText;
  
  uniform int uShowFrame;
  uniform float uFrameStrength;
  
  uniform int uShowBands;
  uniform float uBandStrength;
  
  varying vec2 vUv;
  varying float vGradT;
  varying float vTextU;
  varying float vRibbonId;
  
  vec3 ramp(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.3333) {
      return mix(uCol1, uCol2, smoothstep(0.0, 0.3333, t));
    }
    if (t < 0.6666) {
      return mix(uCol2, uCol3, smoothstep(0.3333, 0.6666, t));
    }
    return mix(uCol3, uCol4, smoothstep(0.6666, 1.0, t));
  }
  
  float frameMask(vec2 uv) {
    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    return 1.0 - smoothstep(0.02, 0.08, edge);
  }
  
  void main() {
    vec2 uv = vUv;
  
    vec3 base = ramp(vGradT);
  
    if (!gl_FrontFacing) {
      base *= 0.86;
    }
  
    if (uShowBands == 1) {
      float bands = abs(fract(uv.x * 1.0) - 0.5);
      float bandMask = smoothstep(0.48, 0.50, bands);
      base = mix(base, vec3(1.0), bandMask * uBandStrength);
    }
  
    if (uShowFrame == 1) {
      float fm = frameMask(uv);
      base = mix(base, vec3(0.0), fm * uFrameStrength);
    }
  
    if (uShowText == 1) {
      vec4 tx = texture2D(uTextMap, vec2(vTextU, uv.y));
      float a = tx.a;
      base = mix(base, tx.rgb, a);
    }
  
    gl_FragColor = vec4(base, 1.0);
  }
      `
  
      ;(material as any).userData.shader = shader
    }
  
    material.needsUpdate = true
    drawTextTexture()
  })
  
  onBeforeUnmount(() => {
    if (instanced.value) {
      instanced.value.geometry.dispose()
      // DON'T dispose shared material here if reused elsewhere; but ok in this isolated component:
      material.dispose()
    }
    if (textTex.value) textTex.value.dispose()
  })
  
  function p5LikeMatrixForSegment(opts: {
    i: number
    ribbonId: number
    runLength: number
    segmentSpace: number
    segmentCount: number
    middleStretch: number
    depth: number
    xSpace: number
    zSpace: number
    alt: boolean
    scroll: number
  }) {
    const {
      i,
      ribbonId,
      runLength,
      segmentSpace,
      segmentCount,
      middleStretch,
      depth,
      xSpace,
      zSpace,
      alt,
      scroll,
    } = opts
  
    const PI = Math.PI
    const sinStep = PI / Math.max(1e-6, segmentCount)
  
    const segmentLength = segmentCount * segmentSpace
    const radius = segmentLength / PI
  
    const totalCycle = 2 * segmentCount + 2 * segmentCount * middleStretch
    const denom = segmentCount + segmentCount * middleStretch
  
    const yCrawl = (runLength + scroll) / Math.max(1e-6, denom) * radius * 2
    const ribbonHeight = runLength / Math.max(1e-6, denom) * radius * 2.25
    const ribbonHeight2 = (count.value - 1) * xSpace * radius * 2
    const ribbonWidth = segmentLength * middleStretch
  
    const baseX = -ribbonWidth / 2
    const baseY = alt
      ? (-yCrawl + ribbonHeight / 2 - radius)
      : (-yCrawl + ribbonHeight / 2 - ribbonHeight2 / 2)
  
    const baseZ
      = -depth * (count.value - 1) / 2
        - (count.value - 1) * (zSpace - 1) * depth / 2
  
    const globalIndex = i + scroll
    let step = globalIndex % totalCycle
    if (step < 0) step += totalCycle
    const jumper = Math.floor(globalIndex / totalCycle)
  
    let xCenter = 0
    let yCenter = 0
    let rot = 0
  
    const a = segmentCount * middleStretch
    const b = segmentCount + segmentCount * middleStretch
    const c = segmentCount + 2 * segmentCount * middleStretch
  
    if (step <= a) {
      xCenter = step * segmentSpace
      yCenter = jumper * radius * 4
      rot = 0
    }
    else if (step <= b) {
      const s = step - a
      xCenter = segmentLength * middleStretch
      yCenter = jumper * radius * 4
      rot = s * sinStep
    }
    else if (step <= c) {
      const s = step - (a + segmentCount)
      xCenter = segmentLength * middleStretch - s * segmentSpace
      yCenter = radius * 2 + jumper * radius * 4
      rot = 0
    }
    else {
      const s = step - (a + segmentCount)
      xCenter = 0
      yCenter = radius * 2 + jumper * radius * 4
      rot = -s * sinStep + PI * middleStretch
    }
  
    const yAdd = alt
      ? ((ribbonId % 2) * radius * 2)
      : (ribbonId * xSpace * radius * 2)
  
    const zAdd = ribbonId * depth * zSpace
  
    const tx = baseX + xCenter
    const ty = baseY + yCenter + yAdd
    const tz = baseZ + zAdd
  
    const m = new Matrix4().makeRotationX(Math.PI / 2)
    m.premultiply(new Matrix4().makeTranslation(0, -radius, 0))
    m.premultiply(new Matrix4().makeRotationZ(rot))
    m.premultiply(new Matrix4().makeTranslation(tx, ty, tz))
  
    return m
  }
  
  function rebuildMesh() {
    const old = instanced.value
    if (old) {
      old.geometry.dispose()
      instanced.value = null
    }
  
    const segGeom = new PlaneGeometry(segmentSpace.value, depth.value, 1, 1)
    segGeomRef.value = segGeom
  
    const instances = runLength.value * Math.max(1, count.value)
    const mesh = new InstancedMesh(segGeom, material, instances)
    mesh.frustumCulled = false
    mesh.instanceMatrix.setUsage(DynamicDrawUsage)
  
    const segIndex = new Float32Array(instances)
    const ribbonIdArr = new Float32Array(instances)
  
    const rl = runLength.value
    for (let idx = 0; idx < instances; idx++) {
      const rId = Math.floor(idx / rl)
      const i = idx - rId * rl
      segIndex[idx] = i
      ribbonIdArr[idx] = rId
    }
  
    mesh.geometry.setAttribute('aSegIndex', new InstancedBufferAttribute(segIndex, 1))
    mesh.geometry.setAttribute('aRibbonId', new InstancedBufferAttribute(ribbonIdArr, 1))
  
    instanced.value = mesh
  }
  
  onMounted(() => {
    // client only
    rebuildMesh()
    ready.value = true
  })
  
  watch([runLength, count, segmentSpace, depth], () => {
    if (!ready.value) return
    rebuildMesh()
  })
  
  function handleLoop(payload: { elapsedTime?: number, elapsed?: number }) {
    if (!isClient) return
  
    const t = (payload.elapsedTime ?? payload.elapsed ?? 0) * timeScale.value
  
    const mesh = instanced.value
    if (!mesh) return
  
    const rl = runLength.value
    const c = Math.max(1, count.value)
    const instances = rl * c
  
    if (mesh.count !== instances) mesh.count = instances
  
    const frameCountApprox = t * 60
    const scroll = frameCountApprox * speed.value
  
    const shader = (material as any).userData?.shader
    if (shader?.uniforms) {
      shader.uniforms.uScroll.value = scroll
      shader.uniforms.uRunLength.value = rl
  
      shader.uniforms.uCol1.value.set(col1.value)
      shader.uniforms.uCol2.value.set(col2.value)
      shader.uniforms.uCol3.value.set(col3.value)
      shader.uniforms.uCol4.value.set(col4.value)
  
      shader.uniforms.uShowText.value = showText.value ? 1 : 0
      shader.uniforms.uShowFrame.value = showSegmentFrame.value ? 1 : 0
      shader.uniforms.uFrameStrength.value = frameStrength.value
  
      shader.uniforms.uShowBands.value = showBands.value ? 1 : 0
      shader.uniforms.uBandStrength.value = bandStrength.value
  
      // keep binding the texture (in case shader compiles before it exists)
      shader.uniforms.uTextMap.value = textTex.value
    }
  
    for (let idx = 0; idx < instances; idx++) {
      const rId = Math.floor(idx / rl)
      const i = idx - rId * rl
  
      const m = p5LikeMatrixForSegment({
        i,
        ribbonId: rId,
        runLength: rl,
        segmentSpace: segmentSpace.value,
        segmentCount: segmentCount.value,
        middleStretch: middleStretch.value,
        depth: depth.value,
        xSpace: xSpace.value,
        zSpace: zSpace.value,
        alt: alt.value,
        scroll,
      })
  
      mesh.setMatrixAt(idx, m)
    }
  
    mesh.instanceMatrix.needsUpdate = true
  }
  </script>
  
  <template>
    <div
      class="relative overflow-hidden"
      :class="props.full ? 'w-screen' : 'w-full'"
      :style="[
        props.full ? { height: '100vh' } : { height: `${props.height}px` },
        {
          background: `radial-gradient(1200px 700px at 20% 20%, ${bgB} 0%, rgba(0,0,0,0) 60%),
                       radial-gradient(900px 600px at 80% 30%, ${bgC} 0%, rgba(0,0,0,0) 60%),
                       linear-gradient(135deg, ${bgA} 0%, #05060c 55%, #05060c 100%)`,
        },
      ]"
    >
      <div class="pointer-events-none absolute inset-0">
        <div class="pointer-events-auto fixed right-4 top-24 z-30 w-72 max-h-[80vh] overflow-auto rounded-lg border border-white/10 bg-black/75 p-3 text-[12px] text-white shadow-xl backdrop-blur-md space-y-2">
        <div class="text-white/70 text-xs tracking-[0.15em] font-mono uppercase">Camera</div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>X</span>
          <input v-model.number="camX" type="range" min="-30" max="30" step="0.1">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Y</span>
          <input v-model.number="camY" type="range" min="-30" max="30" step="0.1">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Z</span>
          <input v-model.number="camZ" type="range" min="2" max="120" step="0.25">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>FOV</span>
          <input v-model.number="fov" type="range" min="10" max="80" step="1">
        </label>
  
        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">Tilt</div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>RX</span>
          <input v-model.number="rotX" type="range" min="-3.14" max="3.14" step="0.01">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>RY</span>
          <input v-model.number="rotY" type="range" min="-3.14" max="3.14" step="0.01">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>RZ</span>
          <input v-model.number="rotZ" type="range" min="-6.28" max="6.28" step="0.01">
        </label>
  
        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">Debug</div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Scale</span>
          <input v-model.number="scaler" type="range" min="0.002" max="0.08" step="0.0005">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Shift X</span>
          <input v-model.number="shiftX" type="range" min="-400" max="400" step="1">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Shift Y</span>
          <input v-model.number="shiftY" type="range" min="-400" max="400" step="1">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Shift Z</span>
          <input v-model.number="shiftZ" type="range" min="-400" max="400" step="1">
        </label>
  
        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">Ribbon Look</div>
  
        <div class="grid grid-cols-2 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C1</span>
            <input v-model="col1" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C2</span>
            <input v-model="col2" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C3</span>
            <input v-model="col3" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C4</span>
            <input v-model="col4" type="color" class="h-6 w-full">
          </label>
        </div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Text</span>
          <input v-model="showText" type="checkbox" @change="drawTextTexture()">
        </label>
  
        <div class="grid grid-cols-2 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>TC</span>
            <input v-model="textColor" type="color" class="h-6 w-full" @change="drawTextTexture()">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>Op</span>
            <input v-model.number="textOpacity" type="range" min="0" max="1" step="0.01" @input="drawTextTexture()">
          </label>
        </div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Size</span>
          <input v-model.number="textSize" type="range" min="24" max="140" step="1" @input="drawTextTexture()">
        </label>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Stroke</span>
          <input v-model.number="textStroke" type="range" min="0" max="22" step="1" @input="drawTextTexture()">
        </label>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Frame</span>
          <input v-model="showSegmentFrame" type="checkbox">
        </label>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Frame Str</span>
          <input v-model.number="frameStrength" type="range" min="0" max="1" step="0.01">
        </label>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Bands</span>
          <input v-model="showBands" type="checkbox">
        </label>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Band Str</span>
          <input v-model.number="bandStrength" type="range" min="0" max="1" step="0.01">
        </label>
  
        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">Motion</div>
  
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Speed</span>
          <input v-model.number="speed" type="range" min="0" max="1" step="0.01">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Time</span>
          <input v-model.number="timeScale" type="range" min="0" max="2" step="0.05">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Alt</span>
          <input v-model="alt" type="checkbox">
        </label>
  
        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">Background</div>
  
        <div class="grid grid-cols-3 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>A</span>
            <input v-model="bgA" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>B</span>
            <input v-model="bgB" type="color" class="h-6 w-full">
          </label>
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>C</span>
            <input v-model="bgC" type="color" class="h-6 w-full">
          </label>
        </div>
        </div>  
      </div>

      <ClientOnly>
        <TresCanvas
          v-if="ready"
          class="absolute inset-0 h-full w-full"
          :dpr="dpr"
          clear-color="#000000"
          render-mode="always"
          @loop="handleLoop"
        >
          <TresPerspectiveCamera :position="cameraPos" :look-at="[0, 0, 0]" :fov="fov" />
          <TresGroup :rotation="groupRot" :scale="groupScale" :position="groupPos">
            <primitive v-if="instanced" :object="instanced" />
          </TresGroup>
        </TresCanvas>
      </ClientOnly>
    </div>
  </template>
  
