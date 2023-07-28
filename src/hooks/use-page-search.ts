import { ref } from 'vue'
import PageContent from '@/components/page-content'

import PageSearch from '@/components/page-search'

export function usePageSearch(fn?: any) {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const pageSearchRef = ref<InstanceType<typeof PageSearch>>()
  const handleResetClick = (queryInfo?: any) => {
    pageContentRef?.value?.getPageData({
      ...queryInfo
    })
  }
  const handleQueryClick = (queryInfo: any) => {
    if (fn) {
      fn()
    } else pageContentRef.value?.getPageData(queryInfo)
  }
  return {
    pageContentRef,
    handleResetClick,
    handleQueryClick,
    pageSearchRef
  } as const
}
