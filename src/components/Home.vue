<template>
  <div>
    <!-- Mensajes de Alerta por errores-->
    <div class="alertas" v-if="error">
      <b-alert show variant="danger">{{ error }}</b-alert>
    </div>

    <div class="home">
      <Registro />
      <Login />
    </div>
  </div>
</template>

<script>
import Registro from "./Registro";
import Login from "./Login";

export default {
  name: "Home",
  components: {
    Registro,
    Login,
  },
  computed: {
    error() {
      // Mensajes de error capturados en el Store
      return this.$store.state.error;
    },
  },
};
</script>

<style scoped>
.alertas {
  width: 1100px;
  margin: 0px auto;
}
.home {
  display: flex;
  justify-content: space-around;
}
</style>
