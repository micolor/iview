// props:
//   (表头配置)CtableColumns  type:Array
//   (列表数据)CtableData     type:Array
//   (分页总页)CtableTotal    type:Number
//   (分页所有事件)changepage     type:event  return [pageSize,pageSize]
<template>
    <div>
        <Cserach :searchDate="SearchDate"></Cserach>
        <Table border :columns="CtableColumns" :data="CtableData" @on-sort-change="changeSort" class="margin-top-10"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="CtableTotal" :current="nowPage" @on-change="changePage" @on-page-size-change="changePageSize"
                      size="small" show-sizer show-total>
                </Page>
            </div>
        </div>
    </div>
</template>
<script>
    import Cserach from './Cserach';
    export default {
        data () {
            return {
                nowPage: 1,
                pageSize: 10,
                sortBy: ''
            };
        },
        props: {
            CtableColumns: Array,
            CtableData: Array,
            CtableTotal: Number,
            SearchDate: Array
        },
        methods: {
            changePage (nowpage) {
                this.nowPage = nowpage;
                alert(1)
                this.sendDate();
            },
            changePageSize (pageSize) {
                this.pageSize = pageSize;
                this.sendDate();
            },
            changeSort (column) {
                if (column.order === 'normal') {
                    this.sortBy = '';
                } else {
                    this.sortBy = column.key + ' ' + column.order;
                }
                this.sendDate();
            },
            sendDate () {
                this.$emit('changepage', {
                    nowPage: this.nowPage,
                    pageSize: this.pageSize,
                    sortBy: this.sortBy
                });
            }
        },
        components: {
            Cserach
        }
    };
</script>
