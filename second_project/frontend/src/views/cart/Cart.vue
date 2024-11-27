<template>
  <div class="cart-container">
    <div class="cart-float">
      <h4 class="cart-header">Корзина</h4>
      <ol class="cart-list">
        <li v-for="(items, productId) in groupedCartItems" :key="productId" class="cart-item-wrapper">
          <div class="cart-item">
            <div class="item-details">
              <strong>{{ items[0].product.name }}</strong> &mdash;
              {{ items[0].product.price }} руб. &mdash; {{ items[0].count }} шт.
              <span
                class="close-icon"
                @click="handleRemoveFromCart(items[0].product.id)"
                >×</span
              >
            </div>
          </div>
        </li>
      </ol>
      <div class="total-amount">Общая сумма: {{ totalAmount }} руб.</div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.cart-float {
  background-color: #ffffff; 
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px; 
  width: 300px;
}

.cart-header {
  text-align: center; 
  color: #333; 
  margin-bottom: 20px; 
}

.cart-list {
  list-style-type: none;
  padding: 0; 
}

.cart-item-wrapper {
  margin-bottom: 10px; 
}

.cart-item {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 10px; 
  background-color: #f8f9fa; 
  border-radius: 5px; 
  transition: background-color 0.3s ease; 
}

.cart-item:hover {
  background-color: #e2e6ea;
}

.item-details {
  flex-grow: 1; 
}

.close-icon {
  cursor: pointer; 
  color: #dc3545; 
  font-weight: bold; 
  margin-left: 10px; 
}

.total-amount {
  font-weight: bold; 
  margin-top: 20px; 
  text-align: center; 
}
</style>


<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userId = computed(() => store.state.auth.user.id);

const cartItems = computed(() => store.state.cart.cartItems);

const groupedCartItems = computed(() => {
  return cartItems.value.reduce((acc, cartItem) => {
    const { product } = cartItem;

    if (!acc[product.id]) {
      acc[product.id] = [];
    }
    acc[product.id].push(cartItem);
    return acc;
  }, {});
});

const totalAmount = computed(() => {
  return cartItems.value.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.count,
    0
  );
});

const handleRemoveFromCart = (productId) => {
  store.dispatch("removeFromCart", {
    productId: productId,
    userId: userId.value,
  });
};

// Загрузка корзины при монтировании компонента
onMounted(() => {
  store.dispatch("getCart", userId.value);
});
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 100px;
  right: 20px;
  transform: translateY(-50%);
}

.cart-float {
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.close-icon {
  cursor: pointer;
  font-size: 20px;
  color: red;
}
</style>
