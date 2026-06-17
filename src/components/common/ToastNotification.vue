<template>
     <div class="toast-wrap">
            <div class="toast-msg" :class="{ 'show': toast.show }">
                <i :class="toast.icon"></i>
                <span>{{ toast.message }}</span>
            </div>
        </div>
</template>
<script setup>
import { useToast } from "@/composables/useToast";
const { toastState: toast } = useToast(); 
</script>