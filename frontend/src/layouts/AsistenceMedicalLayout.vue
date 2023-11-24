<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-teal-8 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img fit="fill" src="image/asistencia medica.png" >
          </q-avatar>
          Sistema de Salud para Adulto Mayor
        </q-toolbar-title>
        <q-separator vertical inset />
        <!--NOTE: Botón de Notificaciones-->
        <q-btn round dense flat color="white" icon="notifications">
          <q-badge color="red" text-color="white" floating transparent>
            {{ count }}
          </q-badge>
          <q-menu>
            <q-card flat class="my-card q-pa-none">
              <NotificationsWindows />
            </q-card>
            <q-card flat square class="row">
              <q-btn
                :disable="count === 0"
                class="text-secondary col"
                label="Limpiar"
                flat
                dense
                @click="CleanNotice()"
              />
            </q-card>
          </q-menu>
        </q-btn>

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
              <img src="image/login.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Usuario</div>

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
    class="bg-teal-6 text-white"
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
        to="inicioas"
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
        :active="link === 'Encuesta'"
        @click="link = 'Encuesta'"
        active-class="border text-green-10"
        to="enfermeria"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-folder" size="33px"/>
        </q-item-section>
        <q-item-section>DATOS GENERALES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Pacientes'"
        @click="link = 'Pacientes'"
        active-class="border text-green-10"
        to="controlas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-file" size="33px"/>
        </q-item-section>
        <q-item-section>CONTROL MEDICINA</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Indices'"
        @click="link = 'Indices'"
        active-class="border text-green-10"
        to="indiceas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-heartbeat" size="33px"/>
        </q-item-section>
        <q-item-section>ÍNDICES DE NORTON</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Evaluaciones'"
        @click="link = 'Evaluaciones'"
        active-class="border text-green-10"
        to="valueas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-stethoscope" size="33px"/>
        </q-item-section>
        <q-item-section>EVALUACIONES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Programa'"
        @click="link = 'Programa'"
        active-class="border text-green-10"
        to="mntas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-leaf" size="33px"/>
        </q-item-section>
        <q-item-section>PROGRAMA MNT</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="termometriaas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-thermometer" size="33px"/>
        </q-item-section>
        <q-item-section>TERMOMETRÍA</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="indicaciones"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-file" size="33px"/>
        </q-item-section>
        <q-item-section>INDICACIONES MÉDICAS</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="trasladoas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-ambulance" size="33px"/>
        </q-item-section>
        <q-item-section>TRASLADOS</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="vacunasas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-syringe" size="33px"/>
        </q-item-section>
        <q-item-section>VACUNAS</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="sindromeas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-dna" size="33px"/>
        </q-item-section>
        <q-item-section>SÍNDROMES</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Termometria'"
        @click="link = 'Termometria'"
        active-class="border text-green-10"
        to="solicitudas"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-box" size="33px"/>
        </q-item-section>
        <q-item-section>PEDIDOS DE MEDICAMENTOS</q-item-section>
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
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/Administrator/Auth-Store";
import { useNoticeStore } from "src/stores/Administrator/Notice-Store";
import NotificationsWindows from "src/components/Administrator/NotificationsWindows.vue";

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

const { submitlogout } = useAuthStore();
const { me, tempUser } = storeToRefs(useAuthStore());

const { listNotice, CleanNotice } = useNoticeStore();
const { count } = storeToRefs(useNoticeStore());

</script>
