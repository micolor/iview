<template>
    <div>
        <Card>
            <Row>
                <Col span="4" v-for="item in SearchDate.fields" style="margin-bottom: 10px;">
                <Row>
                    <span style="font-size: 10px">{{item.title}}</span>
                </Row>
                <div style="width:80%">
                    <Input v-if="item.type == 'text'" :placeholder="item.placeholder" v-model="item.val"/>
                    <Select v-if="item.type == 'select'" v-model="item.val" :multiple="item.options.multiple"
                            :filterable="item.options.filterable" :clearable="true">
                        <Option v-for="olist in item.options.list" :value="olist.value" :key="olist.value">{{
                            olist.label }}
                        </Option>
                    </Select>
                    <DatePicker v-if="item.type == 'daterange'" type="daterange" placement="bottom-end"
                                v-model="item.val" :placeholder="item.placeholder" style="width: 100%"></DatePicker>
                </div>
                </Col>
                <Col span="4" v-show="SearchDate.fields">
                <Row>
                    <span style="width:20%">&nbsp;</span>
                </Row>
                <Row>
                    <span @click="handleSearch" style="margin-right: 10px"><Button type="primary"
                                                                                   icon="search">搜索</Button></span>
                    <Button @click="handleCancel" type="ghost">重置</Button>
                </Row>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'cserach',
        data () {
            return {};
        },
        props: {
            SearchDate: Object
        },
        methods: {
            handleSearch () {
                var res = [];
                for (var index in this.SearchDate.fields) {
                    if (this.SearchDate.fields[index].val !== '') {
                        if ((this.SearchDate.fields[index].val instanceof Array) && (!this.SearchDate.fields[index].val[0])) {
                            continue;
                        } else {
                            res.push({
                                name: this.SearchDate.fields[index].name,
                                val: this.SearchDate.fields[index].val,
                                isEq: this.SearchDate.fields[index].isEq
                            });
                        }
                    }
                }
                if (res.length > 0) {
                    this.$emit('on-search', {
                        searchBy: res
                    });
                } else {
                    this.$emit('on-search', {
                        searchBy: ''
                    });
                }
            },
            handleCancel () {
                for (var index in this.SearchDate.fields) {
                    this.SearchDate.fields[index].val = '';
                }
                this.$emit('on-cancel', {
                    searchBy: ''
                });
            }
        }
    };
</script>

<style scoped>
</style>
