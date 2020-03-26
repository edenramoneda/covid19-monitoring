<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    watch: {
      '$route':{
        handler: (to, from) => {
          document.title = to.meta.title || 'Your Website'
        },
         immediate: true
      }
    },
}
</script>
