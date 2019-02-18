<template>
  <div class="pageView bgWhite">
    <div class="bgWhite">
      <!-- <img src="../../assets/images/icon/login/logo.png" class="loginImg"> -->
      <div class="loginCon">
        <p class="login-title">手机号</p>
        <el-input placeholder="请输入手机号" type="tel" :maxlength="11" v-model.trim="login.phone" clearable class="myInput">
        </el-input>
        <p class="login-title">验证码</p>
        <el-input placeholder="请输入验证码" type="tel" :maxlength="6" v-model.trim="login.code" clearable class="myInput">
          <button class="codeBtn" slot="append" v-bind:disabled="codeDisabled" :class="codeDisabled?'notLogin':''" v-text="codeTitle" v-on:click="getCode()"></button>
        </el-input>
        <div class="isRemember">
          <el-checkbox-group v-model="checkList" style="display: inline-block;">
            <el-checkbox label=""></el-checkbox>
          </el-checkbox-group>&nbsp;我已经阅读并同意
          <span @click="lookProtocol()">《服务协议》</span>
        </div>
        <img src="../../assets/images/icon/otherFun.png" style="margin:6px 0;">
        <div class="other-Login">
          <img src="../../assets/images/icon/login/WeChat.png" class="login-Icon" @click="weixinLogin()">
        </div>
      </div>
      <button class="Gologin" @click="loginFun()">登录</button>
      <div class="login-Bottom">
        <router-link :to="{name:'register'}">注册</router-link>
        <router-link :to="{name:'PwLogin'}">密码登录</router-link>
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
        phone: this.$route.query.LoginTel ? this.$route.query.LoginTel : "",
        code: ""
      },
      codeTitle: "获取验证码",
      codeDisabled: false,
      checkList: true
    };
  },
  mounted: function() {},
  watch: {},
  methods: {
    getCode() {
      if (this.codeDisabled) return;
      var TIME_COUNT = 60;
      var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
      if (reg.test(this.login.phone)) {
        this.$axioshttp
          .post(
            "/json/user/verification",
            qs.stringify({
              phoneNumber: this.login.phone,
              type: 0
            })
          )
          .then(response => {
            // console.log(response.data);
            if (!response.data.success) {
              return this.common.alert(response.data.message);
            } else {
              this.codeDisabled = true;
              this.timer = setInterval(() => {
                TIME_COUNT--;
                if (TIME_COUNT === 0) {
                  clearInterval(this.timer);
                  this.codeTitle = "获取验证码";
                  this.codeDisabled = false;
                } else {
                  this.codeTitle = "(" + TIME_COUNT + "秒)";
                }
              }, 1000);
            }
          })
          .catch(response => {
            this.codeDisabled = false;
          });
      } else {
        return this.common.alert("您输入的手机号码格式不正确");
      }
    },
    weixinLogin() {
      alert("去微信登录");
    },
    lookProtocol() {
      this.$router.push({
        name: "Protocol"
      });
    },
    loginFun() {
      this.codeDisabled = true;
      var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
      if (!reg.test(this.login.phone)) {
        return this.common.alert("您输入的手机号码格式不正确");
      }
      if (!this.checkList) {
        return this.common.alert("您未同意享立来《服务协议》");
      }
      this.$axioshttp
        .post(
          "/json/user/login",
          qs.stringify({
            phoneNumber: this.login.phone,
            verification: this.login.code,
            landingType: 0 //0=验证码登陆，1=密码登陆
          })
        )
        .then(response => {
          // console.log(JSON.stringify(response.data));
          if (response.data.message) {
            return this.common.alert(response.data.message);
          }
          if (response.data) {
            this.saveUserData(response.data);
            this.$router.push({ name: "Index" });
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