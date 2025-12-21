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
  LinearMipmapLinearFilter,
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

const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

const ready = ref(false)
const dpr = ref(1.5)

/**
 * Container sizing
 */
const containerEl = ref<HTMLElement | null>(null)
const viewportW = ref(1)
const viewportH = ref(1)
let ro: ResizeObserver | null = null

function updateViewport() {
  if (!isClient)
    return
  const el = containerEl.value
  if (!el)
    return
  const r = el.getBoundingClientRect()
  viewportW.value = Math.max(1, Math.floor(r.width))
  viewportH.value = Math.max(1, Math.floor(r.height))
}

onMounted(() => {
  updateViewport()
  if (!isClient)
    return

  ro = new ResizeObserver(() => updateViewport())
  if (containerEl.value)
    ro.observe(containerEl.value)
})

/**
 * Camera p5 like
 * p5 default camera Z uses: (height/2) / tan(fov/2) with fov = 60deg (PI/3)
 * projection is ortho each frame, but keeping this Z matches the reference view setup
 */
const camX = ref(0)
const camY = ref(0)
const camZOffset = ref(0)

/**
 * Ortho zoom, in p5 you normally do not use camera zoom, but it is useful for matching
 */
const camZoom = ref(0.83)

const p5EyeZ = computed(() => {
  const h = Math.max(1, viewportH.value)
  const fovRad = Math.PI / 3
  return (h / 2) / Math.tan(fovRad / 2)
})

const cameraPos = computed(() => [camX.value, camY.value, p5EyeZ.value + camZOffset.value] as const)

/**
 * p5 ortho uses: ortho(-w/2, w/2, -h/2, h/2, -5000, 5000)
 * note top is negative, bottom is positive, that flips Y to "down" like p5 WEBGL
 */
const ortho = computed(() => {
  const w = Math.max(1, viewportW.value)
  const h = Math.max(1, viewportH.value)
  return {
    left: -w / 2,
    right: w / 2,
    top: -h / 2,
    bottom: h / 2,
    near: -5000,
    far: 5000,
  }
})

/**
 * Ribbon text and base length
 */
const ribbonText = ref('SOFTWARE IS A RIVER OF CHANGES, A MAP OF TOMORROW * SOFTWARE IS A RIVER OF CHANGES, A MAP OF TOMORROW * SOFTWARE IS A RIVER OF CHANGES, A MAP OF TOMORROW *')
const baseRunLength = computed(() => Math.max(1, ribbonText.value.length))

/**
 * Streamers preset params
 */
const segmentSpace = ref(23)
const segmentCount = ref(22)
const depth = ref(56)
const middleStretch = ref(0)
const speed = ref(0.14)
const count = ref(4)
const zSpace = ref(1.62)
const xSpace = ref(1.3)
const alt = ref(false)

/**
 * Band stretch controls
 */
const lengthStretch = ref(1.34)
const widthStretch = ref(1.24)

const runLength = computed(() => {
  const v = Math.max(1, Math.floor(baseRunLength.value * Math.max(0.25, lengthStretch.value)))
  return v
})
const effectiveDepth = computed(() => Math.max(1, depth.value * Math.max(0.25, widthStretch.value)))

/**
 * p5 global controls
 */
const scaler = ref(1.12)
const shiftX = ref(0)
const shiftY = ref(10)
const shiftZ = ref(0)

const rotX = ref(-1.91)
const rotY = ref(0.56)
const rotZ = ref(-0.53)

const timeScale = ref(1)

/**
 * Visual styling controls
 */
const bgA = ref('#0b1020')
const bgB = ref('#23103a')
const bgC = ref('#0b2a2a')

const col1 = ref('#059669')
const col2 = ref('#75DDDD')
const col3 = ref('#6D28D9')
const col4 = ref('#AA3E98')

const showText = ref(true)
const textColor = ref('#ffffff')
const textOpacity = ref(1)
const textSize = ref(140)
const textStroke = ref(0)
const textWidth = ref(1)
const textSpacing = ref(0)

const tracking = ref(57)
const typeHeight = ref(19)
const textWeight = ref(100)

const textFlipX = ref(true)
const textFlipY = ref(false)
const textBoost = ref(2.2)
const textMix = ref(0.96)

