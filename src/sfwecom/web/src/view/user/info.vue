<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.name"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          readonly
        />
        <van-field name="switch" label="停止营业">
          <template #input>
            <van-switch v-model="user.status" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { showToast } from "vant";
import "vant/es/toast/style";
import { ref } from "vue";

export default {
  data() {
    return {
      user: {},
    };
  },

  setup(props) {
    const userId = ref(0);
    const onSubmit = (values) => {
      console.log("submit", values);
      console.log("userId", userId.value);
      var me = this;
      axios
        .post(
          "http://localhost:3000/sf/worker/" + userId.value + "/update",
          { Id: userId.value, Status__c: "稼働中" },
          {}
        )
        .then(function (res) {
          //vueにバインドされている値を書き換えると表示に反映される
          if (res.data.success) {
            showToast("保存成功");
          }
        })
        .catch(function (res) {
          //vueにバインドされている値を書き換えると表示に反映される
          app.result = res.data;

          console.log(res);
        });
    };

    return {
      userId,
      onSubmit,
    };
  },
  mounted() {
    var me = this;
    axios.defaults.baseURL = "http://localhost:3000";
    var user = this.$route.query.user;
    me.userId = user;
    axios
      .get("/sf/worker/" + user, {}, {})
      .then(function (res) {
        //vueにバインドされている値を書き換えると表示に反映される
        me.user = res.data;
        console.log(me.user.status);
        me.user.status = me.user.status == "稼働中";
      })
      .catch(function (res) {
        //vueにバインドされている値を書き換えると表示に反映される
        app.result = res.data;

        console.log(res);
      });
  },

  methods: {},
};
</script>
<style>
.user {
}
</style>
