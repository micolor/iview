<template>
  <div>
    <Row :gutter="10">
      <Card>
        <p slot="title">
          <Icon type="ios-search-strong"></Icon>
          菜单管理
        </p>
        <ButtonGroup style="margin:10px 0px;">
          <Button type="ghost" icon="document" title="新增" @click="add"></Button>
        </ButtonGroup>
        <DragableTable @on-end="tableChange" refs="table" :columns-list="columnsList" v-model="tableData"></DragableTable>
        <Edit :isshow="isshow" @refresh="getData"  :editVal="editVal" @changeModal="changeModal"></Edit>  
      </Card>
    </Row>
  </div>
</template>


<script>
  import Vue from 'vue'
  import DragableTable from "../commpoents/Tables/dragableTable";
  import Edit from 'views/menus/Modal/edit'
  var Aaa = Vue.extend({
    props: {
      data: Array
    },
    methods:{
      edit(iteam){
        this.$emit('edit',iteam)
      },
      delect(iteam){
        this.$emit('delect',iteam)
      }
    },
    template: `<div class="sontable"> 
              <Row class="expand-row"  :key="index"  v-for="(iteam,index) in data">
                <Col class="expand-value" style="width:28%;display:inline-block;margin-left:2.5%">
                    <span >{{iteam.name}}</span>
                </Col>
                <Col style="width:28%;display:inline-block;" class="expand-value">
                    <span>{{iteam.show==1?'是':'否'}}</span>
                </Col>
                <Col style="width:28%;display:inline-block;" class="expand-value">
                    <span >{{iteam.created_at}}</span>
                </Col>
                 <Col style="display:inline-block;" class="expand-value">
                    <Button type="primary" @click="edit(iteam)" size="small">编辑</Button>  
                    <Button type="error" @click="delect(iteam)" size="small">删除</Button>  
                </Col>
              </Row>
            </div>`
  });
  export default {
    name: "menus-list",
    components: {
      DragableTable,
      Aaa,
      Edit
    },
    data() {
      return {
        editVal:{},
        isshow: false,
        columnsList: [{
            title: "",
            type: "expand",
            width: 80,
            align: "center",
            render: (h, p) => {
              return h(Aaa, {
                props: {
                  data: p.row.children
                },
                on: {
                  edit: (params,value) => {
                    let obj = {}
                    obj.row = params
                    this.edit(obj);
                  },
                  delect:(params=>{
                     let obj = {}
                    obj.row = params
                    this.delect(obj);
                  })
                }
              });
            }
          },
          {
            title: "模块名称",
            key: "name"
          },
          {
            title: "是否显示",
            key: "show",
            render: (h, params) => {
              return h("span", params.row.show == 1 ? "是" : "否");
            }
          },
          {
            title: "创建时间",
            key: "created_at"
          },
          {
            title: "操作",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(params);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button", {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.delect(params);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          },
           {
            title: "拖拽",
            key: "drag",
            width: 90,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "arrow-move",
                    size: 24
                  }
                })
              ]);
            }
          }
        ],
        tableData: [],
        table: {
          hasDragged: false,
          isDragging: false,
          oldIndex: 0,
          newIndex: 0,
          chooseRecord: []
        }
      };
    },
    methods: {
      tableChange(value){
        let sort = value.to;
        let id = this.tableData[value.to].id
        this.$http.post("api/module/sort",{
          id:id,
          sort:sort
        }).then(res=>{
          if(res.data.status=='success'){
            this.$Notice.success({
                  title: '排序成功',
            });
            this.getData();
          }
        })
      },
      changeModal(){
        this.isshow=!this.isshow
        this.editVal = {}
      },
      delect(params) {
        this.$http.post("api/module/del",{
          id:params.row.id
        }).then(res=>{
          if(res.data.status=='success'){
            this.$Notice.success({
                  title: '删除成功',
            });
            this.getData();
          }
        })
      },
      add(){
        this.changeModal();
      },
      edit(params) {
        this.$http.post("api/module/detail",{
          id:params.row.id
        }).then(res=>{
          if(res.data.status=='success'){
            this.editVal = res.data.data
          }
        })
        this.changeModal();
      },
      getData() {
        this.$http.post("api/module/index").then(res => {
          if (res.data.status == "success") {
            var arr = [];
            res.data.data.forEach(iteam => {
              arr.push(iteam);
            });
            this.tableData = arr;
            console.log(this.tableData);
          }
        });
      }
    },
    created() {
      // 可在此从服务端获取表格数据
      this.getData();
    },
  };
</script>
<style lang="less">
  .expand-value{
    line-height: 30px;
  }
  .sontable{
    margin: -12px 20px;
  }
</style>

