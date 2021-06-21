<template>
  <v-alert
      dense
      color="red"
      type="error"
  > {{ error && error.message }}
  </v-alert>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>
