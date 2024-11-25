<template>
  <div class="login">
    <div class="cyber-bg"></div>
    <div class="wrapper" data-aos="fade-up">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </div>
      <div class="text-center mt-4 name">
        Billetera de Cryptomonedas
      </div>
      <form class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
          <i class="fas fa-user-circle"></i>
          <input 
            type="text" 
            name="idUsuario" 
            v-model="idUser" 
            id="idUsuario" 
            placeholder="Ingrese su ID"
          />
        </div>
        <button class="btn btn-login mt-4" @click.prevent="enter">LOGIN</button>
      </form>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import { toast } from "vue3-toastify"; 
import "aos/dist/aos.css";

export default {
  name: "Login",
  data() {
    return {
      idUser: "",
    };
  },
  methods: {
    enter() {
      if (this.idUser.trim() === "") {
        toast.error("Error: ¡El campo no debe estar vacío!");
      } else if (this.idUser.length > 10) {
        toast.error("Error: ¡El ID de usuario no debe contener más de 10 caracteres!");
      } else {
        toast.success("Inicio de sesión exitoso");
        this.$store.commit("newUser", this.idUser);
        this.$store.commit("insertTransaction");
        setTimeout(() => {
          this.$router.push("/transactions");
        }, 3000); 
      }
    }
  },
  mounted() {
    AOS.init(); 
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  background: none; 
}

.cyber-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.wrapper {
  max-width: 400px;
  width: 90%; 
  padding: 30px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #d4af37;
  border-radius: 15px;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 150px; 
  height: 150px;
  border-radius: 50%; 
  object-fit: cover;
  border: 2px solid #d4af37; 
}

.name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #d4af37;
  text-transform: uppercase;
}

.form-field {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #d4af37; 
  padding: 12px;
  border-radius: 8px;
}

.form-field input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1rem;
  padding-left: 10px;
}

.btn-login {
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background: #d4af37; 
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: #b89030; 
}

i {
  font-size: 1.2rem;
  color: #d4af37; 
  margin-right: 10px;
}
</style>
