<template lang="html">
<div>

  <div v-if="isEditable">
    <div class='-errors' v-if="errors.length">
      <h4>Please fill out required fields.</h4>
      <ul>
        <li
          v-for="(error, index) in errors"
          :key="index">{{ error }}</li>
      </ul>
    </div>
    <form class="form"
          @keyup.enter="toggleEdit">

      <BaseInput
          type="text"
          class="w-50"
          v-model="editContact.fname"
          placeholder="First Name"
          label="First Name"
          required />

        <BaseInput
          type="text"
          class="w-50"
          v-model="editContact.lname"
          label="Last Name"
          placeholder="Last Name" />

      <BaseInput
        type="email"
        class="w-100"
        v-model="editContact.email"
        placeholder="Email"
        label="Email"
        required />
    </form>
  </div>

  <div v-else>
    <div class='-errors' v-if="errors.length">
      <h4>Please fill out required fields.</h4>
      <ul>
        <li
          v-for="(error, index) in errors"
          :key="index">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent>
      <BaseInput
        type="text"
        class="w-50"
        v-model="newContact.fname"
        placeholder="First Name"
        label="First Name*"
        required />

      <BaseInput
        type="text"
        class="w-50"
        v-model="newContact.lname"
        label="Last Name"
        placeholder="Last Name" />

      <BaseInput
        type="email"
        class="w-100"
        v-model="newContact.email"
        placeholder="Email"
        label="Email*"
        required />

      <button
        class="button -fill-success text-center"
        @click="sendNewContact">Add Contact</button>
    </form>
  </div>
</div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
export default {
  name: 'contact-form',
  props: ['edit', 'contact'],
  components: {
    BaseInput
  },
  data() {
    return {
      newContact: this.createContact(),
      editContact: this.contact,
      isEditable: false,
      errors: false
    }
  },
  mounted() {
    if (this.edit == undefined) return
    this.isEditable = true
  },
  methods: {
    sendNewContact() {
      if (this.validateContact()) {
        // Submit new contact
        this.$emit('new-contact', this.newContact)

        // Reset Form when submited
        this.newContact = this.createContact()
      }
    },
    createContact() {
      return {
        id: Date.now(),
        fname: '',
        lname: '',
        email: ''
      }
    },
    toggleEdit() {
      if (this.validateContact()) {
        this.$emit('toggle')
      }
    },
    validateContact() {
      if (this.newContact.fname && this.newContact.email) {
        this.errors = false
        return true
      }

      this.errors = [];

      if (!this.newContact.fname) {
        this.errors.push('First Name required.');
      }
      if (!this.newContact.email) {
        this.errors.push('Email required.');
      }
    }
  }
}
</script>

<style lang="stylus">
.form
  display flex
  justify-content space-between
  flex-wrap wrap
.w-50
  width 48%
.w-100
  width: 100%
.button
  margin 10px auto
</style>
