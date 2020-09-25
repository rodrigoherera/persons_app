<template>
  <div class="centered">
    <h3 v-if="isLogin">Login</h3>
    <h3 v-if="!isLogin">Register</h3>
    <div class="container">
      <div class="options">
        <a href="#" v-if="!isLogin" v-on:click="isLogin = true">Go to Login</a>
        <a href="#" v-if="isLogin" v-on:click="isLogin = false"
          >Go to Register
        </a>
      </div>
      <div v-if="isLogin">
        <form class="form">
          <div>
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <input type="button" value="Login" class="btn" @click="login" />
        </form>
      </div>
      <div v-else v-bind:class="'changeContainer'">
        <form class="form">
          <div>
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <input type="button" value="Register" class="btn" @click="register" />
        </form>
      </div>
      {{ registerError }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import users from "@/store/modules/User";
import { UserAuth } from "@/store/models";
import VueInsProgressBar from 'vue-ins-progress-bar';

@Component({
  name: "Auth",
})
export default class Auth extends Vue {
  isLogin = true;
  email = "";
  password = "";
  loginError = "";
  registerError = "";
  isLoading = false;

  async login() {
    this.isLoading = true;
    // simulate AJAX
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
    /*     if (this.email != "" || this.password != "") {
      const user: UserAuth = { email: this.email, password: this.password };
      const ret = await users.login(user);

      if (ret.error != "") {
        this.registerError = String(ret.error);
      } else {
        this.$router.push("/main");
      }
    } else {
      console.log("Faltan argumentos");
    } */
  }
  async register() {
    if (this.email != "" || this.password != "") {
      const user: UserAuth = { email: this.email, password: this.password };
      const ret = await users.register(user);

      if (ret.error != "") {
        this.registerError = String(ret.error);
      } else {
        if (ret.id != "") {
          const userLogin: UserAuth = {
            email: this.email,
            password: this.password,
          };
          const ret = await users.login(userLogin);
          if (ret.error != "") {
            this.registerError = String(ret.error);
          } else {
            this.$router.push("/main");
          }
        } else {
          this.registerError = "Unexpected error";
        }
      }
    } else {
      console.log("Faltan argumentos");
    }
  }
}
</script>

<style lang="scss" scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  font-size: 1.5rem;
  color: #fff;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #1a1a1b;
  width: 300px;
  height: 300px;
}
.changeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: #1a1a1b;
  width: 300px;
  height: 500px;
}
label {
  display: block;
  color: #d7dadc;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 5px;
}
input {
  width: 250px;
  height: 50px;
  font-size: 1rem;
}
.btn {
  color: #d7dadc;
  font-size: 0.9rem;
  margin-top: 20px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.5s;
  &:hover {
    background: rgb(116, 51, 221);
  }
}
.options {
  a {
    color: #d7dadc;
    margin-top: 5px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.5s;
    &:hover {
      color: rgb(157, 100, 248);
    }
  }
}
</style>
