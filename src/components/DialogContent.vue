<template>
    <div class="echartsBox">
        <div class="title">{{ props.options.title }}</div>
        <div class="description">{{ props.options.description }}</div>
        <div class="showorders" v-if="props.options.type == 'social-trends-detailed'" key="social-trends-detailed">
            <rowChart class="rowChart" :title="props.options.infos[0].title" :data="props.options.infos[0].data"
                tips1="type" tips2="percentage">
            </rowChart>
            <colChart class="colChart" :title="props.options.infos[1].title" :data="props.options.infos[1].data"
                tips1="type" tips2="count">
            </colChart>
        </div>
        <div class="showorders" v-if="props.options.type == 'whale-tracking-detailed'" key="whale-tracking-detailed">
            <rowChart class="rowChart" :title="props.options.infos[0].title" :data="props.options.infos[0].data"
                tips1="range" tips2="count">
            </rowChart>
            <colChart class="colChart" :title="props.options.infos[1].title" :data="props.options.infos[1].data"
                tips1="type" tips2="holdings">
            </colChart>
        </div>
        <div class="showorders" v-if="props.options.type == 'whale-tracking2' || props.options.type == 'whale-tracking'"
            key="tracking2">
            <barChart :data="props.options.infos[0].data" class="lineChart"></barChart>
        </div>
        <div class="showorders" v-if="props.options.type == 'social-trends'" key="social-trends">
            <lineChart :data="props.options.infos[0].data" class="lineChart"></lineChart>
        </div>
        <div class="showorders" v-if="props.options.type.includes('risk-analysis')" key="risk-analysis">
            <riskChart :data="props.options.infos[0].data" class="riskChart"></riskChart>
        </div>
        <div v-if="props.options.type.includes('trade-spot')" class="details" key="details">
            <div class="detail_item" v-for="item in Object.keys(props.options.infos[0].data)" :key="item">
                <div class="detail_item_left">{{ item }}</div>
                <div class="detail_item_right">{{ props.options.infos[0].data[item] }}</div>
            </div>
        </div>
        <div class="bottom" v-if="props.options.bottomTitle">
            <div class="bottom_title">{{ props.options.bottomTitle }}</div>
            <div v-for="item in props.options.infos[0].textData" :key="item" class="item_box">
                <div class="circle"></div>
                <div class="info">{{ item }}</div>
            </div>
        </div>
        <div class="tableBox" v-if="props.options.tableTitle">
            <div class="tableBox_title">{{ props.options.tableTitle }}</div>
            <div class="table_items">
                <div class="table_head">
                    <div v-for="i in props.options.headData" :key="i" class="item_content">{{ i }}</div>
                </div>
                <div class="table_item" v-for="(item,index) in props.options.infos[props.options.infos.length - 1].data"
                    :key="index">
                    <div class="item_content" v-if="item.name">{{ item.name }}</div>
                    <div class="item_content" v-if="item.followers">{{ item.followers }}</div>
                    <div class="item_content" v-if="item.sentiment">{{ item.sentiment }}</div>
                    <div class="item_content" v-if="item.paid">{{ item.paid ? '是' : '否' }}</div>
                    <div class="item_content" v-if="item.month">{{ item.month }}</div>
                    <div class="item_content" v-if="item.action">{{ item.action }}</div>
                    <div class="item_content" v-if="item.amount">{{ item.amount }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import rowChart from './rowChart.vue';
import colChart from './colChart.vue';
import barChart from './barChart.vue';
import lineChart from './lineChart.vue';
import riskChart from './riskChart.vue';

import { defineProps } from 'vue';
//***引入
const props = defineProps({
    options: {
        type: Object,
        required: true,

    },
})
console.log('propspropsprops', props.options)
</script>

<style lang="scss" scoped>
div {
    box-sizing: border-box;
}

.echartsBox {
    background-color: #2A2A2A !important;
    border-radius: 16px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    .title {
        width: 100%;
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 23px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-bottom: 2px;
    }

    .description {
        width: 100%;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #B0BEC5;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }

    .details {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        margin-top: 12px;
        padding: 0 8px;
        margin-bottom: 12px;

        .detail_item {
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #383838;
            color: #fff;
            justify-content: space-between;
            font-family: PingFang SC, PingFang SC;
            font-size: 14px;
            color: #FFFFFF;
            text-align: left;
            font-style: normal;
            text-transform: none;
        }
    }

    .showorders {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        // padding: 12px 0;

        .rowChart {
            height: 100%;
            width: 50%;
            margin-right: 10%;
        }

        .colChart {
            width: 40%;
            height: 100%;
        }

        .lineChart {
            width: 100%;
            height: 100%;
        }

        .barChart {
            width: 100%;
            height: 100%;
        }

        .riskChart {
            width: 100%;
            height: 100%;
        }
    }

    .bottom {
        width: 100%;
        background-color: #1b1b1b;
        height: 160px;
        border-radius: 16px 16px 16px 16px;
        padding-top: 15px;
        padding-left: 20px;
        padding-right: 20PX;
        box-sizing: border-box;

        .bottom_title {
            font-family: PingFang SC, PingFang SC;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 19px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-bottom: 16px;

        }

        .item_box {
            width: 100%;
            display: flex;
            align-items: center;
            height: 20px;
            margin-bottom: 16px;


            .circle {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #D0E800;
                margin-right: 8px;
            }

            .info {
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 14px;
                color: #FFFFFF;
                line-height: 16px;
                text-align: left;
                font-style: normal;
                text-transform: none;
            }
        }
    }

    .tableBox {
        width: 100%;
        box-sizing: border-box;

        .tableBox_title {
            font-family: PingFang SC, PingFang SC;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 19px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-bottom: 12px;
        }

        .table_items {
            background-color: #1b1b1b;
            width: 100%;
            border-radius: 8px;

            .table_head {
                width: 100%;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 14px;
                color: #999999;
                line-height: 18px;
                text-align: left;
                font-style: normal;
                text-transform: none;
                display: flex;
                justify-content: space-around;
                height: 36px;
                line-height: 36px;
                border-bottom: 1px solid #242424;
                padding: 0 4px;

                .item_content {
                    text-align: left;
                    min-width: 100px;
                }
            }

            .table_item {
                width: 100%;
                font-family: PingFang SC, PingFang SC;
                font-weight: 500;
                font-size: 14px;
                color: #fff;
                line-height: 18px;
                text-align: left;
                font-style: normal;
                text-transform: none;
                display: flex;
                justify-content: space-around;
                height: 36px;
                line-height: 36px;
                border-bottom: 1px solid #242424;
                padding: 0 4px;


                .item_content {
                    text-align: left;
                    min-width: 100px;
                }
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .showorders {
        display: flex;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
    }

    .showorders .rowChart {
        width: 100% !important;
    }

    .showorders .colChart {
        width: 100% !important;
    }

    .bottom {
        padding: 10px 12px !important;
    }

    .table_items .table_head {
        height: 24px !important;
        line-height: 24px !important;
    }

    .table_head .item_content {
        min-width: 70px !important;
    }

    .table_items .table_item {
        height: 24px !important;
        line-height: 24px !important;
    }

    .table_items .table_item .item_content{
        min-width: 70px !important;
    }

    .detail_item {
        height: 30px !important;
        line-height: 30px !important;
    }

    .details {
        margin-top: 24px !important;
    }

    .item_content {
        font-size: 12px !important;
    }

    // .info {
    //     font-size: 14px !important;

    // }
}

// ::v-deep .van-popup {
//   background-color: #2a2a2a !important;
// }</style>