<template lang="html">
  <div class='contact-card'
    @mouseover='showActions = true'
    @mouseleave='showActions = false'>

    <template v-if="!showEdit">
      <h2 class="title">{{ fullName }}</h2>
      <p><b>Email:</b> {{ contact.email }}</p>
    </template>

    <ContactForm v-else edit
      :contact='contact'
      @toggle='toggleForm' />

    <div class="actions" :class="{ show: showActions }">
      <button class="button -fill-error -small" @click="removeContact">Delete</button>
      <button class="button -fill-gray -small" @click="toggleForm">{{ editText }}</button>
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'contact-item',
  props: ['contact'],
  components: {
    ContactForm
  },
  data() {
    return {
      showEdit: false,
      editText: 'Edit',
      showActions: false
    }
  },
  computed: {
    fullName() {
      return `${this.contact.fname} ${this.contact.lname}`
    }
  },
  methods: {
    toggleForm() {
      this.editText = this.showEdit ? 'Edit' : 'Save'
      this.showEdit = !this.showEdit
    },
    removeContact() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="stylus">
.contact-card
  padding 20px
  margin-bottom 24px
  transition all 0.2s linear
  border-radius 6px
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19)
  cursor: pointer

.contact-card > .title
  margin 0

.contact-card > p:first-of-type
  margin-top 0

.actions
  opacity 0.4
  transition opacity 0.3s ease-in-out

  &.show
    opacity 1
</style>
