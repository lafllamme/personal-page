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

const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

const ready = ref(false)
const dpr = ref(1.5)

/**
 * Ribbon text and base length
 */
const ribbonText = ref(
  (' THE SEA IS A DESERT OF WAVES, A WILDERNESS OF WATER.').repeat(5).slice(0, 160),
)
const baseRunLength = computed(() => Math.max(1, ribbonText.value.length))

/**
 * Band stretch controls
 */
const lengthStretch = ref(1.3) // makes more segments without editing ribbonText
const widthStretch = ref(1.31) // scales depth for thickness

const runLength = computed(() => {
  const v = Math.max(1, Math.floor(baseRunLength.value * Math.max(0.25, lengthStretch.value)))
  return v
})
const effectiveDepth = computed(() => Math.max(1, depth.value * Math.max(0.25, widthStretch.value)))

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
const camZ = ref(37.75)
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

const showText = ref(true)
const textColor = ref('#ffffff')
const textOpacity = ref(0.95)
const textSize = ref(111)
const textStroke = ref(1)

/**
 * Text fixes + readability
 */
const textFlipX = ref(true)
const textFlipY = ref(false)
const textBoost = ref(1.15)
const textMix = ref(0.95)

/**
 * Legacy toggles kept for UI compatibility
 * (not used in glyph atlas approach)
 */
const textFollowScroll = ref(true)
const textSnapTexel = ref(true)
const textMultiSample = ref(true)
const textSampleStrength = ref(1.0)

/**
 * Frame options
 * frameMode: 0 off, 1 per tile, 2 outer only
 */
const showSegmentFrame = ref(true)
const frameStrength = ref(1)
const frameMode = ref<0 | 1 | 2>(2)

const showBands = ref(false)
const bandStrength = ref(0)

/**
 * Debug wrap logs
 */
const dbgWrap = ref(true)
const _lastWrap = ref<number | null>(null)

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
    `cam (${camX.value.toFixed(2)}, ${camY.value.toFixed(2)}, ${camZ.value.toFixed(2)}) fov ${fov.value.toFixed(1)} | rot (${rotX.value.toFixed(2)}, ${rotY.value.toFixed(2)}, ${rotZ.value.toFixed(2)}) | scale ${scaler.value.toFixed(4)} | shift (${shiftX.value.toFixed(2)}, ${shiftY.value.toFixed(2)}, ${shiftZ.value.toFixed(2)}) | motion speed ${speed.value.toFixed(2)} time ${timeScale.value.toFixed(2)} alt ${alt.value ? 1 : 0} | segs space ${segmentSpace.value} count ${segmentCount.value} depth ${depth.value} depthScale ${widthStretch.value.toFixed(2)} mid ${middleStretch.value} xSpace ${xSpace.value} zSpace ${zSpace.value} | lenBase ${baseRunLength.value} lenScale ${lengthStretch.value.toFixed(2)} lenEff ${runLength.value} | text ${showText.value ? 1 : 0} size ${textSize.value} stroke ${textStroke.value} opacity ${textOpacity.value.toFixed(2)} flipX ${textFlipX.value ? 1 : 0} flipY ${textFlipY.value ? 1 : 0} boost ${textBoost.value.toFixed(2)} mix ${textMix.value.toFixed(2)} | frame ${showSegmentFrame.value ? frameStrength.value.toFixed(2) : 0} mode ${frameMode.value} | bands ${showBands.value ? bandStrength.value.toFixed(2) : 0}`,
  )
}

watch([
  camX,
  camY,
  camZ,
  fov,
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
], () => logState(), { immediate: true })

const instanced = shallowRef<InstancedMesh | null>(null)

const material = new MeshBasicMaterial({
  color: 0xFFFFFF,
  side: DoubleSide,
})

/**
 * Glyph atlas (p5 like)
 */
const ATLAS_COLS = 16
const ATLAS_ROWS = 16
const ATLAS_CELL = 128
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

  // avoid mip bleed across cells
  tex.generateMipmaps = false
  tex.minFilter = LinearFilter
  tex.magFilter = LinearFilter
  tex.anisotropy = 16

  tex.flipY = false
  tex.premultiplyAlpha = false
  tex.needsUpdate = true

  glyphCanvas.value = c
  glyphCtx.value = ctx
  glyphTex.value = tex

  consola.info('[RibbonGlyphAtlas]', 'atlas created', {
    w: c.width,
    h: c.height,
    cols: ATLAS_COLS,
    rows: ATLAS_ROWS,
    cell: ATLAS_CELL,
    cap: ATLAS_CAP,
  })
}

