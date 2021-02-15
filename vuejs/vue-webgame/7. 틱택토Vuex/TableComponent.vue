<template>
    <table>
        <!-- <tr-component v-for="(rowData, index) in tableData" :key="index" :row-index="index"></tr-component> -->
        <slot />
    </table>
</template>

<script>
import TrComponent from './TrComponent'

export default {
    props: {
        tableData: Array,
    },
    components: {
        TrComponent,
    },
    computed: {
        tableData() {
            return this.$store.state.tableData;
        },
        turnMessage() {
            return this.$store.getters.turnMessage;
        }
    },
};
</script>

<style>
table {
    border-collapse: collapse;
}
td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
}
</style>