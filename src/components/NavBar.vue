<template>
    <div class="navigation">
      <ul>
        <li>
          <a href="#">
            <span class="title"> {{ $store.state.idUser }}</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="title"><router-link to="/transactions">Compra-Venta</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="title"><router-link to="/history">Historial</router-link></span>
          </a>
        </li>
        
        <li>
          <a href="#">
            <span class="title"><router-link to="/status">Estado Actual</router-link></span>
          </a>
        </li>
        <!--
        <li>
          <a href="#">
            <span class="title"><router-link to="/analysis">Inversiones</router-link></span>
          </a>
        </li>-->
        <li>
          <a href="#">
            <span class="title" v-on:click="quit()">SALIR</span>
          </a>
        </li>
      </ul>
      <div class="toggle"></div>
    </div>
  </template>
  <script>
    export default  {
      data() {
        return {
  
        };
      },
      methods:{
        quit(){
          this.$router.push("/");
        }
      },
      mounted(){
        let navigation = document.querySelector('.navigation');
        let toggle = document.querySelector('.toggle');
        toggle.onclick = function(){
            navigation.classList.toggle('active')
        }
      },
    }
  </script>