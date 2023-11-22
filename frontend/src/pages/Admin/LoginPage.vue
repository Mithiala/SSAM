<template>
  <div class="login-page">
    <q-card class="login-card" flat>
      <q-card-section class="login-card-section">
        <q-card-section>
          <q-avatar size="80px" class="shadow-10">
            <img src="src/assets/online.png" />
          </q-avatar>
        </q-card-section>
        <q-form>
          <div class="text-h5 text-center q-pa-md">
            Bienvenido a Plataform Online
          </div>
          <div style="display: flex; flex-direction: row">
            <q-input
              v-model="loginForm.username"
              icon="email"
              type="email"
              label="Usuario"
              dense
              outlined
              class="input"
            />
            <q-input
              v-model="loginForm.password"
              :type="isPwd ? 'text' : 'password'"
              label="Contraseña"
              dense
              outlined
              class="input"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'No deje en blanco la contraseña',
              ]"
              @keypress.enter.prevent="submitLogin()"
            />
          </div>
          <q-checkbox
            v-model="rememberMe"
            label="Recordarme"
            dense
            color="deep-purple-10"
            class="remember-me"
          />
          <q-btn
            type="submit"
            color="deep-purple-10"
            label="Iniciar sesión"
            @click="submitLogin()"
          />
        </q-form>
        <div class="links-section">
          <q-btn
            @click="forgotPassword"
            label="¿Olvidaste tu contraseña?"
            flat
            text-color="deep-purple-10"
          />
          <div class="register-link">
            ¿No tienes cuenta?
            <q-btn
              label="Regístrate aquí"
              color="deep-purple-10"
              dense
              to="register"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/Administrator/Auth-Store";

const { submitLogin } = useAuthStore();
const { loginForm } = storeToRefs(useAuthStore());

let isPwd = ref(false);
const rememberMe = ref(false);
</script>

<style scoped lang="scss">
.text-h3 {
  font-size: 50px;
  font-weight: bold;
  color: rgb(8, 6, 6);
}

.bg-red {
  background-color: red;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #471607, #9d0be6);
}

.login-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: auto;
  max-height: 460px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}

.login-card-section {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}
.login-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #4b0bb3;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.input {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 1rem;
  font-size: 16px;
  background-color: #ffffff;
  color: #333;
  transition: border-color 0.3s ease-in-out;
}
.input:focus {
  border-color: #07090a;
}
.remember-me {
  margin-top: 1rem;
}

button[type="submit"] {
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  background-color: #1976d2;
  color: #fff;
  border-radius: 4px;
  border: none;
  transition: transform 0.3s ease-in-out;
  button[type="submit"]:active {
    transform: rotate(360deg);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
}

.links-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.register-link {
  margin-top: 2rem;
  text-align: center;

  q-btn {
    margin-left: 0.5rem;
    background-color: #fff;
    color: #1976d2;
    border: 2px solid #1976d2;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
