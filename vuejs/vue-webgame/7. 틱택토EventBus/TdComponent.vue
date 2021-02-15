<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from './EventBus';

export default {
    props: {
        cellData: String,
        cellIndex: Number,
        rowIndex: Number,
    },
    methods: {
        onClickTd() {
            if (this.cellData) {
                return;
            }
            
            // $emit으로 이벤트 실행
            EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
        },
    },
}
</script>