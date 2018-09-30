<template lang="html">
  <div class="field">
    <label :for="label" v-if="label">{{ label }}</label>
      <input
        :id="label"
        :value="value"
        v-bind="$attrs"
        @input="updateValue"
      />
  </div>
</template>

<script>
export default {
  name: 'base-input',
  props: {
    value: {
      required: true
    },
    label: String
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },
  watch: {
    error(newValue, oldValue) {
      if (newValue && !oldValue && !this.errorDisplayed) {
        this.errorDisplayed = true
      }
    }
  },
  inheritAttrs: false
}
</script>

<style lang="stylus" scoped>
.field
  margin-bottom 10px
</style>
