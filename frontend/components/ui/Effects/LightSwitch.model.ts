export interface LightSwitchProps {
  modelValue?: boolean
}

export interface LightSwitchEmits {
  (e: 'update:modelValue', value: boolean): void
}
