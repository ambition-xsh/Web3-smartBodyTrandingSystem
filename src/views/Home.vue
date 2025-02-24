<template>
  <div class="home">
    <div class="home_top" @click="handleSlider">
      <div class="home_top_btn">WEB3智能体交易系统({{ groupMembers.length }})</div>
      <div class="home_top_tips">
        <img src="../assets/images/20.png" alt="" class="top_img">
      </div>
    </div>
    <div class="home_center">
      <div class="center_chatbox" v-for="msg in displayedMessages" :key="msg.id"
        :style="{ flexDirection: msg.sender !== '用户' ? 'row' : 'row-reverse' }">
        <div class="user_box"
          :style="{ marginRight: msg.sender == '用户' ? '0' : '0.36rem', marginLeft: msg.sender == '用户' ? '0.08rem' : '0' }">
          <div class="circle">
            <!-- agentConfig[msg.sender?.avatar] -->
            <img :src="agentConfig[msg.sender]?.avatar" alt="" class="circle_img">
          </div>
        </div>
        <div class="main_box">
          <div class="time_box">
            <div class="sender">{{ msg.sender }}</div>
            <div class="time">{{ formatTime(msg.time) }}</div>
          </div>
          <div class="info_box"
            :style="{ backgroundColor: msg.sender == '用户' ? '#d0e800' : '#2f2e2e', color: msg.sender == '用户' ? '#000' : '#fff', borderRadius: msg.sender == '用户' ? 'border-radius: .3rem 0 .3rem .3rem' : '0 .3rem .3rem .3rem' }">
            <div class="info_box_content" v-html="msg.content"></div>
            <div v-if="messageSupplements[msg.id]" class="info_box_link"
              @click="handleLink(messageSupplements[msg.id][0])">
              <img src="../assets/images/16.png" alt="" style="margin-right: 0.10rem;" class="info_box_link_img">{{
                messageSupplements[msg.id][0].text
              }}
            </div>
          </div>
        </div>

      </div>
      <div ref="scrollableBox"></div>
    </div>
    <div class="home_bottom">
      <van-field v-model="inputMessage" label="" @focus="borderColor = '#D0E800'" @blur="borderColor = '#000'"
        placeholder="请输入消息..." class="myInput" :style="{ border: `${borderColor} solid 1px` }" :autofocus="true"/>
      <div class="home_bottom_btn" @click="handleSendMessage" style="background-color: #d0e800;">
        <img src="../assets/images/17.png" alt="" class="bottom_img">
      </div>
      <!-- <div class="home_bottom_btn" v-if="!isPlaying" @click="handlePlaying">
        <img src="../assets/images/18.png" alt="" class="bottom_img">
      </div>
      <div class="home_bottom_btn" v-else @click="isPlaying = !isPlaying">
        <img src="../assets/images/19.png" alt="" class="bottom_img">
      </div> -->
    </div>
  </div>
  <van-popup v-model:show="show" v-if="show" key="show" position="right" :style="{ width: '34%', height: '100%' }"
     >
    <div class="dialog_content">
      <div class="dialog_content_title">
        <div>群成员({{ groupMembers.length }})</div>
        <div @click="handleClosePop">×</div>
      </div>
      <div class="dialog_content_manager">
        <div class="dialog_title">管理员</div>
        <div class="dialog_item">
          <div class="circle">
            <img src="../assets/images/1.png" alt="" class="dialog_item_img">
          </div>
          <div class="sender">用户</div>
        </div>
      </div>
      <div class="dialog_content_mans">
        <div class="dialog_title">成员</div>
        <div class="dialog_item_box">
          <div class="dialog_item" v-for="item in imagesList" :key="item">
            <div class="circle">
              <img :src="agentConfig[item].avatar" alt="" class="dialog_item_img">
            </div>
            <div class="sender">{{ item.slice(0, 2) }}..</div>
          </div>
        </div>
      </div>
      <div class="dialog_content_btn">添加群员</div>
    </div>
  </van-popup>
  <van-popup v-model:show="echartsShow" key="echartsShow" v-if="echartsShow" :style="{ width: '80%', height: '82%' }"
    round class="echartsPopup" :closeable="true">
    <DialogContent :options="options"></DialogContent>
  </van-popup>
</template>

