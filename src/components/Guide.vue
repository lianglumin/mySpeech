<template>
    <div>
        <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                {{ item.content }}
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editableTabsValue: "2",
            editableTabs: [
                {
                    title: 'Tab 1',
                    name: '1',
                    content: 'Tab 1 content',
                },
                {
                    title: 'Tab 2',
                    name: '2',
                    content: 'Tab 2 content',
                }
            ]
        }
    }
}
</script>

<style>

</style>