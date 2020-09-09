<template>
  <div class="form-login">
    <h3>Login</h3>
    <b-form action="" @submit.prevent="login">

      <b-form-group label="Email:">
        <b-form-input v-model="email" type="email" placeholder="user@correo.com" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Password:">
        <b-form-input v-model="password" type="password" placeholder="***" required>
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">Log in</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.password != '') {
        const datos = {
            email: this.email,
            password: this.password,
        }
        // llamaremos al Actions 
        this.$store.dispatch('login', datos)
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-login {
  width: 400px;
  padding: 20px;
  border-radius: 22px;
  border:1px solid #e7e7e7;
}
</style>
