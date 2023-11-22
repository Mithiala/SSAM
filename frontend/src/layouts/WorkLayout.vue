<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-green-10 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img fit="fill" src="src/assets/trabajo social.png" >
          </q-avatar>
          Sistema de Salud para Adulto Mayor
        </q-toolbar-title>
        <q-separator vertical inset />

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
    class="bg-green-9 text-white"
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
        to="iniciots"
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
        :active="link === 'Pacientes'"
        @click="link = 'Pacientes'"
        active-class="border text-green-10"
        to="datospacientes"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-list" size="33px"/>
        </q-item-section>
        <q-item-section>DATOS PACIENTES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Encuesta'"
        @click="link = 'Encuesta'"
        active-class="border text-green-10"
        to="encuestats"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-file-alt" size="33px"/>
        </q-item-section>
        <q-item-section>ENCUESTA INICIAL</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Familiar'"
        @click="link = 'Familiar'"
        active-class="border text-green-10"
        to="familiarests"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-users" size="33px"/>
        </q-item-section>
        <q-item-section>COMPOSICIÓN FAMILIAR</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Pases'"
        @click="link = 'Pases'"
        active-class="border text-green-10"
        to="pasests"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-id-card" size="33px"/>
        </q-item-section>
        <q-item-section>CONTROL DE PASES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Diario'"
        @click="link = 'Diario'"
        active-class="border text-green-10"
        to="trabajodiariots"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-hands-helping" size="33px"/>
        </q-item-section>
        <q-item-section>TRABAJO DIARIO</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Discapacidad'"
        @click="link = 'Discapacidad'"
        active-class="border text-green-10"
        to="discapacidad"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-blind" size="33px"/>
        </q-item-section>
        <q-item-section>DISCAPACIDAD</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Ayuda'"
        @click="link = 'Ayuda'"
        active-class="border text-green-10"
        to="estadistica"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-wheelchair" size="33px"/>
        </q-item-section>
        <q-item-section>AYUDAS TÉCNICAS</q-item-section>
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
<style lang="sass">

</style>
