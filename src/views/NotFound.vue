<template>
  <div class="error bg-dark text-white fw-bold d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="text-center">
      <h1>
        4<span class="ms-2 material-icons"> smart_toy </span>4
      </h1>
      <p>哎呀！出錯了！請先回到首頁並稍後再試！</p>
      <RouterLink to="/">
        <button class="btn text-dark bg-white fw-bold px-3 mt-4" type="button">
          回到首頁
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  height: 100vh;
  h1 {
    font-size: 200px;
  }
  .material-icons{
    font-size: 150px;
  }
}
</style>
