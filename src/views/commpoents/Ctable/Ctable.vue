// props:
//   (表头配置)CtableColumns  type:Array
//   (列表数据)CtableData     type:Array
//   (分页总页)CtableTotal    type:Number
//   (分页所有事件)changepage     type:event  return [pageSize,pageSize]
<template>
    <div>
        <Cserach :SearchDate="SearchDate" @on-search="onSerach" @on-cancel="onSerach"></Cserach>
        <div style="margin:10px 0;overflow: hidden;">
            <div style="float: left;">
                <ButtonGroup>
                    <Button type="ghost" icon="document" title="新增" @click="addRow"></Button>
                    <Button type="ghost" icon="edit" title="编辑" @click="editRow"></Button>
                    <Button type="ghost" icon="trash-a" title="删除" @click="delRow"></Button>
                </ButtonGroup>
            </div>
            <div style="float: right;">
                <Page :total="CtableTotal" :current="nowPage" @on-change="changePages"
                      @on-page-size-change="changePageSize" :pageSize="pageSize"
                      size="small" show-sizer show-total>
                </Page>
            </div>
        </div>
        <Table border :columns="CtableColumns" :data="CtableData" @on-sort-change="onSort"
               class="margin-top-10" height="620"></Table>
    </div>
</template>
<script>
    import Cserach from './Cserach';

    export default {
        data () {
            return {
                nowPage: 1,
                pageSize: 20,
                sortBy: '',
                searchBy: ''
            };
        },
        props: {
            CtableColumns: Array,
            CtableData: Array,
            CtableTotal: Number,
            SearchDate: Object
        },
        methods: {
            changePages (nowpage) {
                this.nowPage = nowpage;
                this.sendDate();
            },
            changePageSize (pageSize) {
                this.pageSize = pageSize;
                this.sendDate();
            },
            onSort (column) {
                if (column.order !== 'normal') {
                    this.sortBy = {
                        key: column.key,
                        order: column.order
                    };
                }
                this.sendDate();
            },
            onSerach (data) {
                this.searchBy = data.searchBy;
                this.sendDate();
            },
            sendDate () {
                this.$emit('changepage', {
                    nowPage: this.nowPage,
                    pageSize: this.pageSize,
                    sortBy: this.sortBy,
                    searchBy: this.searchBy
                });
            },
            addRow () {
                alert('新增');
                this.$emit('addRow');
            },
            editRow () {
                alert('编辑');
                this.$emit('editRow');
            },
            delRow () {
                alert('删除');
                this.$emit('delRow');
            }
        },
        components: {
            Cserach
        }
    };
</script>
<style scoped>
</style>
