<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Detalles de la Transacción:</h3>
          <i class="fas fa-times close-icon" @click="close"></i>
        </div>
        <div class="modal-body">
          <p>
            <i class="fas fa-coins icon"></i>
            <strong>Criptomoneda:</strong>&nbsp;
            <span :style="cryptoTextColor(transaction.crypto_code)">
              {{ transaction.crypto_code.toUpperCase() }}
            </span>
          </p>
          <p>
            <i class="fas fa-layer-group icon"></i>
            <strong>Cantidad:</strong>&nbsp;{{ transaction.crypto_amount }}
          </p>
          <p>
            <i class="fas fa-dollar-sign icon"></i>
            <strong>Precio (ARG):</strong>&nbsp;${{ transaction.money }}
          </p>
          <p>
            <i class="fas fa-exchange-alt icon"></i>
            <strong>Operación:</strong>&nbsp;
            <span :class="actionColorClass(transaction.action)">
              {{ typeAction(transaction.action) }}
            </span>
          </p>
          <p>
            <i class="fas fa-calendar-alt icon"></i>
            <strong>Fecha:</strong>&nbsp;{{ time(transaction.datetime) }}
          </p>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  name: "TransactionDetailsModal",
  props: {
    transaction: Object,
    isVisible: Boolean,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    cryptoTextColor(crypto_code) {
      const cryptoColors = {
        btc: "color: gold;",
        eth: "color: #8c8c8c;",
        usdt: "color: #33ff74;",
        usdc: "color: #2281e7;",
        dai: "color: #f517f8;",
      };
      return cryptoColors[crypto_code] || "color: white;";
    },
    typeAction(action) {
      if (action === "purchase") {
        return "Compra";
      }
      if (action === "sale") {
        return "Venta";
      }
      return "Desconocido";
    },
    actionColorClass(action) {
      if (action === "purchase") {
        return "text-green";
      }
      if (action === "sale") {
        return "text-red";
      }
      return "text-default";
    },
    time(datetime) {
        return datetime.slice(0, 10) + " " + datetime.slice(11, 16) + " Hs";
    },
  },
};
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 42, 42, 0.8); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
  .modal-content {
    background-color: #1e1e1e;
    color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    border: 2px solid #d4af37; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 60%;
    position: relative;
    text-align: left !important;
}
  
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #f0d78c;
    padding-bottom: 10px;
}
  
.modal-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #d4af37;
}
  
.modal-body p {
    margin: 10px 0;
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    align-items: center;
}
  
.close-icon {
    font-size: 1.5rem;
    cursor: pointer;
    color: #d43737;
    transition: color 0.3s ease;
}
  
.close-icon:hover {
    color: #e65f5f; 
}
.icon {
  font-size: 1.2rem;
  margin-right: 10px;
  color: #d6ba3a;
}
.text-green {
  color: #33ff74;
}

.text-red {
  color: #ff4d4d;
}

.text-default {
  color: white;
}
  </style>
  