<script setup>
import { watch, ref, nextTick } from 'vue'
import DialogContent from '../components/DialogContent.vue'
console.log(window.innerWidth)
const show = ref(false)
const echartsShow = ref(false)
const isPlaying = ref(false)
const displayedMessages = ref([])
const currentIndex = ref(0)
const nextUserMessageId = ref(100)
const scrollableBox = ref(null)
// const options = ref({})
const detailedWhaleAnalysis = {
  addressAgeDistribution: [
    { range: ">2年", count: 3 },
    { range: "1-2年", count: 5 },
    { range: "6月-1年", count: 2 },
    { range: "<6月", count: 0 }
  ],
  whaleTypes: [
    { type: "机构投资者", addresses: 2, holdings: 520 },
    { type: "长期持有者", addresses: 5, holdings: 380 },
    { type: "活跃交易者", addresses: 3, holdings: 150 }
  ],
  tradingHistory: [
    { month: "2024/09", action: "累积", amount: "+500K" },
    { month: "2024/10", action: "累积", amount: "+800K" },
    { month: "2024/11", action: "持有", amount: "0" },
    { month: "2024/12", action: "累积", amount: "+1.2M" },
    { month: "2025/01", action: "持有", amount: "0" },
    { month: "2025/02", action: "累积", amount: "+700K" }
  ]
};

const dialogType = ref('')
const borderColor = ref('#000')
const inputMessage = ref('各位好，我想买个这周最可能暴涨的币，帮我看看？')
// const handlePlaying = () => {
//   if (inputMessage.value == '' && displayedMessages.value.length == 0) return
//   isPlaying.value = !isPlaying.value
// }
const socialTrendData = [
  { name: '2/10', mentions: 120, sentiment: 75 },
  { name: '2/11', mentions: 150, sentiment: 78 },
  { name: '2/12', mentions: 220, sentiment: 82 },
  { name: '2/13', mentions: 280, sentiment: 85 },
  { name: '2/14', mentions: 350, sentiment: 88 },
  { name: '2/15', mentions: 420, sentiment: 92 },
  { name: '2/16', mentions: 480, sentiment: 95 },
];
const whaleActivityData = [
  { name: '2/10', inflow: 1500, outflow: 800 },
  { name: '2/11', inflow: 1800, outflow: 900 },
  { name: '2/12', inflow: 2000, outflow: 1100 },
  { name: '2/13', inflow: 3200, outflow: 1300 },
  { name: '2/14', inflow: 3800, outflow: 1200 },
  { name: '2/15', inflow: 4500, outflow: 1400 },
  { name: '2/16', inflow: 5200, outflow: 1500 },
];

const riskMetricsData = [
  { name: '市场风险', score: 7.5 },
  { name: '流动性风险', score: 8.2 },
  { name: '技术风险', score: 9.1 },
  { name: '监管风险', score: 8.8 },
  { name: '竞争风险', score: 7.9 },
];

// Mock trades data
const tradeDetails = {
  spot: {
    orderId: "SP123456789",
    type: "LIMIT",
    side: "BUY",
    price: 1.85,
    amount: 50000,
    total: "92,500 USDT",
    status: "FILLED",
    time: "2025-02-17 10:15:23"
  },
  futures: {
    orderId: "FT987654321",
    type: "LIMIT",
    side: "SELL",
    leverage: "2x",
    price: 1.87,
    amount: 5000,
    margin: "4,675 USDT",
    status: "FILLED",
    time: "2025-02-17 10:15:45"
  }
};

// Supplementary content for different types of reports
// Mock data for detailed analysis
const detailedSocialAnalysis = {
  botAnalysis: [
    { type: "真实用户", percentage: 92 },
    { type: "机器人账号", percentage: 8 }
  ],
  contentTypes: [
    { type: "技术讨论", count: 458 },
    { type: "应用场景", count: 385 },
    { type: "价格讨论", count: 234 },
    { type: "新闻转发", count: 156 }
  ],
  kols: [
    { name: "KOL_1", followers: "125K", sentiment: "看好", paid: true },
    { name: "KOL_2", followers: "89K", sentiment: "看好", paid: true },
    { name: "KOL_3", followers: "234K", sentiment: "中性", paid: true },
    { name: "KOL_4", followers: "56K", sentiment: "看好", paid: true }
  ]
};

const options = ref({})

