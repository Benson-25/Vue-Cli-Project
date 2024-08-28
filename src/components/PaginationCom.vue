<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="item in pages.total_pages"
        :key="item + 'page'"
        class="page-item"
        :class="{ active: item === pages.current_page }"
      >
        <span class="page-link text-white" v-if="item === pages.current_page">{{ item }}</span>
        <a class="page-link text-standard" href="#" v-else @click.prevent="emitPages(item)">{{
          item
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default: () => ({
        has_pre: false,
        has_next: false,
        current_page: 1,
        total_pages: []
      })
    }
  },
  methods: {
    emitPages (item) {
      if (this.pages) {
        this.$emit('emit-pages', item)
      }
    }
  }
}
</script>
