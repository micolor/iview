// props:
//   (表头配置)CtableColumns  type:Array
//   (列表数据)CtableData     type:Array
//   (分页总页)CtableTotal    type:Number
//   (分页所有事件)changepage     type:event  return [pageSize,pageSize]
<template>
    <div>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="CtableTotal" :current="1" @on-change="changePage" @on-page-size-change="changePageSize"
                      size="small" show-sizer show-total>
                </Page>
            </div>
        </div>
        <Table border :columns="CtableColumns" :data="CtableData"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                nowPage: 1,
                pageSize: 10
            };
        },
        props: {
            CtableColumns: Array,
            CtableData: Array,
            CtableTotal: Number
        },
        methods: {
            changePage (nowpage) {
                this.nowPage = nowpage;
                this.$emit('changepage', {
                    nowPage: this.nowPage,
                    pageSize: this.pageSize
                });
            },
            changePageSize (pageSize) {
                this.pageSize = pageSize;
                this.$emit('changepage', {
                    nowPage: this.nowPage,
                    pageSize: this.pageSize
                });
            }
        }
    };
</script>
