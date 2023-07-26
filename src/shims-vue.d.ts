/* eslint-disable */

export {}
declare module '*.vue' {
  export interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.json'
declare module 'sortablejs'
