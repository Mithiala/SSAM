<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-blue-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img fit="fill" src="src/assets/ssam.jpg" >
          </q-avatar>
          Adminstrador del Sistema de Salud para Adulto Mayor
        </q-toolbar-title>
        <div>
          <q-btn
          dense
            stretch
            unelevated
            padding="5px"
          icon="mail"
          @click="openInfomedMail"/>
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
              <img src="image/login.jpg">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Admin</div>

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
    class="bg-blue-9 text-white"
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    bordered behavior="desktop" :width="100"
    elevated>
      <div class="q-pa-md">
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
          <q-icon name="home" size="44px" />
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Dashboard'"
        @click="link = 'Dashboard'"
        active-class="border text-green-10"
        to="dashboard"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-tachometer-alt" size="44px" />
        </q-item-section>
      </q-item>
      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'Usuario'"
        @click="link = 'Usuario'"
        active-class="border text-green-10"
        to="users"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="manage_accounts" size="44px" />
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'Backup'"
        @click="link = 'Backup'"
        active-class="border text-green-10"
        to="salva"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="las la-brain" size="44px"/>
        </q-item-section>
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

</script>
