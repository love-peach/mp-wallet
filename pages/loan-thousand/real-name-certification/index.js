// pages/loan-thousand/real-name-certification/index.js
//获取应用实例
import {
  watch,
  computed
} from "../../../utils/vuefy.js";
import initCalendar from '../../../common/calendar/index';

const app = getApp();

app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    tipText: '申请产品之前，需先通过实名认证哦！',
    cardFrontPlaceholder: '/assets/images/idcard_z.png',
    cardBehindPlaceholder: '/assets/images/idcard_f.png',
    cardFront: '',
    cardBehind: '',
    idName: '',
    idNo: '',
    signOrg: '',
    signTime: '',
    signEndTime: '',
    isShowCalendar: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == 3) {
        demo4_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#46c4f3'
        });
      } else if (i == 7) {
        demo4_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#ffb72b'
        });
      } else if (i == 12 || i == 23 || i == 24) {
        demo4_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#865fc1'
        });
      } else if (i == 21 || i == 22) {
        demo4_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#eb4986'
        });
      } else {
        demo4_days_style.push({
          month: 'current',
          day: i,
          color: 'white'
        });
      }
    }
    this.setData({
      demo4_days_style
    });
    computed(this, {
      stepTitleText() {
        const {
          cardFront,
          cardBehind
        } = this.data;
        return cardFront && cardBehind ?
          '拍摄完成' :
          !cardFront && !cardBehind ?
          '为避免您的身份信息被盗用，请拍摄身份证正反面' :
          '现在请点击示意图继续拍摄另一面'
      },
      validityPeriod() {
        return `${this.data.signTime}  ${this.data.signEndTime}`;
      },
      isFieldValided() {
        const {
          idName,
          idNo,
          signOrg
        } = this.data;
        const needValidFields = [idName, idNo, signOrg];
        return needValidFields.every(item => !!item);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const conf = {
      multi: true, // 是否开启多选,
      disablePastDay: false, // 是否禁选过去的日期
      /**
       * 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
       * 注意：若想初始化时不默认选中当天，则将该值配置为除 undefined 以外的其他非值即可，如：空字符串, 0 ,false等。
       */
      defaultDay: '2018-3-6',
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => {},
      /**
       * 当改变月份时触发
       * @param { object } current 当前年月
       * @param { object } next 切换后的年月
       */
      whenChangeMonth: (current, next) => {},
      /**
       * 日期点击事件（此事件会完全接管点击事件）
       * @param { object } currentSelect 当前点击的日期
       * @param { object } event 日期点击事件对象
       */
      onTapDay(currentSelect, event) {},
      /**
       * 日历初次渲染完成后触发事件，如设置事件标记
       */
      afterCalendarRender() {},
    }
    const calendarConf = {
      multi: true,
    }
    initCalendar(calendarConf);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户选择图片
   */
  handleSelectImage: function (event) {
    const that = this;
    const {
      cardSide
    } = event.currentTarget.dataset;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const filePath = res.tempFilePaths[0];
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
        that.handleTransToBase64(filePath, cardSide);
      }
    });
  },

  /**
   * 将本地图片 转为 base64
   */
  handleTransToBase64(filePath, cardSide) {
    const that = this;
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: (res) => {
        const base64Data = `data:image/jpeg;base64,${res.data}`;
        if (cardSide === 'cardFront') {
          that.handleUploadIdCardFront(filePath, cardSide, base64Data);
        } else if (cardSide === 'cardBehind') {
          that.handleUploadIdCardBehind(filePath, cardSide, base64Data);
        }
      }
    });
  },

  /**
   * 上传身份证 - 正面
   */
  handleUploadIdCardFront(filePath, cardSide, base64Data) {
    const that = this;
    const params = {
      img: base64Data,
      ocrType: '2',
    };
    this.api.uploadIdCardFront(params)
      .then(res => {
        wx.hideToast();
        if (res.code === '0000') {
          that.setData({
            idName: res.data.idName,
            idNo: res.data.idNo,
            [cardSide]: filePath,
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: false,
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err, 'err');
        wx.hideToast();
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) {
            console.log(res, 'res');
          }
        });
      });
  },

  /**
   * 上传身份证 - 反面
   */
  handleUploadIdCardBehind(filePath, cardSide, base64Data) {
    const that = this;
    const params = {
      img: base64Data,
      ocrType: '3',
    };
    this.api.uploadIdCardFront(params)
      .then(res => {
        wx.hideToast();
        if (res.code === '0000') {
          that.setData({
            signOrg: res.data.signOrg,
            signEndTime: res.data.signEndTime,
            signTime: res.data.signTime,
            [cardSide]: filePath,
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: false,
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err, 'err');
        wx.hideToast();
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) {
            console.log(res, 'res');
          }
        });
      });
  },

  /**
   * 输入框输入事件
   */
  handleChangeInputValue(event) {
    const {
      field
    } = event.currentTarget.dataset;
    const {
      value
    } = event.detail;
    this.setData({
      [field]: value
    });
  },

  /**
   * 选择日期
   */
  handleSelectDate(event) {
    console.log(event, '33')
    this.handleShowCalendar();
  },

  /**
   * 日期选择组件 - 显示
   */
  handleShowCalendar() {
    this.setData({
      isShowCalendar: true,
    });
  },

  /**
   * 日期选择组件 - 关闭
   */
  handleCloseCalendar() {
    this.setData({
      isShowCalendar: false,
    });
  },

  /**
   * 错误提示
   */
  handleShowFormError() {
    const {
      cardFront,
      cardBehind
    } = this.data;
    if (!cardFront) {
      wx.showToast({
        title: '请上传身份正面照片',
        icon: 'none',
        duration: 2000
      });
    } else if (!cardBehind) {
      wx.showToast({
        title: '请上传身份反面照片',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 提交信息
   */
  handleSubmit() {
    if (!this.data.isFieldValided) {
      this.handleShowFormError();
      return;
    }
    console.log(this.data, 'ss')
  },
})
