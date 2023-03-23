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
        <van-field name="salesStatus" label="营业可能">
          <template #input>
            <van-switch v-model="user.salesStatus" />
          </template>
        </van-field>
        <van-field
          v-model="user.reason"
          name="reason"
          rows="1"
          autosize
          label="原因"
          type="textarea"
          maxlength="80"
          placeholder="原因"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          更新
        </van-button>
      </div>
      <div style="margin: 16px; height: 10px">
        <van-button round block type="warning" @click="onClick">
          戻る
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
      values.Id = userId.value;
      values.salesStatus = values.salesStatus ? "可能" : "不可";
      var me = this;
      axios
        .post(
          "http://localhost:3000/sf/worker/" + userId.value + "/update",
          values,
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
        console.log(me.user.salesStatus);
        me.user.salesStatus = me.user.salesStatus == "可能";
      })
      .catch(function (res) {
        //vueにバインドされている値を書き換えると表示に反映される
        app.result = res.data;

        console.log(res);
      });
  },

  methods: {
    onClick(e) {
      // オブジェクト
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.user {
}
</style>
