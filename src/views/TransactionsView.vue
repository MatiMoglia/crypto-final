<template>
   <Navbar />
   <div class="trade">
        <br><br><br>
        <img class="logo" src="@/assets/logo.png" alt="Crypto Trade M&M Logo" />
        <h1>CRYPTO-TRADE M&M</h1>
      <div class="conteiners">
            <div class="form">
                <FormPurchase />
            </div>
            <div class="form">
                <FormSale />
            </div>
      </div>
   </div>
</template>

<script>
    import FormPurchase from "@/components/PurchaseForm.vue";
    import FormSale from "@/components/SaleForm.vue";
    import Navbar from "@/components/NavBar.vue";

    export default {
        name: "Transactions",
        components: { FormPurchase, FormSale, Navbar },
        data() {
            return {};
        },
    };
</script>
<style scoped>
body {
  margin: 0;
}
.trade {
    background: rgba(44, 42, 42, 0.8); 
}
.conteiners {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  width: 100%;
}
.logo {
  width: 150px; 
  height: 150px;
  border-radius: 50%; 
  object-fit: cover;
  border: 2px solid #d4af37; 
}

h1 {
  font-size: 2.5rem;
  color: #f4d03f;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #f4d03f;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
