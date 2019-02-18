<template>
    <div class="pageView bgWhite">
        <div class="bgWhite">
            <!-- <img src="../../assets/images/icon/login/logo.png" class="loginImg"> -->
            <div class="loginCon">
                <p class="login-title">手机号</p>
                <el-input placeholder="请输入手机号" type="tel" :maxlength="11" v-model.trim="login.phone" clearable class="myInput">
                </el-input>
                <p class="login-title">密码</p>
                <el-input placeholder="请输入登录密码" type="text" v-model.trim="login.pw" clearable class="myInput">
                </el-input>
                <p class="login-title">验证码</p>
                <el-input placeholder="请输入验证码" type="tel" :maxlength="6" v-model.trim="login.code" clearable class="myInput">
                    <button class="codeBtn" slot="append" v-bind:disabled="codeDisabled" :class="codeDisabled?'notLogin':''" v-text="codeTitle" v-on:click="getCode()"></button>
                </el-input>
            </div>
            <button class="Gologin" @click="registerFun()">注册</button>
            <button class="Gologin" v-if='isToLogin' @click="GotoLoginFun()">去登录</button>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      login: {
        phone: "",
        pw: "",
        code: ""
      },
      codeTitle: "获取验证码",
      codeDisabled: false,
      isToLogin: false
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
            console.log(response.data);
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
    registerFun() {
      this.codeDisabled = true;
      var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
      if (!reg.test(this.login.phone)) {
        return this.common.alert("您输入的手机号码格式不正确");
      }
      this.$axioshttp
        .post(
          "/json/user/regist",
          qs.stringify({
            phoneNumber: this.login.phone,
            password: this.login.pw,
            code: this.login.code
          })
        )
        .then(response => {
          if(response.data.success || response.data.message == '此手机号以被注册'){
            this.isToLogin = true;
          }
          if (response.data.message) {
            // console.log(JSON.stringify(response.data));
            return this.common.alert(response.data.message);
          }
        })
        .catch(response => {});
    },
    GotoLoginFun(){
        this.$router.push({
          name: "Login",
          query: {
            LoginTel: this.login.phone
          }
        });
    }
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
