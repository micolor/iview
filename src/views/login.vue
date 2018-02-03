<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">欢迎登录Ann</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            loginData: '',
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.login();
                }
            });
        },
        login () {
            var _this = this;
            this.$http.post('oauth/token', {
                client_secret: '6I7eZsxWVpnXatbpe6NEWN4Ka2C0KCl6clKtRZsq',
                client_id: 2,
                username: _this.form.userName,
                password: _this.form.password,
                grant_type: 'password',
                scope: '*'
            }).then(function (res) {
                _this.loginData = res.data;
                _this.$store.commit('setToken', res.data.access_type + '&nbsp;' + res.data.access_token);
                _this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                Cookies.set('user', _this.form.userName);
                Cookies.set('password', _this.form.password);
                Cookies.set('access', 0);
                _this.$router.push({
                    name: 'home_index'
                });
            }).catch(function () {
                _this.$Notice.warning({
                    title: '请求有误！',
                    desc: '账号信息有误'
                });
            });
        }
    }
};
</script>

<style>

</style>
