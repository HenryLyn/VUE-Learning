<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌：</span>
        <span
          class="list-control-filter-item"
          :class="{on: item === filterBrand}"
          v-for="item in brands"
          @click="handleFilterBrand(item)"
          :key="item">{{ item }}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span
          class="list-control-filter-item"
          :class="{on: item === filterColor}"
          v-for="item in colors"
          @click="handleFilterColor(item)"
          :key="item">{{ item }}</span>
      </div>
      <div class="list-control-order">
        <span>排序</span>
        <span
          class="list-control-order-item"
          :class="{on: order === ''}"
          @click="handleOrderDefault">默认</span>
        <span
          class="list-control-order-item"
          :class="{on: order === 'sales'}"
          @click="handleOrderSales">
          销量
          <template v-if="order === 'sales'">↓</template>
        </span>
        <span
          class="list-control-order-item"
          :class="{on: order.indexOf('cost') > -1}"
          @click="handleOrderCost">
          价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <Product
      v-for="item in filteredAndOrderedList"
      :info="item"
      :key="item.id"></Product>
    <div
      class="product-not-found"
      v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>
<script>
import Product from '../components/product'
export default {
  components: {Product},
  data () {
    return {
      // 排序依据，可选值为：
      // sales (销量)
      // cost-desc (价格降序)
      // cost-asc (价格升序)
      order: '',
      filterColor: '',
      filterBrand: ''
    }
  },
  methods: {
    handleOrderDefault () {
      this.order = ''
    },
    handleOrderSales () {
      this.order = 'sales'
    },
    handleOrderCost () {
      this.order === 'cost-desc' ? this.order = 'cost-asc' : this.order = 'cost-desc'
    },
    handleFilterColor (color) {
      this.filterColor === color ? this.filterColor = '' : this.filterColor = color
    },
    handleFilterBrand (brand) {
      this.filterBrand === brand ? this.filterBrand = '' : this.filterBrand = brand
    }
  },
  computed: {
    list () {
      return this.$store.state.productList
    },
    filteredAndOrderedList () {
      // 复制原始数据
      let list = [...this.list]

      // todo 按照品牌过滤
      if (this.filterBrand !== '') {
        list = list.filter(item => {
          return item.brand === this.filterBrand
        })
      }

      // todo 按照颜色过滤
      if (this.filterColor !== '') {
        list = list.filter(item => {
          return item.color === this.filterColor
        })
      }

      // 排序
      if (this.order !== '') {
        if (this.order === 'sales') {
          list = list.sort((a, b) => {
            return b.sales - a.sales
          })
        } else if (this.order === 'cost-desc') {
          list = list.sort((a, b) => {
            return b.cost - a.cost
          })
        } else if (this.order === 'cost-asc') {
          list = list.sort((a, b) => {
            return a.cost - b.cost
          })
        }
      }
      return list
    },
    brands () {
      return this.$store.getters.brands
    },
    colors () {
      return this.$store.getters.colors
    }
  },
  mounted () {
    this.$store.dispatch('getProductList')
  }
}
</script>
<style scoped>
.product-not-found {
  text-align: center;
  padding: 32px;
}

.list-control {
  background: #ffffff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
}

.list-control-filter {
  maring-bottom: 16px;
}

.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  maring-right: 6px;
  padding: 2px 6px;
}

.list-control-filter-item.on,
.list-control-order-item.on {
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #ffffff;
}
</style>
