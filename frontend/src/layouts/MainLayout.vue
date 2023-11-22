<template>
  <q-layout view="hHr lpR lFf">
    <q-header elevated class="bg-teal-9 text-white">
      <q-toolbar rounded class="bg-teal-10 text-white">
        <q-toolbar-title>
          <q-avatar>
            <img fit="fill" src="src/assets/ssam.jpg" />
          </q-avatar>
          Sistema de Salud para Adulto Mayor en Hogares de Ancianos
        </q-toolbar-title>

        <div>
          <q-btn
            dense
            stretch
            unelevated
            padding="5px"
            icon="mail"
            @click="openInfomedMail"
          />
        </div>
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
                    <q-img :src="me.avatar" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ me.username }}
                  </div>

                  <q-btn
                    color="teal-10"
                    label="Salir"
                    push
                    size="sm"
                    @click="submitlogout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <div class="q-pa-md">
        <div class="q-gutter-md row">
          <q-btn class="q-mr-sm" color="green-5" label="Módulos">
            <q-menu transition-show="rotate" transition-hide="rotate">
              <q-list style="min-width: 100px">
                <div class="flex flex-center column"></div>
                <q-item
                  clickable
                  v-ripple
                  to="trabajosocial/iniciots"
                  active-class="my-menu-link"
                  exact
                >
                  <q-avatar>
                    <q-img src="src/assets/trabajo social.png" />
                  </q-avatar>
                  <q-item-section> Trabajo Social </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  to="psicologia/iniciops"
                  active-class="my-menu-link"
                  exact
                >
                  <q-avatar>
                    <q-img src="src/assets/psicologia.png" />
                  </q-avatar>
                  <q-item-section> Psicología </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  to="asistenciamedica/inicioas"
                  active-class="my-menu-link"
                  exact
                >
                  <q-avatar>
                    <q-img src="src/assets/asistencia medica.png" />
                  </q-avatar>
                  <q-item-section> Asistencia Médica </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  to="farmacia/iniciofr"
                  active-class="my-menu-link"
                  exact
                >
                  <q-avatar>
                    <q-img src="src/assets/farmacia.png" />
                  </q-avatar>
                  <q-item-section> Farmacia </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/Administrator/Auth-Store";

const { submitlogout } = useAuthStore();
const { me } = storeToRefs(useAuthStore());

const openInfomedMail = () => {
  window.open("https://webmail.sld.cu/", "_blank");
};
</script>
