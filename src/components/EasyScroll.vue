<template>
  <div style="height: 90%;" ref="root">
    <EasyScrollbar>
      <div style="width: 100%;height: 100%;">
        <img src="../assets/logo.png">
          <el-row style="padding: 16px;text-align: left;">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="安装" name="1">
                <div>运行：</div>
                <div class="code-back">npm isntall --save easyscroll</div>
                <div>使用：</div>
                <div class="code-back">import EasyScroll from 'easyscroll';</div>
                <div class="code-back">Vue.use(EasyScroll);</div>
              </el-collapse-item>
              <el-collapse-item title="简单的应用" name="2">
                <el-row style="padding:16px 16px;">
                  <el-col :span="24">
                    <EasyScrollbar>
                      <div id="wrapper" style="height: 300px;">
                        <div style="height: 500px;background-color: greenyellow;text-align: center;">
                          最简单的应用
                        </div>
                      </div>
                    </EasyScrollbar>
                  </el-col>
                </el-row>
                <el-row>代码：</el-row>
                <el-row>
                  <pre class="brush: xml;">
                    {{simpleApp}}
                  </pre>
                </el-row>
                <el-row>
                  <div>说明：</div>
                  <div>安装完easyscroll之后，在组件中直接引用EasyScrollbar组件就行，产生滚动条的内容作为EasyScroll的$slot插入到滚动条组件中，注意插入到滚动条组件中内容
                  需要一个外层的包裹，即上面代码中的#wrapper div，其内部才是真正动态的内容。</div>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="配置参数" name="3">
                <div>滚动条的主要参数：</div>
                <pre class="brush: js;">
                    {{desBarOption}}
                </pre>
                <div>使用：</div>
                <pre class="brush: js;">
                    {{desBarOptionExa}}
                </pre>
              </el-collapse-item>
              <el-collapse-item title="改变滚动条颜色尺寸" name="4">
                <el-row style="padding:16px 16px;">
                  <el-col :span="24">
                    <EasyScrollbar :barOption="colorSizeOption">
                      <div id="wrapper" style="height: 300px;">
                        <div style="height: 500px;background-color: greenyellow;text-align: center;">
                          改变颜色和尺寸
                        </div>
                      </div>
                    </EasyScrollbar>
                  </el-col>
                </el-row>
                <el-row>代码：</el-row>
                <el-row>
                  <pre class="brush: js;">
                    {{colorSizeOptionXml}}

                      参数：
                    {{colorSizeOptionDesc}}
                  </pre>
                </el-row>
                <el-row>
                  <div>说明：</div>
                  <div>安装完easyscroll之后，在组件中直接引用EasyScrollbar组件就行，产生滚动条的内容作为EasyScroll的$slot插入到滚动条组件中，注意插入到滚动条组件中内容
                    需要一个外层的包裹，即上面代码中的#wrapper div，其内部才是真正动态的内容。</div>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="内容大小可变动下效果" name="5">
                <el-button type="text" @click="dialogVisible = true">点击打开饿了么Dialog</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  size="tiny"
                 >
                  <el-row style="border-top:1px solid;border-bottom: 1px solid;">
                    <EasyScrollbar>
                      <div style="max-height: 200px;">
                        <div v-for = "item in option" :key="item.label">{{item.label}}</div>
                      </div>
                    </EasyScrollbar>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addOption">增加内容</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-row>

      </div>
      </EasyScrollbar>
  </div>

</template>
<script>
    export default {

      data(){
      return {
        activeNames:"",
        option:[{label:"EasyScroll"}],
        dialogVisible:false,
          barOption:{
            barColor:"red"
          },
        colorSizeOption:{
          barColor:"red",
          barWidth:10
        }
        }
      },
      computed:{
        simpleApp(){
          return "<el-row style=\"padding:16px 16px;\">\n" +
            "                      <el-col :span=\"24\">\n" +
            "                        <EasyScrollbar>\n" +
            "                          <div  id=\"wrapper\" style=\"height: 300px;\">\n" +
            "                            <div style=\"height: 500px;background-color: greenyellow;text-align: center;\">\n" +
            "                              最简单的应用\n" +
            "                            </div>\n" +
            "                          </div>\n" +
            "                        </EasyScrollbar>\n" +
            "                      </el-col>\n" +
            "                    </el-row>"
        },
        desBarOption(){
          return " opt:{\n" +
            "        barColor:\"#959595\",   //滚动条颜色\n" +
            "        barWidth:6,           //滚动条宽度\n" +
            "        railColor:\"#eee\",     //导轨颜色\n" +
            "        barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）\n" +
            "        barMaginBottom:0,     //水平滚动条距离底部距离单位（px)\n" +
            "        barOpacityMin:0.3,      //滚动条非激活状态下的透明度\n" +
            "        zIndex:\"auto\",        //滚动条z-Index\n" +
            "        autohidemode:true,     //自动隐藏模式\n" +
            "        horizrailenabled:true,//是否显示水平滚动条\n" +
            "      }"
        },
        desBarOptionExa(){
          return "<EasyScrollbar :barOption=\"myBarOption\">\n" +
            "                     <div>\n" +
            "                       <div>\n" +
            "                         内容\n" +
            "                       </div>\n" +
            "                     </div>\n" +
            "                  </EasyScrollbar>\n" +
            "                  <script>\n" +
            "                     data{\n" +
            "                       return{\n" +
            "                         data(){\n" +
            "                           myBarOption:{\n" +
            "                             barColor:\"red\"\n" +
            "                           }\n" +
            "                         }\n" +
            "                       }\n" +
            "                     }\n" +
            "                  <\/script>"
        },
        colorSizeOptionDesc(){
          return "colorSizeOption:{\n" +
            "          barColor:\"red\",\n" +
            "          barWidth:10\n" +
            "        }"
        },
        colorSizeOptionXml(){
          return " <el-row style=\"padding:16px 16px;\">\n" +
            "                  <el-col :span=\"24\">\n" +
            "                    <EasyScrollbar :barOption=\"colorSizeOption\">\n" +
            "                      <div id=\"wrapper\" style=\"height: 300px;\">\n" +
            "                        <div style=\"height: 500px;background-color: greenyellow;text-align: center;\">\n" +
            "                          改变颜色和尺寸\n" +
            "                        </div>\n" +
            "                      </div>\n" +
            "                    </EasyScrollbar>\n" +
            "                  </el-col>\n" +
            "                </el-row>"
        }
      },
      mounted:function () {
        var bodyHei = document.documentElement.clientHeight;
        this.$refs.root.style.height = bodyHei;
      },
      methods:{
        addOption:function () {
          this._data.option.push({label:"EasyScroll"});
          this._data.option.push({label:"EasyScroll"});
          this._data.option.push({label:"EasyScroll"});
          this._data.option.push({label:"EasyScroll"});
          this._data.option.push({label:"EasyScroll"});
        }
      }
    }
</script>
<style>

  *{
    padding: 0px;
    margin: 0px;
  }
  .code-back{
    background-color: #e4e4e4;
  }
</style>
