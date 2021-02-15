<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent';

export default {
    components: {
        TdComponent,
    },
    props: {
        rowData: Array,
        rowIndex: Number,
    },
    data() {
        return {
            parent: '내가 니 애비다.',
        };
    },
    computed: {
        rowData() {
            return this.$store.state.tableData[this.rowIndex];
        },
    },
};
</script>