import type { App, PropType } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import { defineComponent, h } from 'vue'

type StorybookLinkTarget = string | {
  path?: string
}

const StorybookNuxtLink = defineComponent({
  name: 'StorybookNuxtLink',
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object] as PropType<StorybookLinkTarget>,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    rel: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      let resolvedHref = props.href || ''

      if (typeof props.to === 'string')
        resolvedHref = props.to
      else if (props.to && typeof props.to === 'object' && 'path' in props.to)
        resolvedHref = String(props.to.path ?? props.href ?? '#')

      return h('a', {
        ...attrs,
        href: resolvedHref ?? '#',
        target: props.target || undefined,
        rel: props.rel || undefined,
      }, slots.default?.())
    }
  },
})

const StorybookNuxtIcon = defineComponent({
  name: 'StorybookNuxtIcon',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      if (!props.name)
        return h('span', attrs, slots.default?.())

      return h(IconifyIcon, {
        ...attrs,
        icon: props.name,
      }, slots)
    }
  },
})

export function registerStorybookStubs(app: App) {
  app.component('NuxtLink', StorybookNuxtLink)
  app.component('NuxtIcon', StorybookNuxtIcon)
  app.component('Icon', StorybookNuxtIcon)
}