// Report contents for different stages
const reportContents = {
  "social-trends": {
    title: "社交媒体热度分析报告",
    description: "24小时社交媒体提及度和情绪分析",
    bottomTitle: '关键发现',
    infos: [{
      data: socialTrendData,
      textData: ['社交媒体提及量持续上升，24小时增长300%', '情绪指数保持在较高水平，显示市场普遍看好', '主要KOL观点积极，未发现明显负面声音']
    }],
  },
  "social-trends-detailed": {
    title: "社交媒体深度分析报告",
    description: "社交讨论质量与用户分析",
    tableTitle: 'KOL分析',
    headData: ['KOL', '粉丝数', '观点倾向', '是否推广'],
    infos: [{
      title: '用户构成分析',
      data: detailedSocialAnalysis.botAnalysis
    },
    {
      title: '讨论内容分类',
      data: detailedSocialAnalysis.contentTypes
    },
    {
      title: 'KOL分析',
      data: detailedSocialAnalysis.kols
    },
    ],
  },
  "whale-tracking": {
    title: "巨鲸地址监控报告",
    description: "大额地址活动分析",
    bottomTitle: '重要地址活动',
    infos: [
      {
        data: whaleActivityData,
        textData: ['Top 10巨鲸地址持续累积', '机构地址保持净买入状态', '无大额地址异常抛售']
      }
    ],
  },
  "whale-tracking-detailed": {
    title: "巨鲸行为深度分析报告",
    description: "巨鲸地址特征与历史行为分析",
    tableTitle: '历史交易行为',
    headData: ['KOL', '行为', '数量变化'],
    infos: [
      {
        title: '地址年龄分布',
        data: detailedWhaleAnalysis.addressAgeDistribution
      },
      {
        title: '持有者类型分析',
        data: detailedWhaleAnalysis.whaleTypes
      },
      {
        title: '历史交易行为',
        data: detailedWhaleAnalysis.tradingHistory
      },
    ],
  },
  // ... 其他报告内容保持不变 ...
  "whale-tracking2": {
    title: "巨鲸钱包监控报告",
    description: "大额地址活动分析",
    bottomTitle: '重要地址活动',
    infos: [
      {
        data: whaleActivityData,
        textData: ['Top 10巨鲸地址持续累积', '机构地址保持净买入状态', '无大额地址异常抛售']
      }
    ],
  },
  "risk-analysis": {
    title: "风险评估报告",
    description: "多维度风险评估分析",
    bottomTitle: '风险提示',
    infos: [{
      data: riskMetricsData,
      textData: ['技术风险：代码审计完善，安全性高', '市场风险：短期波动可能较大', '监管风险：目前无明显监管压力']
    }],
  },
  "trade-spot": {
    title: "现货交易详情",
    description: "现货订单执行情况",
    bottomTitle: '执行评估',
    infos: [
      {
        data: tradeDetails.spot,
        textData: ['订单完全成交，无滑点', '成交价格优于市场价0.5%', '交易费用在预期范围内']
      }
    ],
  }
};

// Message supplementary info config with message ID mappings
const messageSupplements = {
  6: [ // 资讯收集员A 的第一次详细报告
    {
      text: "查看社交媒体热度分析报告",
      type: "social-trends"
    }
  ],
  7: [ // 资讯收集员B 的链上数据报告
    {
      text: "查看巨鲸地址分析报告",
      type: "whale-tracking"
    }
  ],
  13: [ // 资讯收集员A 的补充调查结果
    {
      text: "查看社交媒体深度分析报告",
      type: "social-trends-detailed"
    }
  ],
  14: [ // 资讯收集员B 的巨鲸地址分析
    {
      text: "查看巨鲸行为详细报告",
      type: "whale-tracking-detailed"
    }
  ],
  17: [ // 风险分析员的风险提示
    {
      text: "查看风险评估报告",
      type: "risk-analysis"
    }
  ],
  27: [ // 交易执行员A 的执行报告
    {
      text: "查看现货交易详情",
      type: "trade-spot"
    }
  ],
  28: [ // 交易执行员B 的执行报告
    {
      text: "查看合约交易详情",
      type: "trade-futures"
    }
  ]
}

