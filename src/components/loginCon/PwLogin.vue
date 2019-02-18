<template>
  <div class="pageView bgWhite">
    <div class="bgWhite">
      <!-- <img src="../../assets/images/icon/login/logo.png" class="loginImg"> -->
      <div class="loginCon">
        <p class="login-title">手机号</p>
        <el-input placeholder="请输入手机号" type="tel" :maxlength="11" v-model.trim="login.phone" clearable class="myInput">
        </el-input>
        <p class="login-title">登录密码</p>
        <el-input placeholder="请输入登录密码" type="text" v-model.trim="login.loginpw" clearable class="myInput">
        </el-input>
      </div>
      <button class="Gologin" @click="loginFun()">登录</button>
      <div class="login-Bottom">
        <router-link :to="{name:'register'}">注册</router-link>
        <router-link :to="{name:'Login'}">验证码登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      login: {
        phone: "",
        loginpw: ""
      }
    };
  },
  mounted: function() {},
  watch: {},
  methods: {
    loginFun() {
      var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
      if (!reg.test(this.login.phone)) {
        return this.common.alert("您输入的手机号码格式不正确");
      }
      if (!this.login.loginpw) {
        return this.common.alert("您输入登录密码");
      }
      this.$axioshttp
        .post(
          "/json/user/login",
          qs.stringify({
            phoneNumber: this.login.phone,
            password: this.login.loginpw,
            landingType: 1 //0=验证码登陆，1=密码登陆
          })
        )
        .then(response => {
          console.log(
            JSON.stringify(response.data.success) + "===response.data"
          );
          if (response.data.success) {
            this.common.alert(response.data.message);
            setTimeout( () => {
              this.saveUserData(response.data.data);
              this.$router.push({ name: "Index" });
            }, 1500);
          } else {
            return this.common.alert(response.data.message);
          }
        })
        .catch(response => {});
    },
    ...mapMutations({
      saveUserData: "updateUserData"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixinCss";
.loginImg {
  width: 23%;
  display: block;
  margin: 30px auto;
}
.Gologin {
  width: 74%;
  display: block;
  margin: 26px auto;
  height: 44px;
  line-height: 44px;
  @include focusClear;
  @include radius;
  color: white;
  font-size: 15px;
  background: #ff971d;
}
.other-Login {
  margin: 10px 0 30px 0;
  text-align: center;
  .login-Icon {
    width: 40px;
  }
}
</style>