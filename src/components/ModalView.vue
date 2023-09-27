<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 z-20 bg-dialog p-6 flex items-center justify-center" :class="showModal ? '' : 'hidden'">
    <Transition name="bounce">
      <div class="bg-white rounded shadow-sm card" v-if="showModal">
        <div class="flex justify-between px-2 pt-3">
          <div class="text-bold text-lg text-black-300"></div>
          <Icon icon="material-symbols:close" class="cursor-pointer font-medium text-red-500" @click.stop="onCloseModal" />
        </div>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style>
.bg-dialog {
  background: rgba(0, 0, 0, 0.5);
}
</style>

<script setup>
const props = defineProps({
  showModal : {
    type:Boolean,
    default: false
  },
  titleModal:{
    type:String,
  }
})

const emits = defineEmits(['update:showModal'])

const onCloseModal = () => {
  emits('update:showModal', false)
}
</script>