const fontOptions = [
  { label: 'Electric', family: 'Electric' },
  { label: 'Recoleta', family: 'Recoleta' },
  { label: 'Ginger', family: 'Ginger' },
  { label: 'Prata', family: 'Prata' },
  { label: 'Manrope', family: 'Manrope' },
  { label: 'Geist', family: 'Geist Regular' },
  { label: 'Space Grotesk', family: 'Space Grotesk' },
  { label: 'Boldonse', family: 'Boldonse' },
  { label: 'Audiowide', family: 'Audiowide' },
  { label: 'Zen Dots', family: 'Zen Dots' },
  { label: 'Bruno Ace SC', family: 'Bruno Ace SC' },
  { label: 'Major Mono Display', family: 'Major Mono Display' },
  { label: 'Nova Square', family: 'Nova Square' },
  { label: 'Figtree', family: 'Figtree' },
  { label: 'JetBrains Mono', family: 'JetBrains Mono' },
  { label: 'Crimson Text', family: 'Crimson Text' },
  { label: 'Lora', family: 'Lora' },
  { label: 'Libre Baskerville', family: 'Libre Baskerville' },
  { label: 'EB Garamond', family: 'EB Garamond' },
  { label: 'Cormorant Garamond', family: 'Cormorant Garamond' },
  { label: 'Zalando Sans Expanded', family: 'Zalando Sans Expanded' },
]
const selectedFont = ref('Space Grotesk')

const textFollowScroll = ref(true)
const textSnapTexel = ref(true)
const textMultiSample = ref(true)
const textSampleStrength = ref(1.0)

const showSegmentFrame = ref(true)
const frameStrength = ref(1)
const frameMode = ref<0 | 1 | 2>(2)

const showBands = ref(false)
const bandStrength = ref(0)

const dbgWrap = ref(true)
const _lastWrap = ref<number | null>(null)
const panelHidden = ref(false)
const panelCollapsed = ref(false)

const backgroundStyle = computed(() => ({
  background: `radial-gradient(1200px 700px at 20% 20%, ${bgB.value} 0%, rgba(0,0,0,0) 60%),
                   radial-gradient(900px 600px at 80% 30%, ${bgC.value} 0%, rgba(0,0,0,0) 60%),
                   linear-gradient(135deg, ${bgA.value} 0%, #05060c 55%, #05060c 100%)`,
}))

const containerStyle = computed(() => {
  if (props.full) {
    return {
      width: '90svw',
      height: '90svh',
      ...backgroundStyle.value,
    }
  }
  return {
    width: '100%',
    height: `${props.height}px`,
    ...backgroundStyle.value,
  }
})

function logState() {
  consola.info(
    '[RibbonDebug]',
    `cam (${camX.value.toFixed(2)}, ${camY.value.toFixed(2)}, ${(p5EyeZ.value + camZOffset.value).toFixed(2)}) zoom ${camZoom.value.toFixed(2)} | rot (${rotX.value.toFixed(2)}, ${rotY.value.toFixed(2)}, ${rotZ.value.toFixed(2)}) | scale ${scaler.value.toFixed(4)} | shift (${shiftX.value.toFixed(2)}, ${shiftY.value.toFixed(2)}, ${shiftZ.value.toFixed(2)}) | motion speed ${speed.value.toFixed(2)} time ${timeScale.value.toFixed(2)} alt ${alt.value ? 1 : 0} | segs space ${segmentSpace.value} count ${segmentCount.value} depth ${depth.value} depthScale ${widthStretch.value.toFixed(2)} mid ${middleStretch.value} xSpace ${xSpace.value} zSpace ${zSpace.value} | lenBase ${baseRunLength.value} lenScale ${lengthStretch.value.toFixed(2)} lenEff ${runLength.value}`,
  )
}

watch([
  camX,
  camY,
  camZOffset,
  camZoom,
  rotX,
  rotY,
  rotZ,
  scaler,
  shiftX,
  shiftY,
  shiftZ,
  speed,
  timeScale,
  alt,
  segmentSpace,
  segmentCount,
  depth,
  middleStretch,
  xSpace,
  zSpace,
  count,
  ribbonText,
  showText,
  textColor,
  textOpacity,
  textSize,
  textStroke,
  textWidth,
  textSpacing,
  tracking,
  typeHeight,
  selectedFont,
  textWeight,
  textFlipX,
  textFlipY,
  textBoost,
  textMix,
  showSegmentFrame,
  frameStrength,
  frameMode,
  showBands,
  bandStrength,
  col1,
  col2,
  col3,
  col4,
  bgA,
  bgB,
  bgC,
  lengthStretch,
  widthStretch,
  viewportW,
  viewportH,
], () => logState(), { immediate: true })

watch(selectedFont, () => drawGlyphAtlas())
watch(textWeight, () => drawGlyphAtlas())

const instanced = shallowRef<InstancedMesh | null>(null)

const material = new MeshBasicMaterial({
  color: 0xFFFFFF,
  side: DoubleSide,
})

/**
 * Glyph atlas
 */
const ATLAS_COLS = 16
const ATLAS_ROWS = 16
const ATLAS_CELL = 256
const ATLAS_W = ATLAS_COLS * ATLAS_CELL
const ATLAS_H = ATLAS_ROWS * ATLAS_CELL
const ATLAS_CAP = ATLAS_COLS * ATLAS_ROWS

const glyphCanvas = shallowRef<HTMLCanvasElement | null>(null)
const glyphCtx = shallowRef<CanvasRenderingContext2D | null>(null)
const glyphTex = shallowRef<CanvasTexture | null>(null)

