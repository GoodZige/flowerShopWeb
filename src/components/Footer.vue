<template>
  <div class="footer">
      <span>Flower Shop</span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer{
        width: 100%;
        height: 60px;
        background: rgba(84, 92, 100, 1);
    }
    .footer span{
        font-family: "RBNo2";
        color: #ffd04b;
        font-size: 2rem;
        line-height: 60px;
    }
</style>
