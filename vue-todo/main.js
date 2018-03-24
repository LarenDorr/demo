Vue.component("to-do", {
  template: `
      <li class="item" v-bind:class="{complete:data.flag}" :data-num='data.num'>      
        <input type="checkbox" :checked='data.flag' @click='changeCom'>
				<label>{{data.todo}}</label>  
        <button class="del" @click='delItem'></button>
        
      </li>`,
  props: ['data'],
  methods: {
    changeCom: function () {
      this.$emit('get-change', this.data.num)
    },
    delItem: function () {
      this.$emit('get-del', this.data.num)
    }
  }
});

let app = new Vue({
  el: "#app",
  data: {
    list: []
  },
  methods: {
    handleChange: function (data) {
      this.list.forEach((e) => {
        if (e.num === data) {
          e.flag === 1 ? e.flag = 0 : e.flag = 1;
        }
      })
      // this.refresh(); // 暂时不排序
    },
    add: function () {
      let input = document.getElementById('input')
      let val = input.value;
      if (!val) return;
      let obj = {
        flag: 0,
        todo: val,
        num: this.list.length + 1
      };
      this.list.unshift(obj);
      input.value = '';
      console.log('added');

    },
    refresh: function () {
      let complete = [];
      let unComplete = [];
      this.list.forEach(ele => {
        if (ele.flag === 1) {
          complete.push(ele);
        } else if (ele.flag === 0) {
          unComplete.push(ele);
        }
      });
      this.list = unComplete.concat(complete);
    },
    handleDel: function (data) {
      let tmp = [];
      this.list.forEach((ele) => {
        if (ele.num != data) tmp.push(ele);
      })
      this.list = tmp;
    }
  }
});