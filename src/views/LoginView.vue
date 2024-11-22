<template>
    <div class="login">
     <div class="wrapper">
        <div class="text-center mt-4 name">
            Billetera de Cryptomonedas
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="idUsuario" v-model="idUser" id="idUsuario" placeholder="ID">
            </div>
            <button class="btn mt-3" @click="enter">LOGIN</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Login',
    data() {
      return {
        idUser: "",
      };
    },
    methods: {
      enter() {
        if (this.idUser.trim() === "") {
          this.$toast.error("Error! el campo no debe estar vacío");
        } else {
          if (this.idUser.length > 10) {
            this.$toast.error(
              "Error! El ID de usuario no debe contener más de 10 caracteres"
            );
          } else {
            this.$store.commit("modificarIdUsuario", this.idUser);
            this.$store.commit("cargarTransacciones");
            this.$router.push("/Home");
          }
        }
      }
    }
  };
  </script>