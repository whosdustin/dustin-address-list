<template lang="html">
  <div class="contact-card"
    @mouseover='showActions = true'
    @mouseleave='showActions = false'>

    <div class="body" v-if="!showEdit">
      <div class="media" :style="{backgroundColor: bgColor}">
        {{ initials }}
      </div>
      <div class="content">
        <h4 class="title">{{ fullName }}</h4>
        <p class="meta"><b>Email:</b> {{ contact.email }}</p>
      </div>

      <div class="actions" :class="{ show: showActions }">
        <button
          class="button -icon-center -fill-gray -small"
          @click="toggleForm"
          :title="editText">
          <span class="sr-only">{{ editText }}</span>
          <Icon :name="editText + '-2'" />
        </button>
        <button
          class="button -icon-center -fill-error -small"
          @click="removeContact"
          title="Delete">
          <Icon name="trash-2" />
        </button>
      </div>
    </div>

    <ContactForm v-else edit
      :contact="contact"
      @toggle="toggleForm" />

  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'
import randomColor from 'randomcolor'

export default {
  name: 'contact-item',
  props: ['contact'],
  components: {
    ContactForm
  },
  data() {
    return {
      showEdit: false,
      editText: 'edit',
      showActions: false,
      bgColor: randomColor({luminosity: 'light'})
    }
  },
  computed: {
    fullName() {
      return `${this.contact.fname} ${this.contact.lname}`
    },
    initials() {
      const name = [
        this.contact.fname,
        this.contact.lname
      ]

      let initials = ""
      name.forEach(str => {
        initials += str.charAt(0)
      })

      return initials.toUpperCase()
    }
  },
  methods: {
    toggleForm() {
      this.editText = this.showEdit ? 'edit' : 'save'
      this.showEdit = !this.showEdit
    },
    removeContact() {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="stylus" scoped>
.contact-card
  padding 20px
  margin-bottom 24px
  transition all 0.2s linear
  border-radius 6px
  box-shadow 0 6px 22px 0 rgba(0,0,0,0.15)
  background #f5f5f5
  cursor pointer

.media
  display flex
  align-items center
  justify-content center
  width 50px
  height 50px
  font-weight bold
  border-radius 25px
  background tomato
  color #000

.content
  flex-grow 1
  padding 0 10px

.title
.meta
  margin 0

.body
  display flex
  justify-content space-between
  align-items center

.actions
  display flex
  flex-flow column
  flex-basis 0
  opacity 0.4
  transition opacity 0.3s ease-in-out

  .button
    margin 3px 0

  &.show
    opacity 1

  @media (min-width: 600px)
    flex-flow row
</style>
