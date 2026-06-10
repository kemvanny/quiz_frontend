import { reactive } from 'vue';

const toastState = reactive({
  show: false,
  message: '',
  icon: ''
});

export function useToast() {
  const triggerToast = (msg, iconClass) => {
    toastState.message = msg;
    toastState.icon = iconClass;
    toastState.show = true;
    setTimeout(() => {
      toastState.show = false;
    }, 3000);
  };

  return { toastState, triggerToast };
}