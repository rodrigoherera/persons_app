import {
  VuexModule,
  Module,
  Mutation,
  Action,
  config,
  getModule,
} from "vuex-module-decorators";
import { UserAuth, RegisterResponse, LoginResponse, Token } from "../models";
import store from "@/store";

config.rawError = true;
@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: "users",
})
class UserStore extends VuexModule {
  user: UserAuth | null = null;
  token: Token | null = null;

  get User() {
    return this.user;
  }

  get Token() {
    return this.token;
  }

  @Mutation
  setUser(user: UserAuth) {
    this.user = user;
  }

  @Action({ commit: "setUser" })
  async register(user: UserAuth) {
    const data = {
      email: user.email,
      password: user.password,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Request-Method": "POST",
        "Content-type": "application/json",
      },
    };

    const response = await fetch(
      "http://localhost:8000/v1/user",
      requestOptions
    );

    if (response.status == 201) {
      const res: RegisterResponse = await response.json();
      res.error = "";
      return res;
    } else {
      const txt = await response.text();
      const msg: RegisterResponse = { email: "", id: "", error: txt };
      return msg;
    }
  }

  @Action({ commit: "setUser" })
  async login(user: UserAuth) {
    const data = {
      email: user.email,
      password: user.password,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Content-type": "application/json",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    };

    const response = await fetch(
      "http://localhost:8000/v1/login",
      requestOptions
    );
    if (response.ok) {
      const res: LoginResponse = await response.json();
      res.error = "";
      return res;
    } else {
      const txt = await response.text();
      const msg: LoginResponse = {
        email: "",
        name: "",
        value: "",
        expires: "",
        error: txt,
      };
      return msg;
    }
  }

  @Action({ commit: "setUser" })
  async logout() {
    return null;
  }
}

export default getModule(UserStore);
