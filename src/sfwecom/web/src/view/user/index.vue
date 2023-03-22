<template>
  <div>
      <van-cell-group>
        <van-cell :title="user.Name"   label="" v-for="user in users" :key="user.id"/>
      </van-cell-group>
  </div>
</template>
<script>
import { showToast } from 'vant';
import 'vant/es/toast/style';

export default {
  data() {
    return {
      users: [{
        id: '1',
        name: 2680
      },{
        id: '2',
        name: 26380
      }]
    };
  },
    mounted() {
      var me = this;
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.get("/sf",{},{})
          .then(function(res){
            //vueにバインドされている値を書き換えると表示に反映される
            me.users = res.data.records;
            console.log(res)
          })
          .catch(function(res){
            //vueにバインドされている値を書き換えると表示に反映される
            app.result = res.data
            console.log(res)
          })
  },
  methods: {

  },
};
</script>
<style >
.user {
  
}
</style>