function buildGlyphSetFromText() {
  const s = ribbonText.value ?? ''
  const set = new Set<string>()
  set.add(' ')
  for (let i = 0; i < s.length; i++)
    set.add(s[i] ?? ' ')

  const list = Array.from(set)
  list.sort((a, b) => (a === ' ' ? -1 : b === ' ' ? 1 : a.localeCompare(b)))

  if (list.length > ATLAS_CAP) {
    consola.warn('[RibbonGlyphAtlas]', 'too many unique glyphs for atlas capacity', {
      unique: list.length,
      cap: ATLAS_CAP,
    })
    list.length = ATLAS_CAP
  }

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

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  // draw white glyph into alpha, shader applies color
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.font = `800 ${size}px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

  const pad = Math.max(10, Math.floor(ATLAS_CELL * 0.12))
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

    // metric centered placement
    const m = ctx.measureText(ch)
    const xOff = -((m.actualBoundingBoxLeft ?? 0) + (m.actualBoundingBoxRight ?? 0)) * 0.5
    const yOff = ((m.actualBoundingBoxAscent ?? 0) - (m.actualBoundingBoxDescent ?? 0)) * 0.5

    if (stroke > 0) {
      ctx.lineWidth = stroke
      ctx.strokeText(ch, xOff, yOff)
    }
    ctx.fillText(ch, xOff, yOff)

    // clear thin borders to reduce sampling bleed
    ctx.clearRect(-cx, -cy, pad, ATLAS_CELL)
    ctx.clearRect(cx - pad, -cy, pad, ATLAS_CELL)
    ctx.clearRect(-cx, -cy, ATLAS_CELL, pad)
    ctx.clearRect(-cx, cy - pad, ATLAS_CELL, pad)

    ctx.restore()
  }

  ctx.restore()
  tex.needsUpdate = true
}

function drawTextTexture() {
  // keep function name for template calls
  drawGlyphAtlas()
}

watch([ribbonText, showText, textSize, textStroke], () => {
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
  float rl = max(1.0, uRunLength);
  float isEnd = step(vSegIndex, 0.5) + step(rl - 1.5, vSegIndex);
  isEnd = clamp(isEnd, 0.0, 1.0);

  float ex = min(uv.x, 1.0 - uv.x);
  float ey = min(uv.y, 1.0 - uv.y);

  float fx = edgeMask(ex) * isEnd;
  float fy = edgeMask(ey);

  return max(fx, fy);
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

  if (!gl_FrontFacing) base *= 0.86;

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
    vec2 tuv = atlasUv(vGlyph, uv);
    vec4 tx = texture2D(uTextMap, tuv);

    float a = clamp(tx.a * uTextOpacity, 0.0, 1.0);
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
  if (instanced.value) {
    instanced.value.geometry.dispose()
    material.dispose()
  }
  if (glyphTex.value)
    glyphTex.value.dispose()
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
  if (step < 0)
    step += totalCycle
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
  const baseLen = baseRunLength.value

  // build effective string by repeating
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

    // p5: letter_select = runLength - 1 - i
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
      depth: effectiveDepth.value,
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
    :class="props.full ? '' : 'w-full'"
    :style="containerStyle"
  >
    <div class="pointer-events-none absolute inset-0">
      <div class="border-white/10 bg-black/75 text-white pointer-events-auto fixed right-4 top-24 z-30 max-h-[80vh] w-72 overflow-auto border rounded-lg p-3 text-[12px] shadow-xl backdrop-blur-md space-y-2">
        <div class="text-white/70 text-xs tracking-[0.15em] font-mono uppercase">
          Camera
        </div>

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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Tilt
        </div>

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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Debug
        </div>

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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Band Stretch
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Length</span>
          <input v-model.number="lengthStretch" type="range" min="0.5" max="3" step="0.01">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Width</span>
          <input v-model.number="widthStretch" type="range" min="0.5" max="3" step="0.01">
        </label>

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Text Pop
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Boost</span>
          <input v-model.number="textBoost" type="range" min="0.8" max="2.2" step="0.01">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Mix</span>
          <input v-model.number="textMix" type="range" min="0" max="1" step="0.01">
        </label>

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Text AA
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Multi</span>
          <input v-model="textMultiSample" type="checkbox">
        </label>
        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Strength</span>
          <input v-model.number="textSampleStrength" type="range" min="0" max="2" step="0.01">
        </label>

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Frame
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Frame</span>
          <input v-model="showSegmentFrame" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Str</span>
          <input v-model.number="frameStrength" type="range" min="0" max="1" step="0.01">
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Mode</span>
          <select v-model.number="frameMode" class="border-white/10 bg-black/30 border rounded px-2 py-1">
            <option :value="0">Off</option>
            <option :value="1">Tiles</option>
            <option :value="2">Outer</option>
          </select>
        </label>

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Bands
        </div>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Bands</span>
          <input v-model="showBands" type="checkbox">
        </label>

        <label class="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>Str</span>
          <input v-model.number="bandStrength" type="range" min="0" max="1" step="0.01">
        </label>

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
          Motion
        </div>

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

        <div class="text-white/70 pt-1 text-xs tracking-[0.15em] font-mono uppercase">
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
