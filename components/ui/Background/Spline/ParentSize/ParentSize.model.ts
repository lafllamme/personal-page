// ParentSize.model.ts
export type DimKey = string[] | string

export interface ParentSizeProps {
  class?: string
  debounceTime?: number
  ignoreDimensions?: DimKey
  parentSizeStyles?: object
  enableDebounceLeadingCallback?: boolean
}

// Note: we don’t strictly need ParentSizeDefaultProps typed as ParentSizeProps anymore,
// since we’re using functions for the non-primitives.
export const ParentSizeDefaultProps = {
  class: '' as const,
  debounceTime: 300 as const,
  ignoreDimensions: () => [] as DimKey, // ← wrap in a function
  parentSizeStyles: () => ({}), // ← wrap in a function
  enableDebounceLeadingCallback: true as const,
}
