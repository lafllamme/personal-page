export type GlassPresetName = 'enhanced' | 'reference'

export interface GlassMetaballsSettings {
  perf: {
    dprMax: number
    marchingResolution: number
    marchingMaxPoly: number
  }
  environment: {
    mode: 'room' | 'image'
    url: string
    useAsBackground: boolean
    useAsBackdrop: boolean
    backgroundBlurriness: number
    backgroundIntensity: number
  }
  field: {
    scale: number
    isolation: number
    metaMapMul: number
    offsetX: number
    offsetY: number
    offsetZ: number
  }
  material: {
    transmission: number
    thickness: number
    ior: number
    roughness: number
    metalness: number
    envMapIntensity: number
    clearcoat: number
    clearcoatRoughness: number
  }
  bodies: {
    count: number
    range: number
    spawnYBias: number
    sizeMin: number
    sizeMax: number
    sizePow: number
    densityMin: number
    densityMax: number
    linDampMin: number
    linDampMax: number
    angDampMin: number
    angDampMax: number
    restitution: number
    friction: number
    pullBaseMin: number
    pullBaseMax: number
    pullBoostMulMin: number
    pullBoostMulMax: number
    pullBoostCapMin: number
    pullBoostCapMax: number
    maxSpeedMin: number
    maxSpeedMax: number
    maxAngMin: number
    maxAngMax: number
    flowStrength: number
    flowSpeed: number
    flowSpatial: number
    swirlStrength: number
    swirlSpeed: number
    strengthBase: number
    strengthSizeMul: number
    strengthRand: number
    subtractBase: number
    subtractInvSizeMul: number
    subtractRand: number
  }
  mouse: {
    lerp: number
    parkZ: number
    edgeDeadzoneNdc: number
    colliderMul: number
    radius: number
  }
}

export function createDefaultGlassMetaballsSettings(): GlassMetaballsSettings {
  return {
    perf: {
      dprMax: 1,
      marchingResolution: 48,
      marchingMaxPoly: 90000,
    },

    environment: {
      mode: 'image',
      url: 'https://i.imgur.com/eQWtwTJ.jpeg',
      useAsBackground: false,
      useAsBackdrop: true,
      backgroundBlurriness: 0.05,
      backgroundIntensity: 1,
    },

    field: {
      scale: 4.65,
      isolation: 335,
      metaMapMul: 0.1,
      offsetX: 0.5,
      offsetY: 0.5,
      offsetZ: 0.5,
    },

    material: {
      transmission: 1.0,
      thickness: 1.0,
      ior: 1.5,
      roughness: 0.03,
      metalness: 0.0,
      envMapIntensity: 1.35,
      clearcoat: 0.0,
      clearcoatRoughness: 0.2,
    },

    bodies: {
      count: 40,
      range: 6,
      spawnYBias: 3,

      sizeMin: 0.12,
      sizeMax: 0.34,
      sizePow: 1.8,

      densityMin: 0.35,
      densityMax: 0.70,

      linDampMin: 0.6,
      linDampMax: 1.2,
      angDampMin: 0.6,
      angDampMax: 1.3,

      restitution: 0.0,
      friction: 0.8,

      pullBaseMin: 0.35,
      pullBaseMax: 0.48,
      pullBoostMulMin: 0.08,
      pullBoostMulMax: 0.14,
      pullBoostCapMin: 0.85,
      pullBoostCapMax: 1.35,

      maxSpeedMin: 8.0,
      maxSpeedMax: 10.5,
      maxAngMin: 9.0,
      maxAngMax: 13.0,

      flowStrength: 0.16,
      flowSpeed: 0.85,
      flowSpatial: 0.6,
      swirlStrength: 0.10,
      swirlSpeed: 0.6,

      strengthBase: 0.34,
      strengthSizeMul: 0.95,
      strengthRand: 0.08,

      subtractBase: 7.2,
      subtractInvSizeMul: 12.0,
      subtractRand: 2.0,
    },

    mouse: {
      lerp: 0.22,
      parkZ: 50,
      edgeDeadzoneNdc: 0.96,
      colliderMul: 6.0,
      radius: 0.25,
    },
  }
}

function createReferencePreset(): GlassMetaballsSettings {
  const preset = createDefaultGlassMetaballsSettings()

  preset.perf.marchingResolution = 96
  preset.field.scale = 5
  preset.field.isolation = 1000

  preset.bodies.sizeMin = 0.2
  preset.bodies.sizeMax = 0.2
  preset.bodies.sizePow = 1
  preset.bodies.densityMin = 0.5
  preset.bodies.densityMax = 0.5
  preset.bodies.linDampMin = 0
  preset.bodies.linDampMax = 0
  preset.bodies.angDampMin = 0
  preset.bodies.angDampMax = 0
  preset.bodies.restitution = 0
  preset.bodies.friction = 0.5
  preset.bodies.pullBaseMin = 0.5
  preset.bodies.pullBaseMax = 0.5
  preset.bodies.pullBoostMulMin = 0
  preset.bodies.pullBoostMulMax = 0
  preset.bodies.pullBoostCapMin = 0
  preset.bodies.pullBoostCapMax = 0
  preset.bodies.maxSpeedMin = 100
  preset.bodies.maxSpeedMax = 100
  preset.bodies.maxAngMin = 100
  preset.bodies.maxAngMax = 100
  preset.bodies.flowStrength = 0
  preset.bodies.swirlStrength = 0
  preset.bodies.strengthBase = 0.5
  preset.bodies.strengthSizeMul = 0
  preset.bodies.strengthRand = 0
  preset.bodies.subtractBase = 10
  preset.bodies.subtractInvSizeMul = 0
  preset.bodies.subtractRand = 0

  preset.mouse.radius = 0.25
  preset.mouse.colliderMul = 6

  return preset
}

export const glassMetaballsPresets: Record<GlassPresetName, GlassMetaballsSettings> = {
  enhanced: createDefaultGlassMetaballsSettings(),
  reference: createReferencePreset(),
}
