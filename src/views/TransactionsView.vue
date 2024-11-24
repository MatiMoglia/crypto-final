<template>
    <div class="body">
        <Navbar/>
        <div class="commerce">
            <div class="btnP">
                <h2>COMPRAR CRIPTOS</h2>
                <div class="form"> 
                    <FormPurchase />
                </div>
            </div>
            <div class="btnS">
                <h2>VENDER CRIPTOS</h2>
                <div class="fom">
                    <FormSale />
                </div>
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
