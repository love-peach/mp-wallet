// components/app-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headerTitle: {
      type: String,
      value: '',
    },
    headerArrow: {
      type: Boolean,
      value: true,
    },
    isControlBackEvent: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      if (this.data.isControlBackEvent) {
        this.triggerEvent('click');
      } else {
        wx.navigateBack();
      }
    },
  }
})
