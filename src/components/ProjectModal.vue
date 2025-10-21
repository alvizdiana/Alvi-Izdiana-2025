<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="modal-mask" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <slot name="header">
              <h3>Default Header</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot>
              <p>Default body content.</p>
            </slot>
          </div>

          <div class="modal-footer flex justify-end mt-4">
            <slot name="footer">
              <button class="modal-default-button" @click="closeModal">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<!-- <style scoped>
/* .modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 90%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fbb359;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
} */

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: translateY(-50px);
}
</style> -->
