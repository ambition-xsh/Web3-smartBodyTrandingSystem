<template>
    <div id="showorders"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';
import { defineProps } from 'vue';
function isMobileDevice() {
  // 设定一个阈值，通常手机屏幕宽度小于或等于这个值
  const mobileWidthThreshold = 768; // 这个值可以根据需要调整
  return window.innerWidth <= mobileWidthThreshold;
}
const mobile = isMobileDevice()
//***引入
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        required: true
    },
    tips1: {
        type: String
    },
    tips2: {
        type: String
    }
})
console.log('rororroororororororo', props)
const showorders = () => {
    //  基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('showorders'));
    // 指定图表的配置项和数据
    let option = {
        backgroundColor: '#2a2a2a',
        title: {
            text: props.title,
            subtext: '',
            x: mobile?'68px':'80px',
            y: mobile ? '10px' :'20px',

            textStyle: {
                fontSize: mobile ? 12 :16,
                // fontWeight: 'bolder',
                color: '#fff'          // 主标题文字颜色
            },
            subtextStyle: {
                color: ''          // 副标题文字颜色
            }
        },
        tooltip: {
            show: true,
            confine: true,
        },
        grid: {
            left: mobile ?'28%':'16%',
            right: mobile?'2%':'10%',
            bottom: mobile?'20%':'10%',
            top: mobile?'20%':'20%',
        },
        xAxis: {
            show: true,
            type: 'value',
            name: '',
            // 坐标轴线
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
        yAxis: {
            data: props.data.map(item => item[props.tips1]),
            axisLine: {
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
        },
        series: [
            {
                name: '',
                type: 'bar',
                zlevel: 2,
                // barWidth: 14,
                barWidth:mobile ? 16 : 40,

                itemStyle: {

                    normal: {
                        barBorderRadius: [0, 12, 12, 0],
                        barWidth:mobile ? 16 : 40,
                        // label: {
                        //     show: true,
                        //     position: 'right',
                        //     color: '#fff',
                        //     fontFamily: 'Bebas',
                        // },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#e950ed', //  0%  处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#9862f0', //  100%  处的颜色
                                },
                            ],
                            global: false, //  缺省为  false
                        },
                    },
                },
                data: props.data.map(item => item[props.tips2]),
            },
        ],
    };
    option && myChart.setOption(option);
}

//*** 挂载Echarts
onMounted(() => {
    showorders()
})
</script>

<style lang="scss"></style>