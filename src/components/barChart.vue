<template>
    <div id="bar"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
console.log(props.data)
function isMobileDevice() {
    // 设定一个阈值，通常手机屏幕宽度小于或等于这个值
    const mobileWidthThreshold = 768; // 这个值可以根据需要调整
    return window.innerWidth <= mobileWidthThreshold;
}
const mobile = isMobileDevice()
const showorders = () => {
    //  基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('bar'));
    // 指定图表的配置项和数据
    let option = {
        backgroundColor: '#2a2a2a',
        grid: {
            top: mobile ? '24%' : '10%',
            left: '0%',
            right: '0%',
            bottom: mobile ? '20%' : '10%',
            containLabel: true,
        },
        legend: {
            // icon: 'circle',
            top: mobile?'8%':'2%',
            show: true,
            itemWidth: mobile ? 12 :20,
            itemHeight: mobile ? 12 :20,
            itemGap: 16,
            textStyle: {
                color: '#fff',
                fontSize: mobile ? 10 :14,
            },
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            data: props.data.map(item => item.name),
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#454545',
                    type: 'solid'
                },
            },
            // 坐标轴小标记
            axisTick: {
                show: false,
            },
            // 坐标轴文本标签
            axisLabel: {
                margin: 12,
                textStyle: {
                    color: '#FAFAFA',
                    fontSize: mobile ? 12 :16,
                },
            },
            // 分隔线
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#454545',
                    type: 'dashed'
                },
            },
            // 分隔区域
            splitArea: {
                show: false,
            },
        },
        yAxis: [{
            type: 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#454545',
                },
            },
            axisLabel: {
                margin: 12,
                textStyle: {
                    color: '#FAFAFA',
                    fontSize: mobile ? 12 :16,
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#454545',
                    type: 'dashed'
                },
            },
        }],
        series: [
            {
                name: '流入',
                type: 'bar',
                data: props.data.map(item => item.inflow),
                itemStyle: {
                    normal: {
                        borderRadius: [4, 4, 0, 0],
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#8354c3'
                            }, {
                                offset: 1,
                                color: '#ec50ef'
                            }]
                        },
                    },
                },
            },
            {
                name: '流出',
                type: 'bar',
                data: props.data.map(item => item.outflow),
                itemStyle: {
                    normal: {
                        borderRadius: [4, 4, 0, 0],
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#90c767'
                            }, {
                                offset: 1,
                                color: '#009688'
                            }]
                        },
                    },
                },
            }
        ]
    }
    option && myChart.setOption(option);
}

//*** 挂载Echarts
onMounted(() => {
    showorders()
})
</script>

<style lang="scss"></style>