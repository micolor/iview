<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>
<template>
    <div>
        <Row :gutter="10">
            <Card>
                <p slot="title">
                    <Icon type="ios-search-strong"></Icon>
                    用户管理
                </p>
                <Row>
                    <Input v-model="searchConName" placeholder="请输入姓名搜搜..." style="width: 200px"/>
                    <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                    <Button @click="handleCancel" type="ghost">取消</Button>
                </Row>
                <Ctabel :CtableColumns="columns"
                        :CtableData="data"
                        :CtableTotal="total"
                        @changepage="changepage">
                </Ctabel>
            </Card>
        </Row>
    </div>
</template>
<script>
    import Ctabel from '../commpoents/Ctable/Ctable';
    export default {
        data () {
            return {
                searchConName: '',
                columns: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '创建时间',
                        key: 'created_at'
                    }
                ],
                data: [],
                nowPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        methods: {
            init () {
                var _this = this;
                this.$http.post('api/user/list', {
                    page: _this.nowPage,
                    limit: _this.pageSize
                }).then(function (res) {
                    _this.data = res.data.data.data;
                    _this.total = res.data.data.total;
                });
            },
            changepage (index) {
                this.nowPage = index.nowPage;
                this.pageSize = index.pageSize;
                this.data = this.init();
            },
            search () {
                return this.data;
            },
            handleSearch () {
                this.data = this.init();
            },
            handleCancel () {
                this.data = this.init();
            }
        },
        components: {
            Ctabel
        },
        mounted () {
            this.init();
        }
    };
</script>
