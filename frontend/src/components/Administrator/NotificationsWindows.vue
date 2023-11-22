<template>
  <q-list v-if="count != 0">
    <NotificationItem
      v-for="notice in notifications"
      :key="notice.id"
      :notice="notice"
    />
  </q-list>
  <q-list v-else bordered>
    <q-item class="ellipsis"> No hay Nuevas Notificaciones </q-item>
  </q-list>
</template>

<script setup>
import NotificationItem from "./NotificationItem.vue";
import { useNoticeStore } from "src/stores/Administrator/Notice-Store";
import { storeToRefs } from "pinia";

const { notifications, count } = storeToRefs(useNoticeStore());
</script>