// Helper function to format time
const formatTime = (date) => {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Base time for the demo
const baseTime = new Date('2025-02-17T10:00:00');

// Agent configuration with avatars and colors
const agentConfig = {
  "用户": {
    avatar: require('../assets/images/1.png'),
    color: "bg-blue-500"
  },
  "资讯收集员A": {
    avatar: require('../assets/images/2.png'),
    color: "bg-green-100"
  },
  "资讯收集员B": {
    avatar: require('../assets/images/3.png'),
    color: "bg-green-100"
  },
  "资讯收集员C": {
    avatar: require('../assets/images/4.png'),
    color: "bg-green-100"
  },
  "风险分析员": {
    avatar: require('../assets/images/5.png'),
    color: "bg-yellow-100"
  },
  "趋势分析员": {
    avatar: require('../assets/images/6.png'),
    color: "bg-purple-100"
  },
  "项目分析员": {
    avatar: require('../assets/images/7.png'),
    color: "bg-blue-100"
  },
  "法律分析员": {
    avatar: require('../assets/images/8.png'),
    color: "bg-gray-100"
  },
  "KOL监控员A": {
    avatar: require('../assets/images/9.png'),
    color: "bg-pink-100"
  },
  "社交媒体管理员": {
    avatar: require('../assets/images/10.png'),
    color: "bg-indigo-100"
  },
  "交易策略分析员": {
    avatar: require('../assets/images/11.png'),
    color: "bg-red-100"
  },
  "成本分析员": {
    avatar: require('../assets/images/12.png'),
    color: "bg-yellow-100"
  },
  "资金分析员": {
    avatar: require('../assets/images/13.png'),
    color: "bg-green-100"
  },
  "交易执行员A": {
    avatar: require('../assets/images/14.png'),
    color: "bg-blue-100"
  },
  "交易执行员B": {
    avatar: require('../assets/images/15.png'),
    color: "bg-blue-100"
  }
}

const imagesList = Object.keys(agentConfig)

// Generate message times
const messages = ref([
  {
    id: 1,
    sender: "用户",
    content: "各位好，我想买个这周最可能暴涨的币，帮我看看？",
    delay: 0
  },
  {
    id: 2,
    sender: "资讯收集员A",
    content: "收到！我负责收集主流媒体报道和社交媒体热度数据。",
    delay: 1000
  },
  {
    id: 3,
    sender: "资讯收集员B",
    content: "好的，我去查最近的链上数据和鲸鱼钱包动向。",
    delay: 1500
  },
  {
    id: 4,
    sender: "资讯收集员C",
    content: "我来整理近期重要项目方动态和路线图更新情况。",
    delay: 2000
  },
  {
    id: 6,
    sender: "资讯收集员A",
    content: `报告初步调查结果：<br />
1. Twitter上 $ARB 最近24小时提及量暴增300%<br />
2. Reddit和Discord多个社区都在热议 Arbitrum 即将推出的质押系统<br />
3. 主流财经媒体对Layer2赛道普遍看好<br />`,
    delay: 3500
  },
  {
    id: 7,
    sender: "资讯收集员B",
    content: `链上数据显示：<br />
1. 大额钱包对 $ARB 的累积明显<br />
2. 过去48小时内有3个千万级别的巨鲸地址增持<br />
3. 合约交互数据显示质押相关测试频繁<br />`,
    delay: 4000
  },
  {
    id: 8,
    sender: "资讯收集员C",
    content: `项目方面的情况：<br />
1. 官方推特暗示有重要更新<br />
2. GitHub活跃度本月增长50%<br />
3. 核心开发者最近频繁与机构投资者互动<br />`,
    delay: 4500
  },
  {
    id: 9,
    sender: "风险分析员",
    content: "等等，我觉得信息还不够全面。@资讯收集员A 能否详细调查一下社交媒体上的热度是否有水军操纵的迹象？@资讯收集员B 能否查一下这些巨鲸地址的历史操作记录？",
    delay: 5000
  },
  {
    id: 10,
    sender: "资讯收集员A",
    content: "好的，我立即深入分析社交媒体数据。",
    delay: 5500
  },
  {
    id: 11,
    sender: "资讯收集员B",
    content: "收到，马上追踪巨鲸地址的历史交易模式。",
    delay: 6000
  },
  {
    id: 13,
    sender: "资讯收集员A",
    content: `补充调查结果：<br />
1. 热度增长主要来自真实用户，机器人账号占比仅8%<br />
2. 多个知名KOL自发安利，未发现明显的有偿推广<br />
3. 社区讨论内容专业度高，大多围绕技术和应用场景<br />`,
    delay: 7500
  },
  {
    id: 14,
    sender: "资讯收集员B",
    content: `巨鲸地址分析：<br />
1. 这些地址平均持币时间超过1年<br />
2. 有两个地址与知名机构投资者相关<br />
3. 过往操作以长期持有为主，未见短期炒作记录<br />`,
    delay: 8000
  },
  {
    id: 15,
    sender: "趋势分析员",
    content: `我从中期趋势看，Layer2赛道确实是下一个爆发点：<br />
1. 以太坊升级后，L2将直接受益<br />
2. 机构资金持续流入<br />
3. 用户需求明显，链上数据支撑<br />`,
    delay: 8500
  },
  {
    id: 16,
    sender: "项目分析员",
    content: `从技术和基本面来看：<br />
1. Arbitrum的技术架构领先<br />
2. 生态发展最为完善<br />
3. 新功能会带来估值重估机会<br />`,
    delay: 9000
  },
  {
    id: 17,
    sender: "风险分析员",
    content: `不过我们也要提示几个风险点：<br />
1. 短期已经涨了不少<br />
2. 质押系统上线可能会有"买预期卖事实"<br />
3. 整体市场环境仍需谨慎<br />`,
    delay: 9500
  },
  {
    id: 18,
    sender: "法律分析员",
    content: `补充一点合规建议：<br />
1. 该币种主流交易所都已上架<br />
2. 未发现监管方面的风险信号<br />
3. 交易合规性没有问题<br />`,
    delay: 10000
  },
  {
    id: 19,
    sender: "KOL监控员A",
    content: "我注意到几个重要KOL最近都在暗示看好L2行情，特别是$ARB。",
    delay: 10500
  },
  {
    id: 20,
    sender: "社交媒体管理员",
    content: "社区氛围相当乐观，但理性讨论占主导，没有过度炒作现象。",
    delay: 11000
  },
  {
    id: 21,
    sender: "交易策略分析员",
    content: `根据以上信息，我建议：<br />
1. 分批建仓，首批可以考虑总资金的30%<br />
2. 设置分批加仓点位<br />
3. 严格止损，建议-8%止损<br />`,
    delay: 11500
  },
  {
    id: 22,
    sender: "成本分析员",
    content: `当前点位确实具有性价比：<br />
1. 较ATH还有3倍空间<br />
2. 较前期低点已经企稳<br />
3. 现货期货价差合理<br />`,
    delay: 12000
  },
  {
    id: 23,
    sender: "资金分析员",
    content: `建议：
1. 现货为主<br />
2. 可以配置10%的期货做对冲<br />
3. 单笔资金不超过总资产5%<br />`,
    delay: 12500
  },
  {
    id: 24,
    sender: "交易执行员A",
    content: "收到任务，我负责现货部分的建仓。",
    delay: 13000
  },
  {
    id: 25,
    sender: "交易执行员B",
    content: "我来执行期货对冲仓位。",
    delay: 13500
  },
  {
    id: 27,
    sender: "交易执行员A",
    content: `报告执行情况：<br />
1. 已完成首批30%资金的现货建仓<br />
2. 平均成本比目标价低0.5%<br />
3. 止损订单已设置<br />`,
    delay: 15000
  },
  {
    id: 28,
    sender: "交易执行员B",
    content: `期货对冲仓位已建立：<br />
1. 合约费率合理<br />
2. 资金费率为正但在可接受范围<br />
3. 已设置动态止损<br />`,
    delay: 15500
  },
  {
    id: 29,
    sender: "用户",
    content: "太感谢了！整个分析和执行过程都很专业，我对这次投资很有信心！",
    delay: 16000
  },
  {
    id: 30,
    sender: "风险分析员",
    content: "我们会持续监控市场变化，如有异常及时提醒您。记住，市场瞬息万变，一定要严格执行止损策略。",
    delay: 16500
  },
  {
    id: 31,
    sender: "资讯收集员A",
    content: "我们会保持24小时监控，如有重要消息立即汇报。",
    delay: 17000
  },
  {
    id: 32,
    sender: "交易执行员A",
    content: "建议您设置价格提醒，我已经帮您设置了几个关键点位的提醒。",
    delay: 17500
  }
].map((msg, index) => {
  const timeIncrement = index * 60000; // one minute between messages
  return {
    ...msg,
    time: new Date(baseTime.getTime() + timeIncrement)
  };
}))

// Chat members data
const groupMembers = ref([
  { id: 1, name: "用户", avatar: "👤", role: "管理员" },
  { id: 2, name: "资讯收集员A", avatar: "📰", role: "成员" },
  { id: 3, name: "资讯收集员B", avatar: "📊", role: "成员" },
  { id: 4, name: "资讯收集员C", avatar: "📈", role: "成员" },
  { id: 5, name: "风险分析员", avatar: "⚠️", role: "成员" },
  { id: 6, name: "趋势分析员", avatar: "📉", role: "成员" },
  { id: 7, name: "项目分析员", avatar: "🔍", role: "成员" },
  { id: 8, name: "法律分析员", avatar: "⚖️", role: "成员" },
  { id: 9, name: "KOL监控员A", avatar: "👥", role: "成员" },
  { id: 10, name: "社交媒体管理员", avatar: "💬", role: "成员" },
  { id: 11, name: "交易策略分析员", avatar: "🎯", role: "成员" },
  { id: 12, name: "成本分析员", avatar: "💰", role: "成员" },
  { id: 13, name: "资金分析员", avatar: "💵", role: "成员" },
  { id: 14, name: "交易执行员A", avatar: "🔄", role: "成员" },
  { id: 15, name: "交易执行员B", avatar: "📊", role: "成员" }
])

const handleSlider = () => {
  show.value = true
}

const scrollToBottom = () => {
  if (scrollableBox.value) {
    // 方法1: 使用 scrollIntoView
    nextTick(() => {
      scrollableBox.value.scrollIntoView({ behavior: 'smooth' });
    })

    // 方法2: 直接设置 scrollTop
    // scrollableBox.value.scrollTop = scrollableBox.value.scrollHeight;
  }
};

const handleClosePop = () => {
  show.value = false
}

const startDemo = () => {
  isPlaying.value = true
  displayedMessages.value = [messages.value[0]]
  currentIndex.value = 1
  inputMessage.value = ''
};
const handleSendMessage = () => {
  if (!inputMessage.value.trim()) return;

  if (!isPlaying.value && displayedMessages.value.length === 0) {
    // First message starts the demo
    startDemo();
    inputMessage.value = ''
  } else {
    // Subsequent messages just get added to the chat
    const currentTime = new Date();

    const newMessage = {
      id: nextUserMessageId.value,
      sender: "用户",
      content: inputMessage.value,
      time: currentTime,
      delay: currentTime.getTime() - baseTime.getTime() // Calculate relative delay
    };

    // Insert the message into displayedMessages at the correct time position
    const allMessages = [...displayedMessages.value];
    let insertIndex = allMessages.length;

    for (let i = 0; i < allMessages.length; i++) {
      const msgTime = new Date(baseTime.getTime() + allMessages[i].delay);
      if (currentTime < msgTime) {
        insertIndex = i;
        break;
      }
    }

    allMessages.splice(insertIndex, 0, newMessage);
    displayedMessages.value = allMessages
    console.log('displayedMessages', displayedMessages)
    nextUserMessageId.value += 1
    inputMessage.value = ''
  }
};

const handleLink = (data) => {
  options.value = {}
  dialogType.value = reportContents[data.type]
  options.value = { ...data, ...reportContents[data.type] }
  console.log('optionsoptions', options.value)
  echartsShow.value = true
}

watch([isPlaying, currentIndex], () => {
  inputMessage.value = ''
  let timeout;
  if (isPlaying.value && currentIndex.value < messages.value.length) {
    timeout = setTimeout(() => {
      displayedMessages.value = [...displayedMessages.value, messages.value[currentIndex.value]]
      currentIndex.value += 1
    }, messages.value[currentIndex.value].delay);
  }
  return () => clearTimeout(timeout);
})

watch(() => displayedMessages.value.length, () => {
  scrollToBottom()
})
</script>

<style lang="scss">
:root {
  --van-popup-background-color: #2a2a2a;
}

.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  padding: 0 0 .3rem;
  box-sizing: border-box;
  background-color: #1e1e1e;

  .home_top {
    height: 6%;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    align-items: center;
    background-color: #000000;
    color: #fff;
    padding: .2rem 0;

    .home_top_btn {
      flex: 1;
      font-weight: 600;
      font-size: 18px;
      margin-left: 48px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 20px;
      color: #FFFFFF;
      line-height: 25px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .home_top_tips {
      color: #999;
      margin-right: 40px;

      .top_img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .home_center {
    flex: 1;
    width: 100%;
    background-color: #1e1e1e;
    overflow-y: auto;
    padding: .5rem;
    box-sizing: border-box;

    .center_chatbox {
      display: flex;
      // align-items: center;
      box-sizing: border-box;
      margin-bottom: 4px;

      .main_box {
        padding: .3rem 0;
        // flex: 1;
        max-width: 11.36rem;

        .time_box {
          font-size: 12px;
          margin-bottom: .1rem;
          padding: 0 20px;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .sender {
            font-family: PingFang SC, PingFang SC;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 25px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .time {
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            font-size: 14px;
            color: #CCCCCC;
            line-height: 17px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }

        .info_box {
          background-color: #999;
          color: #fff;
          font-size: 14px;
          background-color: skyblue;
          letter-spacing: 2px;
          font-weight: 600;
          border-radius: .3rem 0 .3rem .3rem;
          margin-right: 10px;
          padding: .3rem 0;
          // max-width: 576px;


          .info_box_title {
            margin-bottom: .1rem;
            padding: 0 .2rem;
          }

          .info_box_content {
            padding: 0 20px;
            box-sizing: border-box;
          }

          .info_box_link {
            padding: 0 20px 0 16px;
            color: #D0E800;
            display: flex;
            align-items: center;
            margin-top: 4px;

            .info_box_link_img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      .user_box {
        width: 1rem !important;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.5rem;
        // margin-right: .2rem;

        .circle {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: skyblue;
          overflow: hidden;

          .circle_img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .home_bottom {
    height: 6%;
    width: 76%;
    background-color: transparent;
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .myInput {
      border-radius: .2rem;
      background-color: #000;
      // border: 1px solid #D0E800;
      color: #fff !important;

      input {
        color: #fff;
      }
    }

    .home_bottom_btn {
      padding: 10px;
      // height: 100px;
      background-color: #2f2e2e;
      border-radius: 8px;
      border: 1px solid #D0E800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;

      .bottom_img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .echartsPopup {
    background-color: #2a2a2a !important;
    background: #2a2a2a !important;
  }
}

.dialog_content {
  width: 100%;
  height: 100%;
  background-color: #1b1b1b;
  box-sizing: border-box;
  padding: 20px 20px 12px;

  .dialog_content_title {
    display: flex;
    justify-content: space-between;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 12px;
  }

  .dialog_content_manager {
    width: 100%;
    height: 140px;
    background-color: #000000;
    padding: 12px;
    border-radius: 16px;
    box-sizing: border-box;

    .dialog_title {
      font-family: PingFang SC, PingFang SC;
      font-weight: bold;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 22px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 8px;
    }

    .dialog_item {
      display: flex;
      flex-direction: column;
      width: 48px;
      height: 48px;

      .circle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        align-items: center;


        .dialog_item_img {
          width: 100%;
          height: 100%;
        }
      }

      .sender {
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 12px;
        color: #CCCCCC;
        line-height: 20px;
        font-style: normal;
        text-transform: none;
        text-align: center;
      }
    }
  }

  .dialog_content_mans {
    width: 100%;
    height: 362px;
    background-color: #000000;
    padding: 12px;
    border-radius: 16px;
    box-sizing: border-box;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .dialog_title {
      font-family: PingFang SC, PingFang SC;
      font-weight: bold;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 22px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 4px;
      height: 24px;
    }

    .dialog_item_box {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;

      .dialog_item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 24%;



        .circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-bottom: 4px;

          .dialog_item_img {
            width: 100%;
            height: 100%;
          }
        }

        .sender {
          font-family: PingFang SC, PingFang SC;
          font-weight: 500;
          font-size: 12px;
          color: #CCCCCC;
          line-height: 20px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }

  }

  .dialog_content_btn {
    background-color: #D0E800;
    border-radius: 100px 100px 100px 100px;
    margin-top: 24px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    font-size: 12px;
  }
}

::v-deep .van-field__body input {
  color: #fff;
}

@media screen and (max-width: 600px) {
  .dialog_item_box .dialog_item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50% !important;
  }

  .dialog_content_manager {
    height: 80px !important;
  }

  .dialog_item .circle {
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    margin-bottom: 2px;
  }

  .dialog_item .sender {
    display: none !important;
  }

  .dialog_content_mans {
    height: 300px !important;
  }
}

// ::v-deep .van-popup {
//   background-color: #2a2a2a !important;
//   background: #2a2a2a !important;
// }</style>
