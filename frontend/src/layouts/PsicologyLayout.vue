<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-cyan-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img fit="fill" src="src/assets/psicologia.png" >
          </q-avatar>
          Sistema de Salud para Adulto Mayor
        </q-toolbar-title>
        <q-separator vertical inset />
        <div id="listaNotificaciones">
          <q-btn dense
            stretch
            unelevated
            padding="5px"
            icon="notifications"
            @click="mostrarNotificaciones">
            <q-badge
            floating
            color="green"
            rounded
            v-if="notificaciones.length > 0"
            {{ notificaciones.length }}
            />
          </q-btn>
        </div>

        <div>
          <q-btn
          dense
            stretch
            unelevated
            padding="5px"
          icon="mail"
          @click="openInfomedMail"/>
        </div>
        <q-separator vertical inset />
        <div class="q-pa-md">
    <q-btn flat color="white" label="Usuario">
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Perfil</div>
            <q-list>
                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon flat color="green" name="account_circle" />
                    </q-item-section>
                    <q-item-section>Cambiar Avatar</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="green" name="password" />
                    </q-item-section>
                    <q-item-section>Cambiar Contraseña</q-item-section>
                  </q-item>
                </q-list>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

            <q-btn
              color="teal-10"
              label="Salir"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
      </q-toolbar>
    </q-header>

    <q-drawer
    class="bg-cyan-8 text-white"
    show-if-above v-model="leftDrawerOpen" side="left" bordered behavior="desktop" :width="230"
    elevated content-class="transparent-drawer">
      <div class="q-pa-md" style="max-width: 300px" v-close-overlay>
    <q-list>
      <q-item
        clickable
        v-ripple
        :active="link === 'home'"
        @click="link = 'home'"
        active-class="border text-green"
        to="/"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-home" size="33px"/>
        </q-item-section>
        <q-item-section>INICIO</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Dashboard'"
        @click="link = 'Dashboard'"
        active-class="border text-green-10"
        to="iniciops"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-tachometer-alt" size="33px"/>
        </q-item-section>
        <q-item-section>DASHBOARD</q-item-section>
      </q-item>
      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'Salud'"
        @click="link = 'Salud'"
        active-class="border text-green-10"
        to="saludps"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-brain" />
        </q-item-section>
        <q-item-section>EVALUACIONES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Familiar'"
        @click="link = 'Familiar'"
        active-class="border text-green-10"
        to="defectologiaps"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-hand-holding-heart" size="33px"/>
        </q-item-section>
        <q-item-section>DEFECTOLOGÍA</q-item-section>
      </q-item>
    </q-list>
  </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script setup>
import { ref } from 'vue'

const openInfomedMail = () => {
  window.open('https://webmail.sld.cu/', '_blank')
}

const notificaciones = ref([])
const enviarNotificaciones = () => {
  const nuevaNotificacion = {
        id: Math.random(), // Identificador único para la notificación
        mensaje: 'Nueva notificación',
      };
      // Agregar la notificación a la lista
      notificaciones.value.push(nuevaNotificacion);
    };
    const mostrarNotificaciones = () => {
      const listaNotificaciones = notificaciones.value.map(notificacion => `<li>${notificacion.mensaje}</li>`).join('');
      this.$q.notify({
        position: 'bottom-end',
        icon: 'notifications',
        message: '<ul>' +
          notificaciones.value.map(notificacion => `<li>${notificacion.mensaje}</li>`).join('') +
          '</ul>',
        html: true,
        timeout: 0, // Mantener la notificación abierta hasta que se cierre manualmente
      });
    };

</script>
