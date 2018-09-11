<template functional>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Permissions',
    props: {
      tokenSet: {
        type: Array,
        required: true
      },
    },
    methods: {
      update(newTokenSet) {
        const options = this.$root.$options;
        options.permissions.updateTokenSet(newTokenSet);
      }
    },
    created() {
      this.update(this.tokenSet);
    },
    watch: {
      tokenSet(newTokenSet) {
        this.update(newTokenSet);
      }
    }
  }
</script>