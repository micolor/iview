<template>
    <div>
        <Row :gutter="10">
            <Card>
                <p slot="title">
                    <Icon type="ios-search-strong"></Icon>
                    菜单管理
                </p>
                <DragableTable refs="table" :columns-list="columnsList" v-model="tableData" ></DragableTable>
            </Card>
        </Row>
    </div>
</template>

<script>
    import DragableTable from '../commpoents/Tables/dragableTable';
    export default {
        name: 'menus-list',
        components: {
            DragableTable
        },
        columnsList: [],
        tableData: [],
        table: {
            hasDragged: false,
            isDragging: false,
            oldIndex: 0,
            newIndex: 0,
            chooseRecord: []
        },
        methods: {
            getData () {
                this.columnsList = [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '图标',
                        key: 'todoItem'
                    },
                    {
                        title: 'URL',
                        key: 'remarks'
                    },
                    {
                        title: '是否显示',
                        key: 'remarks'
                    },
                    {
                        title: '拖拽',
                        key: 'drag',
                        width: 90,
                        align: 'center',
                        render: (h) => {
                            return h(
                                'Icon',
                                {
                                    props: {
                                        type: 'arrow-move',
                                        size: 24
                                    }
                                }
                            );
                        }
                    }
                ];
                this.tableData = [
                    {
                        todoItem: '明天去后海玩',
                        remarks: '估计得加班'
                    },
                    {
                        todoItem: '后天去和妹子看电影',
                        remarks: '可能没妹子'
                    },
                    {
                        todoItem: '大后天去吃海天盛筵',
                        remarks: '没钱就不去了'
                    },
                    {
                        todoItem: '周末去看电影',
                        remarks: '估计得加班'
                    },
                    {
                        todoItem: '下个月准备回家看父母',
                        remarks: '估计得加班'
                    },
                    {
                        todoItem: '该买回家的票了',
                        remarks: '可能没票了'
                    },
                    {
                        todoItem: '过年不回家和父母视频聊天',
                        remarks: '一定要记得'
                    },
                    {
                        todoItem: '去车站接父母一起在北京过年',
                        remarks: 'love'
                    }
                ];
            }
        },
        created () {
            // 可在此从服务端获取表格数据
            this.getData();
        }
    };
</script>

<style scoped>

</style>
