<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col-md-9 col-xl-7">
        <div class="card-body rounded-3 shadow p-5 text-center lh-lg">
          <span class="material-icons-outlined text-primary shopping_bag"> shopping_bag </span>
          <h1 class="fs-3 fw-bold">訂單已成立</h1>
          <p class="mt-3 mb-4">
            我們收到你的訂單囉！感謝訂購！<br />
            自取的會員，我們將通知你取貨，請務必留意來電<br />
            宅配的會員，商品將於3~5個工作天寄出，請多留意物流！<br />
            再次感謝你的支持與喜愛！
          </p>

          <RouterLink to="/products" class="bg-primary text-white py-2 px-5 rounded-3"
            >繼續購物</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  margin-top: 50px;
  margin-bottom: 100px;
  .shopping_bag {
    font-size: 48px;
  }
}
</style>
