<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <Navbar />
        <Nuxt />
      </div>
    </div>
    <Footer />
    <Messages />
  </div>
</template>

<script>
  export default {
    components: {
      Navbar: () => import('~/components/Navbar.vue'),
      Footer: () => import('~/components/Footer.vue'),
      Messages: () => import('~/components/Messages.vue')
    }
  }
</script>

<style>
  :root {
    --background: #2a2a2a;
    --success: #2ecc71;
    --warning: #e74c3c;
    --margin: 1.875rem;
    --radius: 4px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    background: #2a2a2a;
  }

  img {
    display: block;
  }

  input, button {
    font-family: 'Montserrat', sans-serif;
    outline: none;
  }

  input[type="radio"], input[type="checkbox"] {
    display: none;
  }

  .radio, .checkbox {
    display: inline-block;
    flex-shrink: 0;
    margin-right: .3em;
    width: 1em;
    height: 1em;
    border: 1px solid #3498db;
    box-sizing: border-box;
    font-size: 1.1rem;
    transition: .3s;
  }

  .radio {
    border-radius: 50%;
  }

  .checkbox {
    border-radius: 20%;
  }

  .radio:hover,
  input[type="radio"]:checked + .radio {
    border-width: .3em;
    cursor: pointer;
  }

  .checkbox:hover,
  input[type="checkbox"]:checked + .checkbox {
    border-width: .5em;
    cursor: pointer;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #2a2a2a;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
  }

  .container {
    align-self: center;
    width: 100%;
    max-width: 75rem;
  }

  .content {
    margin: 0 var(--margin);
  }

  @media (max-width: 480px) {
    .content {
      margin: 0 .625rem;
    }
  }

  .content__block {
    padding: var(--margin);
    border-radius: .25rem;
    background: #fff;
    color: #000;
  }

  .content__block.mb {
    margin-bottom: 1.875rem;
  }


  /* scrollbar */

  body::-webkit-scrollbar {
    width: .75rem;
    height: .75rem;
  }

  body::-webkit-scrollbar-thumb:vertical {
    background: linear-gradient(to bottom, #fff, #333);
  }

  body::-webkit-scrollbar-thumb:horizontal {
    background: linear-gradient(to right, #fff, #333);
  }

  body::-webkit-scrollbar-corner {
    background: #333;
  }
</style>