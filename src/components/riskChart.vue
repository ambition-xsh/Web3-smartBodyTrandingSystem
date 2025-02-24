<template>
    <div id="risk"></div>
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
    let myChart = echarts.init(document.getElementById('risk'));
    // 指定图表的配置项和数据
    let option = {
        backgroundColor: '#2a2a2a',
        legend: {
            // icon: 'circle',
            top: '10%',
            show: true,
            itemWidth: mobile ? 12 :24,
            itemHeight: mobile ? 12 :24,
            itemGap: 16,
            textStyle: {
                color: '#fff',
                fontSize: mobile ? 12 :16,
            },
        },
        tooltip: {
            show: true,
            confine: true,
        },
        grid: {
            left: mobile?'28%':'15%',
            right: '10%',
            bottom: '10%',
            top: '20%',
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
            data: props.data.map(item=>item.name),
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
                name: '风险评估',
                type: 'bar',
                zlevel: 2,
                barWidth: 14,
                barBorderRadius: 30,
                itemStyle: {
                    normal: {
                        barBorderRadius: [0,12,12,0],
                        // label: {
                        //     show: true,
                        //     position: 'right',
                        //     color: '#fff',
                        //     fontFamily: 'Bebas',
                        // },
                        color: '#90c868',
                    },
                },
                data: props.data.map(item=>item.score),
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