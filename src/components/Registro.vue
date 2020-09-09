<template>
  <div class="form-registro">
    <h3>Registrate, es Gratis</h3>
    <b-form action="" @submit.prevent="register">

      <b-form-group label="Nombre:">
        <b-form-input v-model="name" type="text" placeholder="e.g Pedro" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Email:">
        <b-form-input v-model="email" type="email" placeholder="e.g user@correo.com" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Password:">
        <b-form-input v-model="password" type="password" placeholder="***" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Password (Confirm):">
        <b-form-input v-model="password_confirm" type="password" placeholder="***" required>
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Registro',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    register() {
      //verificamos las password
      if (this.password != '' && this.password_confirm != '') {
        if (this.password === this.password_confirm) {
          const datos = {
            email: this.email,
            password: this.password,
            name: this.name
          };
          // llamaremos al Action para registrar al nuevo usuario
          this.$store.dispatch('register', datos)

        }
      }
      
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-registro {
  width: 400px;
  padding: 20px;
  border-radius: 22px;
  background-color: #e7e7e7;
}
</style>
