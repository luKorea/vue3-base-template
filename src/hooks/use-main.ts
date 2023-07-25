import useMainStore from '@/store/module/main'
import { storeToRefs } from 'pinia'

export default function useMainHooks() {
  const useMain = useMainStore()
  const { state } = storeToRefs(useMain)
  return {
    state,
    useMain
  }
}
