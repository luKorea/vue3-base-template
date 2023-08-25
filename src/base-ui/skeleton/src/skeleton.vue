<template>
  <div
    v-if="loading"
    :class="['ant-skeleton-paragraph', className]"
    :style="style"
  >
    <div
      v-for="(_, index) of rows"
      :key="index"
      :class="[
        'ant-skeleton-paragraph-row',
        animate ? 'ant-skeleton-paragraph-animate  animate' : 'no-animate'
      ]"
    ></div>
  </div>
  <slot a:else />
</template>

<script setup lang="ts">
interface IProps {
  className?: string
  loading: boolean
  rows?: number
  style?: any
  animate?: boolean
}

withDefaults(defineProps<IProps>(), {
  className: '',
  rows: 20,
  style: {},
  animate: true
})

defineEmits(['update:loading'])
</script>

<style scoped lang="less">
.ant-skeleton-paragraph {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  .ant-skeleton-paragraph-row {
    width: 100%;
    height: 15px;
    margin-bottom: 12px;
    border-radius: 12px;
    &:last-child {
      width: 60%;
    }
  }
}

.no-animate {
  background: #eee;
}

.animate {
  background: linear-gradient(
    90deg,
    #eee 25%,
    rgba(204, 204, 204, 0.6) 37%,
    #eee 63%
  );
  background-size: 400% 100%;
}

.ant-skeleton-paragraph-animate {
  -webkit-animation: ant-skeleton-loading 2s ease infinite;
  animation: ant-skeleton-loading 2s ease infinite;
}
@-webkit-keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
