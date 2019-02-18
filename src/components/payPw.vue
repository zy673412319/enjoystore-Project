<template>
  <div>
    <div class="phonenumBg opactBg" v-show="payPass">
      <div class="" style="margin-top: 20%">
        <div class="phonenum-show">
          <div class="getback-title">请输入支付密码
          </div>
          <div class="write-phonenum">
            <div class="flex f-d-r pay_content">
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps1" maxlength="1" disabled>
              </p>
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps2" maxlength="1" disabled>
              </p>
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps3" maxlength="1" disabled>
              </p>
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps4" maxlength="1" disabled>
              </p>
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps5" maxlength="1" disabled>
              </p>
              <p class="ipt_pay">
                <input type="password" v-model="pass.ps6" maxlength="1" disabled>
              </p>
            </div>
          </div>
          <div class="phoneBtn">
            <button @click="closePayMedin()">取消</button>
            <button @click="affirmPass()">确认</button>
          </div>
        </div>
        <footer>
          <ul class="pay_btn">
            <li @click="btnpassword(1)">1</li>
            <li @click="btnpassword(2)">2</li>
            <li @click="btnpassword(3)">3</li>
            <li @click="btnpassword(4)">4</li>
            <li @click="btnpassword(5)">5</li>
            <li @click="btnpassword(6)">6</li>
            <li @click="btnpassword(7)">7</li>
            <li @click="btnpassword(8)">8</li>
            <li @click="btnpassword(9)">9</li>
            <li class="b9" @click="eliminatePass()">取消</li>
            <li @click="btnpassword(0)">0</li>
            <li class="b9" @click="btndelete">删除</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "payPw",
  data() {
    return {
      payPass: true,
      finallyPass: "",
      pass: {
        ps1: "",
        ps2: "",
        ps3: "",
        ps4: "",
        ps5: "",
        ps6: ""
      },
      keys: ["ps1", "ps2", "ps3", "ps4", "ps5", "ps6"]
    };
  },
  methods: {
    // 关闭支付框
    closePayMedin() {
      this.finallyPass = "";
      for (var i = 0; i < this.keys.length; i++) {
        this.pass[this.keys[i]] = "";
      }
      this.payPass = false;
    },
    //输入密码
    btnpassword(num) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.pass[this.keys[i]] == "") {
          this.pass[this.keys[i]] = num.toString();
          i = 20;
        }
      }
    },
    //清除密码
    eliminatePass() {
      for (var i = 5; i >= 0; i--) {
        this.pass[this.keys[i]] = "";
      }
    },
    // 删除支付密码
    btndelete() {
      for (var i = 5; i >= 0; i--) {
        if (this.pass[this.keys[i]]) {
          this.pass[this.keys[i]] = "";
          i = -1;
        }
      }
    },
    //确认支付密码
    affirmPass() {
      for (var i = 0; i < this.keys.length; i++) {
        this.finallyPass += this.pass[this.keys[i]];
      }
      if (this.finallyPass.length === 6) {
        this.payPass = false;
        alert(this.finallyPass);
      } else {
        this.finallyPass = "";
        return thisem.common.alert("请输入6位支付密码");
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/mixinCss.scss";
</style>