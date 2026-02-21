import type {
  LayoutContainerGutter,
  LayoutContainerMax,
  LayoutContainerTag,
} from './PageContainer.contract'
import {
  LayoutContainerBleedClasses,
  LayoutContainerGutterClasses,
  LayoutContainerMaxClasses,
} from './PageContainer.contract'

export type PageContainerMax = LayoutContainerMax
export type PageContainerGutter = LayoutContainerGutter
export type PageContainerTag = LayoutContainerTag

export interface PageContainerProps {
  as?: PageContainerTag
  max?: PageContainerMax
  gutter?: PageContainerGutter
  bleed?: boolean
}

export const PageContainerDefaults: PageContainerProps = {
  as: 'div',
  max: 'full',
  gutter: 'md',
  bleed: false,
}

export const PageContainerMaxClasses = LayoutContainerMaxClasses
export const PageContainerGutterClasses = LayoutContainerGutterClasses
export const PageContainerBleedClasses = LayoutContainerBleedClasses
