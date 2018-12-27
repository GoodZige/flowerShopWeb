<template>
  <div class="hello">
    <el-dialog title="商品详情" :visible.sync="detailsVisible" width="50%" :before-close="handleLoginClose">
      <img src="../assets/flower1.png" alt="" class="d_pic">
      <div class="d_content clearfix">
        <h2>南国相思</h2>
        <p>鲜花简介：<span>只想和你忘掉一切烦恼，尽情沉醉在最浪漫的气氛中。只想和你忘掉一切烦恼，尽情沉醉在最浪漫的气氛中。</span></p>
        <p>价格：<span>￥777</span></p>
        <p>数量：<el-input-number size="small" v-model="num" :min="1"></el-input-number></p>
        <el-button type="primary" icon="el-icon-goods">加入购物车</el-button>
      </div>
    </el-dialog>
    <h1>{{ msg }}</h1>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in hot_items" :key="item.id" :style="item.style">
        <h3>{{ item.name }}</h3>
        <a href="##" @click="detailsVisible = true">详情页》》</a>
      </el-carousel-item>
    </el-carousel>
    <div class="hot">
      <div class="hotHeader">
        热销鲜花
      </div>
      <el-row>
        <el-col :span="6" v-for="(o, index) in 4" :key="o">
          <el-card :body-style="{ padding: '4px' }" shadow="always">
            <img src="../assets/bg.jpg" class="image">
            <div style="padding: 14px;">
              <span>南国相思</span>
              <div class="bottom clearfix">
                <span class="price">￥777</span>
                <el-button type="text" class="button" @click="detailsVisible = true">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" v-for="(o, index) in 4" :key="o">
          <el-card :body-style="{ padding: '4px' }">
            <img src="../assets/bg.jpg" class="image">
            <div style="padding: 14px;">
              <span>携手一生</span>
              <div class="bottom clearfix">
                <span class="price">￥666</span>
                <el-button type="text" class="button" @click="detailsVisible = true">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination layout="prev, pager, next" :page-size="8" :total="21" @current-change="handleCurrentChange" :current-page.sync="currentPage">
        </el-pagination>
      </div>
    </div>
    <div class="contact">
      <h1>联系我们</h1>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Contact us</span>
        </div>
        <div class="text item">
          地址：浙江水利水电学院生活区15号楼614
        </div>
        <div class="text item">
          电话：13456017539
        </div>
        <div class="text item">
          联系人：郑滋觉、谢忠毅
        </div>
        <div class="text item">
          Email：13152144906@qq.com
        </div>
        <div class="text item">
          QQ：1315214906
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '特别推荐',
      hot_items: [{
        id: 1,
        name: '',
        cover: '../assets/bg.jpg',
        style: {
          background: 'url(' + require('../assets/bg.jpg') + ')'
        }
      },
      {
        id: 2,
        name: '',
        cover: '../assets/bg.jpg',
        style: {
          background: 'url(' + require('../assets/bg.jpg') + ')'
        }
      },
      {
        id: 3,
        name: '',
        cover: '../assets/bg.jpg',
        style: {
          background: 'url(' + require('../assets/bg.jpg') + ')'
        }
      }
      ],
      detailsVisible: false,
      num: 1,
      currentPage: 1
    }
  },
  methods: {
    getDetails (e) {
      console.log(e.target, 111)
      return false
    },
    handleLoginClose (done) {
      done()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item a {
    font-size: 20px;
    color: #ffd04b;
    text-decoration: none;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-row {
    padding: 20px;
  }

  .el-col {}

  .hot {
    border-top: 1px solid #ffd04b;
    box-shadow: darkgrey 10px 10px 30px 5px;
  }

  .hotHeader {
    height: 66px;
    font-size: 2rem;
    line-height: 66px;
  }

  .contact{
    height: 400px;
    background: url('../assets/flower1.png') no-repeat 500px 150px;
    /* background-position-y: center; */
  }
  .box-card {
    float: right;
    margin-right: 180px;
    width: 480px;
  }
  .item {
    margin-bottom: 18px;
    text-align: left;
  }
  .price{
    float: left;
    font-weight: 600;
    color: #C00;
  }
  .d_pic{
    width: 30%;
    margin-right: 50px;
    float: left;
  }
  .d_content{
    text-align: left;
    /* width: 50%; */
  }
</style>
