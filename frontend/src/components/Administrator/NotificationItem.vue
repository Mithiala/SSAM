<template>
  <q-slide-item @left="onDelete(notice.id)">
    <template v-slot:left>
      <q-icon name="delete" />
    </template>

    <q-card class="no-margin no-padding">
      <q-card-section class="no-margin q-pa-sm">
        <q-item clickable>
          <q-item-section avatar>
            <q-item-label caption lines="2">{{ notice.content }}</q-item-label>
          </q-item-section>
          <q-item-section top side>
            <q-item-label caption>
              <q-badge floating transparent outlined rounded color="primary">
                {{ formatTimestamp(notice.timestamp) }}
              </q-badge>
            </q-item-label>
            <q-btn
              class="q-mt-sm"
              flat
              round
              size="sm"
              color="negative"
              icon="close"
              @click="onDelete(notice.id)"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-slide-item>
  <q-separator inset />
</template>

<script setup>
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNoticeStore } from "src/stores/Administrator/Notice-Store";
const { destroyNotice } = useNoticeStore();

const props = defineProps(["notice"]);
const emits = defineEmits(["delete"]);

// Función para formatear el timestamp con dayjs
const formatTimestamp = (timestamp) => {
  dayjs.extend(relativeTime);
  dayjs.locale(es);
  return dayjs(timestamp).fromNow();
};

const onDelete = () => {
  destroyNotice(props.notice.id);
  emits("delete");
};
</script>
