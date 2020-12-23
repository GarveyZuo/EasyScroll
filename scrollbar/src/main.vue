// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
<script>
import { addResizeListener, removeResizeListener } from './utils/resize-event';
import { on, off } from './utils/dom';
import scrollbarWidth from './utils/scrollbar-width';
import Bar from './bar';


export default {
  name: 'EasyScrollbar',
  components: { Bar },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    },
    barOption:{}
  },
  created:function(){
    this._data.opt = Object.assign(this._data.opt,this.barOption);

  },
  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      preScrollHeigt:0,
      opt:{
        barColor:"#959595",   //滚动条颜色
        barWidth:6,           //滚动条宽度
        railColor:"#eee",     //导轨颜色
        barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
        barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
        barOpacityMin:0.3,      //滚动条非激活状态下的透明度
        zIndex:"auto",        //滚动条z-Index
        autohidemode:true,     //自动隐藏模式
        horizrailenabled:true,//是否显示水平滚动条
      }
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },
  render(h) {
    let gutter = scrollbarWidth();
    let style = this.wrapStyle;
    let barStyle = {color:this.opt.barColor,width: this.opt.barWidth + "px",barOpacityMin:this.opt.barOpacityMin};
    let railStyle = {zIndex:this.opt.zIndex,color:this.opt.railColor,marginRight:this.opt.barMarginRight +"px",marginBottom:this.opt.barMaginBottom +"px"};
    if (gutter) {
      const gutterWith = "-" + gutter+"px";
      const gutterStyle = "margin-bottom:"+ gutterWith +";" +" margin-right:" + gutterWith;

      if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    const view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    const wrap = (
      <div
        ref="wrap"
        style={ style }
        onScroll={ this.handleScroll }
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        class={ [this.wrapClass, 'easy-scrollbar__wrap', gutter ? '' : 'easy-scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    );
    let nodes;

    if (!this.native) {
      if(this.opt.horizrailenabled == true){ //水平滚动条使能
        nodes = ([
            wrap,
          <Bar
          ref="refHBar"
          barStyle = {barStyle}
        railStyle= {railStyle}
        move={ this.moveX }
        size={ this.sizeWidth }></Bar>,
      <Bar
        ref="refVBar"
        vertical
        barStyle = {barStyle}
        railStyle= {railStyle}
        move={ this.moveY }
        size={ this.sizeHeight }></Bar>
      ]);
      }else{                    //隐藏水平滚动条
        nodes = ([
          wrap,
      <Bar
        ref="refVBar"
        vertical
        barStyle = {barStyle}
        railStyle= {railStyle}
        move={ this.moveY }
        size={ this.sizeHeight }></Bar>
      ]);
      }
    } else {      //原生的滚动条
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'easy-scrollbar__wrap'] }
          style={ style }>
          { [view] }
        </div>
      ]);
    }
    return h('div', { class: 'easy-scrollbar'}, nodes);
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap;
      if(this.preScrollHeigt !== wrap.scrollHeight){
        this.preScrollHeigt = wrap.scrollHeight;
        this.update();
      }
      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);
    },
    handleMouseEnter:function () {
      if(this.$refs.refHBar){
        this.$refs.refHBar.$el.children[0].style.opacity = 1;

      }
      if(this.$refs.refVBar){
        this.$refs.refVBar.$el.children[0].style.opacity = 1;

      }
    },
    handleMouseLeave:function () {
      if(this.$refs.refHBar){
        this.$refs.refHBar.$el.children[0].style.opacity = this.opt.barOpacityMin;

      }
      if(this.$refs.refVBar){
        this.$refs.refVBar.$el.children[0].style.opacity = this.opt.barOpacityMin;

      }

    },
    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;
      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);
      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
      if(this.$refs.refVBar){
        if(this.sizeHeight == 0){
          this.$refs.refVBar.$el.style.display = "none";
        }else{
          this.$refs.refVBar.$el.style.display = "block";
        }
      }
      if(this.$refs.refHBar){ //存在水平滚动条的情况下
        if(this.sizeWidth == 0){
          this.$refs.refHBar.$el.style.display = "none";
        }else{
          this.$refs.refHBar.$el.style.display = "block";
        }
      }
    }
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
</script>

<style>
.easy-scrollbar__wrap{
  overflow: scroll;
}
  .easy-scrollbar__wrap--hidden-default{
    overflow: scroll;
  }
  .easy-scrollbar{
    overflow: hidden;
    position: relative;
  }
.esay-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  transition: opacity .12s ease-out;
}
.esay-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 0px;
  right: 0px;
  background-color: #eee;
}
.esay-scrollbar__bar.is-vertical {
  width: 6px;
  top: 0px;
  bottom: 0px;
  background-color: #eee;
}
.easy-scrollbar__thumb {
  position: relative;
  display: block;
  width: 6px;
  height: 6px;
  cursor: pointer;
  border-radius: inherit;
  background-color: #959595;
  opacity: 1;
  transition: opacity .34s ease-out;
  -moz-transition: opacity .34s ease-out; /* Firefox 4 */
  -webkit-transition: opacity .34s ease-out; /* Safari 和 Chrome */
  -o-transition: opacity .34s ease-out; /* Opera */
}
.esay-scrollbar__bar {
  opacity: 1;
  transition: opacity .34s ease-out;
}
</style>

