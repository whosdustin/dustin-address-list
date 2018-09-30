<template>
  <div id="app">

    <h1>Add New Contact</h1>
    <ContactForm @new-contact="addContact" />

    <h1>Contact List</h1>

    <div
      v-if="!contacts.length"
      class='text-center -empty'>
      There are no contacts
    </div>

    <Contact
      v-for="contact in contacts"
      :contact="contact"
      :key="contact.id"
      @remove="removeContact(contact.id)" />

  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'
import Contact from '@/components/Contact.vue'

export default {
  name: 'app',
  components: {
    ContactForm,
    Contact
  },
  data() {
    return {
      contacts: []
    }
  },
  mounted() {
    if (localStorage.getItem(this.$http)) {
      this.contacts = JSON.parse(localStorage.getItem(this.$http))
    }
  },
  watch: {
    contacts: {
      handler() {
        localStorage.setItem(this.$http, JSON.stringify(this.contacts))
      },
      deep: true
    }
  },
  methods: {
    addContact(newContact) {
      //Add new contact to contacts array
      this.contacts.push(newContact)
    },
    getContact(contactId) {
      // Find conact object by Id
      const index = this.contacts.findIndex((obj => obj.id == contactId))
      return index
    },
    removeContact(contactId) {
      // Remove contact object in contacts array
      this.contacts.splice(this.getContact(contactId), 1)
    }
  }
}
</script>
