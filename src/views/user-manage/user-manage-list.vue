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
                <Ctabel :CtableColumns="columns"
                        :CtableData="data"
                        :CtableTotal="total"
                        :SearchDate="searchDate"
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
                data: [],
                nowPage: 1,
                pageSize: 20,
                total: 0,
                sortBy: '',
                searchBy: '',
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
                        key: 'created_at',
                        sortable: true
                    }
                ],
                searchDate: {
                    fields: [
                        {
                            title: '性别',
                            type: 'select',
                            name: 'sex',
                            options: {
                                list: [
                                    {
                                        label: '红方',
                                        value: 0
                                    },
                                    {
                                        label: '蓝方',
                                        value: 1
                                    }
                                ],
                                filterable: false,
                                multiple: false
                            },
                            val: '',
                            isEq: 'eq'
                        },
                        {
                            title: '姓名',
                            type: 'text',
                            name: 'name',
                            val: '',
                            isEq: 'like',
                            placeholder: '请输入姓名...'
                        },
                        {
                            title: '创建时间',
                            type: 'daterange',
                            name: 'created_at',
                            val: '',
                            isEq: 'between',
                            placeholder: '选择日期.'
                        }
                    ]
                }
            };
        },
        methods: {
            init () {
                var _this = this;
                this.$http.post('api/user/list', {
                    page: _this.nowPage,
                    pageSize: _this.pageSize,
                    sortBy: _this.sortBy,
                    searchBy: _this.searchBy
                }).then(function (res) {
                    _this.data = res.data.data.data;
                    _this.total = res.data.data.total;
                });
            },
            changepage (index) {
                this.nowPage = index.nowPage;
                this.pageSize = index.pageSize;
                this.sortBy = index.sortBy;
                this.searchBy = index.searchBy;
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
