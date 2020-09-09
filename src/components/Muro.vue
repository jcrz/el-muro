<template>
  <div class="muro">
    <div class="header">
      <h2>Bienvenido, {{ user.displayName }}</h2>
      <b-button @click="logout" variant="outline-primary">Salir</b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Muro",
  data() {
    return {
      user: '',
    };
  },
  methods: {
    logout() {
      // Cierra la sesión para el usuario
      this.$store.dispatch("logout");
    },
  },
  created() { 
    // Captura los datos del usuario conectado
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = ''
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0px auto;
}
.logout {
  font-size: 20px;
}
</style>