const glyphList = ref<string[]>([' '])
const glyphIndex = shallowRef<Map<string, number>>(new Map([[' ', 0]]))

function ensureGlyphAtlas() {
  if (!isClient)
    return
  if (glyphTex.value && glyphCanvas.value && glyphCtx.value)
    return

  const c = document.createElement('canvas')
  c.width = ATLAS_W
  c.height = ATLAS_H

  const ctx = c.getContext('2d')
  if (!ctx)
    return

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.wrapS = ClampToEdgeWrapping
  tex.wrapT = ClampToEdgeWrapping

  tex.generateMipmaps = true
  tex.minFilter = LinearMipmapLinearFilter
  tex.magFilter = LinearFilter
  tex.anisotropy = 16

  tex.flipY = false
  tex.premultiplyAlpha = false
  tex.needsUpdate = true

  glyphCanvas.value = c
  glyphCtx.value = ctx
  glyphTex.value = tex
}

function buildGlyphSetFromText() {
  const s = ribbonText.value ?? ''
  const set = new Set<string>()
  set.add(' ')
  for (let i = 0; i < s.length; i++)
    set.add(s[i] ?? ' ')

  const list = Array.from(set)
  list.sort((a, b) => (a === ' ' ? -1 : b === ' ' ? 1 : a.localeCompare(b)))

  if (list.length > ATLAS_CAP)
    list.length = ATLAS_CAP

  const map = new Map<string, number>()
  for (let i = 0; i < list.length; i++)
    map.set(list[i]!, i)

  glyphList.value = list
  glyphIndex.value = map
}

