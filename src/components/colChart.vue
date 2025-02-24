<template>
    <div id="showorders2"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';
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
console.log('cococococoococococ', props)
function isMobileDevice() {
  // 设定一个阈值，通常手机屏幕宽度小于或等于这个值
  const mobileWidthThreshold = 768; // 这个值可以根据需要调整
  return window.innerWidth <= mobileWidthThreshold;
}
const mobile = isMobileDevice()
const showorders = () => {
    //  基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('showorders2'));
    // 指定图表的配置项和数据
    let option = {
        backgroundColor: '#2a2a2a',
        title: {
            text: props.title,
            subtext: '',
            x: mobile?'46px':'60px',
            y: mobile?'10px':'20px',

            textStyle: {
                fontSize: mobile ? 12 :16,
                // fontWeight: 'bolder',
                color: '#fff'          // 主标题文字颜色
            },
            subtextStyle: {
                color: ''          // 副标题文字颜色
            }
        },
        grid: {
            left: mobile? '20%':'15%',
            right: mobile?'6%':'10%',
            bottom: mobile?'20%':'10%',
            top: mobile?'24%':'20%',
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            data: props.data.map(item => item[props.tips1]),
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
                type: 'bar',
                barWidth: mobile?10:20,
                data: props.data.map(item => item[props.tips2]),
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#91c867'
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