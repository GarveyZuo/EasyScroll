
<script>
import { on, off } from './utils/dom';
import { renderThumbStyle, BAR_MAP } from './util';

/* istanbul ignore next */
export default {
  name: 'Bar',

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    barStyle:Object,
    railStyle:Object
  },

  computed: {
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },
    railStyles(){
     return  this.vertical ? "background-color:" + this.railStyle.color +
       ";z-Index:" + this.railStyle.zIndex +
       ";width:" + this.barStyle.width +
       ";right:" + this.railStyle.marginRight :
       "background-color:" + this.railStyle.color +
       ";z-Index:" + this.railStyle.zIndex +
       ";height:" + this.barStyle.width +
       ";bottom:" + this.railStyle.marginBottom;
    },
    wrap() {
      return this.$parent.wrap;
    }
  },

  render(h) {
    const { size, move, bar,barStyle } = this;
    return (
      <div
        ref="railway"
        class={ ['esay-scrollbar__bar', 'is-' + bar.key] }
        style = {this.railStyles}
        onMouseenter = {this.handleRailMouseEnter}
        onMousedown={ this.clickTrackHandler } >
        <div
          ref="thumb"
          class="easy-scrollbar__thumb"
          onMousedown={ this.clickThumbHandler }
          style={ renderThumbStyle({ size, move, bar,barStyle }) }>
        </div>
      </div>
    );
  },

  methods: {
    clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
    },
    handleRailMouseEnter:function () {

      this.$refs.railway.children[0].style.opacity = 1;
    },
    clickTrackHandler(e) {
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);
      const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]);

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
      const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);

      this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
    },

    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  }
};
</script>