function drawGlyphAtlas() {
  if (!isClient)
    return
  ensureGlyphAtlas()
  buildGlyphSetFromText()

  const c = glyphCanvas.value
  const ctx = glyphCtx.value
  const tex = glyphTex.value
  if (!c || !ctx || !tex)
    return

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, c.width, c.height)

  if (!showText.value) {
    tex.needsUpdate = true
    return
  }

  const size = Math.max(10, Math.floor(textSize.value))
  const stroke = Math.max(0, Math.floor(textStroke.value))

  const weight = Math.min(900, Math.max(100, Math.round(textWeight.value / 50) * 50))
  const fontSpec = `${weight} ${size}px "${selectedFont.value}"`

  if ('fonts' in document && !document.fonts.check(fontSpec)) {
    document.fonts.load(fontSpec).then(() => drawGlyphAtlas())
    return
  }

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.imageSmoothingEnabled = true

  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.font = `${fontSpec}, "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

  const pad = Math.max(14, Math.floor(ATLAS_CELL * 0.14))
  const cx = ATLAS_CELL * 0.5
  const cy = ATLAS_CELL * 0.5

  for (let i = 0; i < glyphList.value.length; i++) {
    const ch = glyphList.value[i] ?? ' '
    const col = i % ATLAS_COLS
    const row = Math.floor(i / ATLAS_COLS)
    const x0 = col * ATLAS_CELL
    const y0 = row * ATLAS_CELL

    ctx.clearRect(x0, y0, ATLAS_CELL, ATLAS_CELL)

    ctx.save()
    ctx.translate(x0 + cx, y0 + cy)

    const m = ctx.measureText(ch)
    const left = m.actualBoundingBoxLeft ?? 0
    const right = m.actualBoundingBoxRight ?? 0
    const asc = m.actualBoundingBoxAscent ?? 0
    const desc = m.actualBoundingBoxDescent ?? 0

    const boxW = left + right
    const boxH = asc + desc

    const safeW = ATLAS_CELL - pad * 2
    const safeH = ATLAS_CELL - pad * 2

    const fit = Math.min(
      1,
      safeW / Math.max(1, boxW + stroke * 2),
      safeH / Math.max(1, boxH + stroke * 2),
    )

    ctx.scale(fit, fit)

    const xOff = (left - right) * 0.5
    const yOff = (asc - desc) * 0.5

    if (stroke > 0) {
      ctx.lineWidth = stroke
      ctx.strokeText(ch, xOff, yOff)
    }
    ctx.fillText(ch, xOff, yOff)

    ctx.restore()
  }

  ctx.restore()
  tex.needsUpdate = true
}

function drawTextTexture() {
  drawGlyphAtlas()
}

watch([ribbonText, showText, textSize, textStroke, selectedFont, textWeight], () => {
  drawGlyphAtlas()
})

/**
 * Shader injection
 */
onMounted(() => {
  ensureGlyphAtlas()
  drawGlyphAtlas()

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uScroll = { value: 0 }
    shader.uniforms.uRunLength = { value: runLength.value }

    shader.uniforms.uCol1 = { value: new Color(col1.value) }
    shader.uniforms.uCol2 = { value: new Color(col2.value) }
    shader.uniforms.uCol3 = { value: new Color(col3.value) }
    shader.uniforms.uCol4 = { value: new Color(col4.value) }

    shader.uniforms.uTextMap = { value: glyphTex.value }
    shader.uniforms.uShowText = { value: showText.value ? 1 : 0 }

    shader.uniforms.uTextColor = { value: new Color(textColor.value) }
    shader.uniforms.uTextOpacity = { value: textOpacity.value }
    shader.uniforms.uTextWidth = { value: textWidth.value }
    shader.uniforms.uTextSpacing = { value: textSpacing.value }

    shader.uniforms.uTracking = { value: tracking.value / 100 }
    shader.uniforms.uTypeHeight = { value: typeHeight.value / 100 }

    shader.uniforms.uTextFlipX = { value: textFlipX.value ? 1 : 0 }
    shader.uniforms.uTextFlipY = { value: textFlipY.value ? 1 : 0 }
    shader.uniforms.uTextBoost = { value: textBoost.value }
    shader.uniforms.uTextMix = { value: textMix.value }

    shader.uniforms.uAtlasCols = { value: ATLAS_COLS * 1.0 }
    shader.uniforms.uAtlasRows = { value: ATLAS_ROWS * 1.0 }

    shader.uniforms.uShowFrame = { value: showSegmentFrame.value ? 1 : 0 }
    shader.uniforms.uFrameStrength = { value: frameStrength.value }
    shader.uniforms.uFrameMode = { value: frameMode.value }

    shader.uniforms.uShowBands = { value: showBands.value ? 1 : 0 }
    shader.uniforms.uBandStrength = { value: bandStrength.value }

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
  attribute float aSegIndex;
  attribute float aRibbonId;
  attribute float aGlyph;

  uniform float uRunLength;

  varying vec2 vUv;
  varying float vGradT;
  varying float vRibbonId;
  varying float vGlyph;
  varying float vSegIndex;

  varying vec3 vNormalV;
  varying vec3 vViewDirV;
          `,
      )
      .replace(
        '#include <uv_vertex>',
        `#include <uv_vertex>
  vUv = uv;
  vRibbonId = aRibbonId;
  vGlyph = aGlyph;
  vSegIndex = aSegIndex;

  float rl = max(1.0, uRunLength);
  vGradT = clamp(aSegIndex / max(1.0, rl - 1.0), 0.0, 1.0);
          `,
      )
      .replace(
        '#include <defaultnormal_vertex>',
        `#include <defaultnormal_vertex>
  vNormalV = normalize(normalMatrix * objectNormal);
          `,
      )
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
  vViewDirV = normalize(-mvPosition.xyz);
          `,
      )

    shader.fragmentShader = `
  #ifdef GL_ES
  precision highp float;
  precision highp int;
  #endif

  uniform float uRunLength;

  uniform vec3 uCol1;
  uniform vec3 uCol2;
  uniform vec3 uCol3;
  uniform vec3 uCol4;

  uniform sampler2D uTextMap;
  uniform int uShowText;

  uniform vec3 uTextColor;
  uniform float uTextOpacity;
  uniform float uTextWidth;
  uniform float uTextSpacing;

  uniform float uTracking;
  uniform float uTypeHeight;

  uniform int uTextFlipX;
  uniform int uTextFlipY;
  uniform float uTextBoost;
  uniform float uTextMix;

  uniform float uAtlasCols;
  uniform float uAtlasRows;

  uniform int uShowFrame;
  uniform float uFrameStrength;
  uniform int uFrameMode;

  uniform int uShowBands;
  uniform float uBandStrength;

  varying vec2 vUv;
  varying float vGradT;
  varying float vRibbonId;
  varying float vGlyph;
  varying float vSegIndex;

  varying vec3 vNormalV;
  varying vec3 vViewDirV;

  vec3 ramp(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.3333) return mix(uCol1, uCol2, smoothstep(0.0, 0.3333, t));
    if (t < 0.6666) return mix(uCol2, uCol3, smoothstep(0.3333, 0.6666, t));
    return mix(uCol3, uCol4, smoothstep(0.6666, 1.0, t));
  }

  float edgeMask(float edge) {
    return 1.0 - smoothstep(0.02, 0.08, edge);
  }

  float frameMaskTile(vec2 uv) {
    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    return edgeMask(edge);
  }

  float frameMaskOuter(vec2 uv) {
    vec2 uvi = clamp(uv, vec2(0.002), vec2(0.998));
    float ey = min(uvi.y, 1.0 - uvi.y);
    return edgeMask(ey);
  }

  vec2 atlasUv(float glyphId, vec2 localUv) {
    float id = floor(glyphId + 0.5);
    float col = mod(id, uAtlasCols);
    float row = floor(id / uAtlasCols);

    vec2 uv = localUv;

    uv.x = (uTextFlipX == 1) ? (1.0 - uv.x) : uv.x;
    uv.y = (uTextFlipY == 1) ? (1.0 - uv.y) : uv.y;

    if (!gl_FrontFacing) {
      uv.x = 1.0 - uv.x;
    }

    return (vec2(col, row) + uv) / vec2(uAtlasCols, uAtlasRows);
  }

  void main() {
    vec2 uv = vUv;

    vec3 base = ramp(vGradT);

    vec3 N = normalize(vNormalV);
    vec3 V = normalize(vViewDirV);

    float f = dot(N, V);
    float soft = 0.06;
    float back = 1.0 - smoothstep(-soft, soft, f);

    base *= mix(1.0, 0.86, back);

    if (uShowBands == 1) {
      float bands = abs(fract(uv.x * 1.0) - 0.5);
      float bandMask = smoothstep(0.48, 0.50, bands);
      base = mix(base, vec3(1.0), bandMask * uBandStrength);
    }

    if (uShowFrame == 1 && uFrameStrength > 0.0001 && uFrameMode != 0) {
      float fm = (uFrameMode == 2) ? frameMaskOuter(uv) : frameMaskTile(uv);
      base = mix(base, vec3(0.0), fm * uFrameStrength);
    }

    if (uShowText == 1) {
      float trackingNorm = clamp(1.0 - uTracking, 0.15, 1.0);
      float heightNorm = clamp(1.0 - uTypeHeight, 0.15, 1.0);

      vec2 localUv = uv;

      localUv.x = (localUv.x - 0.5) * trackingNorm + 0.5;
      localUv.y = (localUv.y - 0.5) * heightNorm + 0.5;

      float spacing = clamp(uTextSpacing, 0.0, 0.45);
      float spacingMask = step(spacing, uv.x) * step(uv.x, 1.0 - spacing);

      float width = max(0.35, uTextWidth);
      localUv.x = (localUv.x - 0.5) * width + 0.5;

      localUv = clamp(localUv, 0.0, 1.0);

      vec2 tuv = atlasUv(vGlyph, localUv);
      vec4 tx = texture2D(uTextMap, tuv);

      float aRaw = tx.a;
      float aSharp = smoothstep(0.38, 0.62, aRaw);
      float a = clamp(aSharp * uTextOpacity, 0.0, 1.0) * spacingMask;

      vec3 tcol = clamp(uTextColor * uTextBoost, 0.0, 1.0);
      base = mix(base, tcol, a * clamp(uTextMix, 0.0, 1.0));
    }

    gl_FragColor = vec4(base, 1.0);
  }
  `

    ;(material as any).userData.shader = shader
  }

  material.needsUpdate = true
  drawGlyphAtlas()
})

onBeforeUnmount(() => {
  if (ro) {
    ro.disconnect()
    ro = null
  }

  if (instanced.value) {
    instanced.value.geometry.dispose()
    material.dispose()
  }
  if (glyphTex.value)
    glyphTex.value.dispose()
})

/**
 * p5 exact math helpers
 */
function buildP5GlobalMatrix(scroll: number) {
  const PI = Math.PI

  const segSpace = segmentSpace.value
  const segCount = Math.max(1e-6, segmentCount.value)
  const mid = middleStretch.value

  const segLength = segCount * segSpace
  const radius = segLength / PI

  const denom = segCount + segCount * mid

  const rl = runLength.value
  const yCrawl = (rl + scroll) / Math.max(1e-6, denom) * radius * 2
  const ribbonHeight = rl / Math.max(1e-6, denom) * radius * 2.25
  const ribbonHeight2 = (count.value - 1) * xSpace.value * radius * 2

  const ribbonWidth = segLength * mid

  const baseX = -ribbonWidth / 2
  const baseY = alt.value
    ? (-yCrawl + ribbonHeight / 2 - radius)
    : (-yCrawl + ribbonHeight / 2 - ribbonHeight2 / 2)

  const dep = effectiveDepth.value
  const baseZ = -dep * (count.value - 1) / 2 - (count.value - 1) * (zSpace.value - 1) * dep / 2

  const tX = baseX + shiftX.value
  const tY = baseY + shiftY.value
  const tZ = baseZ + shiftZ.value

  const m = new Matrix4().identity()
  m.multiply(new Matrix4().makeScale(scaler.value, scaler.value, scaler.value))
  m.multiply(new Matrix4().makeRotationX(rotX.value))
  m.multiply(new Matrix4().makeRotationY(rotY.value))
  m.multiply(new Matrix4().makeRotationZ(rotZ.value + PI))
  m.multiply(new Matrix4().makeTranslation(tX, tY, tZ))

  return { m, radius, segLength }
}

function buildP5SegmentMatrix(opts: {
  i: number
  ribbonId: number
  runLength: number
  scroll: number
  radius: number
  segLength: number
}) {
  const { i, ribbonId, runLength, scroll, radius, segLength } = opts

  const PI = Math.PI
  const segSpace = segmentSpace.value
  const segCount = Math.max(1e-6, segmentCount.value)
  const mid = middleStretch.value

  const sinStep = PI / Math.max(1e-6, segCount)
  const totalCycle = 2 * segCount + 2 * segCount * mid

  const globalIndex = i + scroll
  let step = globalIndex % totalCycle
  if (step < 0)
    step += totalCycle
  const jumper = Math.floor(globalIndex / totalCycle)

  let xCenter = 0
  let yCenter = 0
  let rot = 0

  const a = segCount * mid
  const b = segCount + segCount * mid
  const c = segCount + 2 * segCount * mid

  if (step <= a) {
    xCenter = step * segSpace
    yCenter = jumper * radius * 4
    rot = 0
  }
  else if (step <= b) {
    const s = step - a
    xCenter = segLength * mid
    yCenter = jumper * radius * 4
    rot = s * sinStep
  }
  else if (step <= c) {
    const s = step - (a + segCount)
    xCenter = segLength * mid - s * segSpace
    yCenter = radius * 2 + jumper * radius * 4
    rot = 0
  }
  else {
    const s = step - (a + segCount)
    xCenter = 0
    yCenter = radius * 2 + jumper * radius * 4
    rot = -s * sinStep + PI * mid
  }

  const yAdd = alt.value
    ? ((ribbonId % 2) * radius * 2)
    : (ribbonId * xSpace.value * radius * 2)

  const zAdd = ribbonId * effectiveDepth.value * zSpace.value

  const m = new Matrix4().identity()
  m.multiply(new Matrix4().makeTranslation(xCenter, yCenter + yAdd, zAdd))
  m.multiply(new Matrix4().makeRotationZ(rot))
  m.multiply(new Matrix4().makeTranslation(0, -radius, 0))
  m.multiply(new Matrix4().makeRotationX(Math.PI / 2))

  return m
}

function rebuildMesh() {
  const old = instanced.value
  if (old) {
    old.geometry.dispose()
    instanced.value = null
  }

  ensureGlyphAtlas()
  drawGlyphAtlas()

  const segGeom = new PlaneGeometry(segmentSpace.value, effectiveDepth.value, 1, 1)

  const instances = runLength.value * Math.max(1, count.value)
  const mesh = new InstancedMesh(segGeom, material, instances)
  mesh.frustumCulled = false
  mesh.instanceMatrix.setUsage(DynamicDrawUsage)

  const segIndex = new Float32Array(instances)
  const ribbonIdArr = new Float32Array(instances)
  const glyphArr = new Float32Array(instances)

  const rl = runLength.value

  const raw = ribbonText.value ?? ''
  const rep = raw.length > 0 ? raw : ' '
  const times = Math.max(1, Math.ceil(rl / Math.max(1, rep.length)))
  const sEff = rep.repeat(times).slice(0, rl)

  const map = glyphIndex.value
  const spaceId = map.get(' ') ?? 0

  for (let idx = 0; idx < instances; idx++) {
    const rId = Math.floor(idx / rl)
    const i = idx - rId * rl

    segIndex[idx] = i
    ribbonIdArr[idx] = rId

    const textPos = (rl - 1 - i)
    const ch = sEff[textPos] ?? ' '
    glyphArr[idx] = map.get(ch) ?? spaceId
  }

  mesh.geometry.setAttribute('aSegIndex', new InstancedBufferAttribute(segIndex, 1))
  mesh.geometry.setAttribute('aRibbonId', new InstancedBufferAttribute(ribbonIdArr, 1))
  mesh.geometry.setAttribute('aGlyph', new InstancedBufferAttribute(glyphArr, 1))

  instanced.value = mesh
}

onMounted(() => {
  rebuildMesh()
  ready.value = true
})

watch([
  runLength,
  baseRunLength,
  count,
  segmentSpace,
  depth,
  ribbonText,
  showText,
  textSize,
  textStroke,
  selectedFont,
  textWeight,
  lengthStretch,
  widthStretch,
], () => {
  if (!ready.value)
    return
  rebuildMesh()
})

function handleLoop(payload: { elapsedTime?: number, elapsed?: number }) {
  if (!isClient)
    return

  const t = (payload.elapsedTime ?? payload.elapsed ?? 0) * timeScale.value

  const mesh = instanced.value
  if (!mesh)
    return

  const rl = runLength.value
  const c = Math.max(1, count.value)
  const instances = rl * c

  if (mesh.count !== instances)
    mesh.count = instances

  const frameCountApprox = t * 60
  const scroll = frameCountApprox * speed.value

  if (dbgWrap.value) {
    const cycle = 2 * segmentCount.value + 2 * segmentCount.value * middleStretch.value
    const wrap = Math.floor(scroll / Math.max(1e-6, cycle))
    if (_lastWrap.value === null)
      _lastWrap.value = wrap
    if (wrap !== _lastWrap.value) {
      _lastWrap.value = wrap
      consola.info('[RibbonWrap]', { wrap, scroll, cycle, rl })
    }
  }

  const shader = (material as any).userData?.shader
  if (shader?.uniforms) {
    shader.uniforms.uScroll.value = scroll
    shader.uniforms.uRunLength.value = rl

    shader.uniforms.uCol1.value.set(col1.value)
    shader.uniforms.uCol2.value.set(col2.value)
    shader.uniforms.uCol3.value.set(col3.value)
    shader.uniforms.uCol4.value.set(col4.value)

    shader.uniforms.uShowText.value = showText.value ? 1 : 0
    shader.uniforms.uTextColor.value.set(textColor.value)
    shader.uniforms.uTextOpacity.value = textOpacity.value
    shader.uniforms.uTextWidth.value = textWidth.value
    shader.uniforms.uTextSpacing.value = textSpacing.value

    shader.uniforms.uTracking.value = tracking.value / 100
    shader.uniforms.uTypeHeight.value = typeHeight.value / 100

    shader.uniforms.uTextFlipX.value = textFlipX.value ? 1 : 0
    shader.uniforms.uTextFlipY.value = textFlipY.value ? 1 : 0
    shader.uniforms.uTextBoost.value = textBoost.value
    shader.uniforms.uTextMix.value = textMix.value

    shader.uniforms.uAtlasCols.value = ATLAS_COLS * 1.0
    shader.uniforms.uAtlasRows.value = ATLAS_ROWS * 1.0

    shader.uniforms.uShowFrame.value = showSegmentFrame.value ? 1 : 0
    shader.uniforms.uFrameStrength.value = frameStrength.value
    shader.uniforms.uFrameMode.value = frameMode.value

    shader.uniforms.uShowBands.value = showBands.value ? 1 : 0
    shader.uniforms.uBandStrength.value = bandStrength.value

    shader.uniforms.uTextMap.value = glyphTex.value
  }

  const { m: globalM, radius, segLength } = buildP5GlobalMatrix(scroll)

  for (let idx = 0; idx < instances; idx++) {
    const rId = Math.floor(idx / rl)
    const i = idx - rId * rl

    const segM = buildP5SegmentMatrix({
      i,
      ribbonId: rId,
      runLength: rl,
      scroll,
      radius,
      segLength,
    })

    const finalM = globalM.clone().multiply(segM)
    mesh.setMatrixAt(idx, finalM)
  }

  mesh.instanceMatrix.needsUpdate = true
}
</script>

<template>
  <div
    ref="containerEl"
    class="relative overflow-hidden"
    :class="props.full ? '' : 'w-full'"
    :style="containerStyle"
  >
    <div class="pointer-events-none absolute inset-0">
      <button
        v-if="panelHidden"
        class="bg-black/60 pointer-events-auto fixed right-4 top-24 z-30 border border-pureWhite/10 rounded-full px-3 py-1 text-[11px] text-pureWhite/80 font-mono uppercase tracking-[0.2em] shadow-lg backdrop-blur-md"
        @click="panelHidden = false"
      >
        Show Controls
      </button>
      <div
        v-if="!panelHidden"
        class="bg-black/75 pointer-events-auto fixed right-4 top-24 z-30 max-h-[80vh] w-72 overflow-auto border border-pureWhite/10 rounded-lg p-3 text-[12px] text-pureWhite shadow-xl backdrop-blur-md space-y-2"
      >
        <div class="flex items-center justify-between gap-2 pb-1">
          <div class="text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
            Ribbon Controls
          </div>
          <div class="flex items-center gap-2">
            <button
              class="border border-pureWhite/10 rounded px-2 py-1 text-[10px] text-pureWhite/70 font-mono uppercase tracking-[0.18em] hover:text-pureWhite/90"
              @click="panelCollapsed = !panelCollapsed"
            >
              {{ panelCollapsed ? 'Expand' : 'Collapse' }}
            </button>
            <button
              class="border border-pureWhite/10 rounded px-2 py-1 text-[10px] text-pureWhite/70 font-mono uppercase tracking-[0.18em] hover:text-pureWhite/90"
              @click="panelHidden = true"
            >
              Hide
            </button>
          </div>
        </div>

        <div v-show="!panelCollapsed" class="space-y-2">
          <div class="text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
            Camera
          </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>X</span>
          <input v-model.number="camX" type="range" min="-1000" max="1000" step="1">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ camX.toFixed(0) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Y</span>
          <input v-model.number="camY" type="range" min="-1000" max="1000" step="1">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ camY.toFixed(0) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Z</span>
          <input v-model.number="camZOffset" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ camZOffset.toFixed(0) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Zoom</span>
          <input v-model.number="camZoom" type="range" min="0.25" max="3" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ camZoom.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Tilt
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RX</span>
          <input v-model.number="rotX" type="range" min="-3.14" max="3.14" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ rotX.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RY</span>
          <input v-model.number="rotY" type="range" min="-3.14" max="3.14" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ rotY.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>RZ</span>
          <input v-model.number="rotZ" type="range" min="-6.28" max="6.28" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ rotZ.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Debug
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Scale</span>
          <input v-model.number="scaler" type="range" min="0.2" max="3" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ scaler.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift X</span>
          <input v-model.number="shiftX" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ shiftX.toFixed(0) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift Y</span>
          <input v-model.number="shiftY" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ shiftY.toFixed(0) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Shift Z</span>
          <input v-model.number="shiftZ" type="range" min="-2000" max="2000" step="5">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ shiftZ.toFixed(0) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Band Stretch
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Length</span>
          <input v-model.number="lengthStretch" type="range" min="0.5" max="3" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ lengthStretch.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Width</span>
          <input v-model.number="widthStretch" type="range" min="0.5" max="3" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ widthStretch.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Ribbon Look
        </div>

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

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Input
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Text</span>
          <input v-model="ribbonText" type="text" class="w-full border border-pureWhite/10 rounded bg-pureWhite/10 px-2 py-1 text-[12px] text-pureWhite">
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Font</span>
          <select v-model="selectedFont" class="w-full border border-pureWhite/10 rounded bg-pureWhite/10 px-2 py-1 text-[12px] text-pureWhite">
            <option v-for="opt in fontOptions" :key="opt.family" :value="opt.family">
              {{ opt.label }}
            </option>
          </select>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Weight</span>
          <input v-model.number="textWeight" type="range" min="100" max="900" step="50" @input="drawTextTexture()">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textWeight }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Text</span>
          <input v-model="showText" type="checkbox" @change="drawTextTexture()">
        </label>

        <div class="grid grid-cols-2 gap-2">
          <label class="grid grid-cols-[auto,1fr] items-center gap-2">
            <span>TC</span>
            <input v-model="textColor" type="color" class="h-6 w-full" @change="drawTextTexture()">
          </label>
          <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
            <span>Op</span>
            <input v-model.number="textOpacity" type="range" min="0" max="1" step="0.01" @input="drawTextTexture()">
            <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textOpacity.toFixed(2) }}</span>
          </label>
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Size</span>
          <input v-model.number="textSize" type="range" min="24" max="140" step="1" @input="drawTextTexture()">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textSize }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Stroke</span>
          <input v-model.number="textStroke" type="range" min="0" max="22" step="1" @input="drawTextTexture()">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textStroke }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Width</span>
          <input v-model.number="textWidth" type="range" min="0.35" max="2.5" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textWidth.toFixed(2) }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Space</span>
          <input v-model.number="textSpacing" type="range" min="0" max="0.45" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textSpacing.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          p5 Glyph Padding
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Tracking</span>
          <input v-model.number="tracking" type="range" min="0" max="80" step="1">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ tracking }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Height</span>
          <input v-model.number="typeHeight" type="range" min="0" max="80" step="1">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ typeHeight }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Fix
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Flip X</span>
          <input v-model="textFlipX" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Flip Y</span>
          <input v-model="textFlipY" type="checkbox">
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Pop
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Boost</span>
          <input v-model.number="textBoost" type="range" min="0.8" max="2.2" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textBoost.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Mix</span>
          <input v-model.number="textMix" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textMix.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text Lock
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Follow</span>
          <input v-model="textFollowScroll" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Snap</span>
          <input v-model="textSnapTexel" type="checkbox">
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Text AA
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Multi</span>
          <input v-model="textMultiSample" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Strength</span>
          <input v-model.number="textSampleStrength" type="range" min="0" max="2" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ textSampleStrength.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Frame
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Frame</span>
          <input v-model="showSegmentFrame" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Str</span>
          <input v-model.number="frameStrength" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ frameStrength.toFixed(2) }}</span>
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Mode</span>
          <select v-model.number="frameMode" class="bg-black/30 border border-pureWhite/10 rounded px-2 py-1">
            <option :value="0">Off</option>
            <option :value="1">Tiles</option>
            <option :value="2">Outer</option>
          </select>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Bands
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Bands</span>
          <input v-model="showBands" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Str</span>
          <input v-model.number="bandStrength" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ bandStrength.toFixed(2) }}</span>
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Motion
        </div>

        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Speed</span>
          <input v-model.number="speed" type="range" min="0" max="1" step="0.01">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ speed.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <span>Time</span>
          <input v-model.number="timeScale" type="range" min="0" max="2" step="0.05">
          <span class="text-[10px] text-pureWhite/60 font-mono tabular-nums">{{ timeScale.toFixed(2) }}</span>
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Alt</span>
          <input v-model="alt" type="checkbox">
        </label>

        <div class="pt-1 text-xs text-pureWhite/70 tracking-[0.15em] font-mono uppercase">
          Background
        </div>

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
        <TresOrthographicCamera
          :position="cameraPos"
          :look-at="[0, 0, 0]"
          :left="ortho.left"
          :right="ortho.right"
          :top="ortho.top"
          :bottom="ortho.bottom"
          :near="ortho.near"
          :far="ortho.far"
          :zoom="camZoom"
        />
        <primitive v-if="instanced" :object="instanced" />
      </TresCanvas>
    </ClientOnly>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
</style>
