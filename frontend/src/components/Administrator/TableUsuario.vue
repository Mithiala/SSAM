<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="usuarios"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="accent"
            icon="check"
            @click="triggerPositive"
          />
          <q-btn
            flat
            round
            dense
            color="accent"
            icon="block"
            @click="declineSolicitud(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/Administrador/Auth-Store";

onMounted(async () => {
  if (isAuthenticated) {
  //await listMed();
}
});

const {

} = useAuthStore();

const {  } =
  storeToRefs(useAuthStore());

  const columns = [
  {
    name: 'id_esp',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id_esp,
    format: val => `${val}`,
    sortable: true,
    align: "center",
  },
  {
    name: 'avatar',
    align: 'center',
    label: 'Avatar',
    field: 'avatar',
    sortable: true,
  },
  {
    name: 'nombre_esp',
    align: 'center',
    label: 'Nombre',
    field: 'nombre_esp',
  },
  {
    name: 'especialidad',
    align: 'center',
    label: 'Especialidad',
    field: 'especialidad'
  },
  {
    name: 'username',
    align: 'center',
    label: 'Username',
    field: 'username',
  },
  {
    name: 'centro_pertenece',
    align: 'center',
    label: 'Centro al que pertenece',
    field: 'centro_pertenece',
  },
  {
    name: 'rol',
    align: 'center',
    label: 'Rol',
    field: 'rol',
  },
  {
    name: 'activo',
    align: 'center',
    label: 'Activo',
    field: 'activo',
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const date = ref("");

const triggerPositive = () => {
  const $q = useQuasar()
  $q.notify({
    color: 'positive',
    message: 'This is a "positive" type notification.'
  })
}

</script>

<style lang="sass">
.table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #6db555

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
