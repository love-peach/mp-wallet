// pages/cancel-credit/index.js
import {
  watch,
  computed
} from "../../utils/vuefy.js";

const app = getApp();



app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    cancelReason: [],
    selectReason: null,
    otherReason: '',
    IconSelect: '/assets/images/icon_select.png',
    IconSelectActive: '/assets/images/icon_select_active.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestReasonList();

    computed(this, {
      isSelectOtherReason() {
        return this.data.selectReason && this.data.selectReason.msgId === 'MSG004';
      },
    });
  },

  /**
   * 请求取消授信原因列表
   */
  requestReasonList() {
    this.api.getCancelCreditReasonList().then(res => {
      this.setData({
        cancelReason: res.data,
      });
    }).catch(err => {
      console.log(err);
    });
  },

  /**
   * 选择原因
   */
  handleSelectReason(event) {
    const {
      itemData
    } = event.currentTarget.dataset;
    this.setData({
      selectReason: itemData,
    });
  },

  /**
   * 选择其他原因 输入事件
   */
  handleChangeOtherReason(event) {
    this.setData({
      otherReason: event.detail.value,
    });
  },

  handleSubmit() {
    const { selectReason, otherReason } = this.data;
    console.log(selectReason, otherReason, 'selectReason, otherReason');
    // Analytins.quitCreditFeekBack({
    //   choos_cause: selectReason.msgId,
    //   fill_cause: otherReason,
    //   loan_type: this.getParam('cancelType') === 'thousand' ? '千元版' : '万元版',
    // });
    wx.navigateTo({
      url: '/pages/select-product/select-product'
    });
  },
})
