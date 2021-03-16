<!--
 * @Description: 正确使用 SourceMap
 * @Autor: lijinpeng
 * @Date: 2021-03-10 23:39:36
 * @LastEditors: lijinpeng
-->
# 什么是 Source Map
编写的源代码会经过多重处理（编译、封装、压缩等），最后形成产物代码
source-map 的基本原理是，在编译处理的过程中，
在生成产物代码的同时生成产物代码中被转换的部分与源代码中相应部分的映射关系表
就可以通过 Chrome 控制台中的"Enable Javascript source map"来实现调试时的显示与定位源代码功能
在构建速度、质量、访问方式和文件大小
在开发环境中，通常我们关注的是构建速度快，质量高，以便于提升开发效率，而不关注生成文件的大小和访问方式。
在生产环境中，通常我们更关注是否需要提供线上 source map , 生成的文件大小和访问方式是否会对页面性能造成影响等，
其次才是质量和构建速度
预设通常包含了 "eval" "cheap" "module" "inline" "hidden" "nosource" "source-map"

## Source Map 名称关键字
false：即不开启 source map 功能，其他不符合上述规则的赋值也等价于 false
eval：是指在编译器中使用 EvalDevToolModulePlugin 作为 source map 的处理插件
inline：决定是否传入插件的 filename 参数，作用是决定单独生成 source map 文件还是在行内显示，该参数在 eval- 参数存在时无效
hidden：决定传入插件 append 的赋值，作用是判断是否添加 SourceMappingURL 的注释，该参数在 eval- 参数存在时无效。
module：为 true 时传入插件的 module 为 true ，作用是为加载器（Loaders）生成 source map。
cheap：这个关键字有两处作用。首先，当 module 为 false 时，它决定插件 module 参数的最终取值，最终取值与 cheap 相反。其次，它决定插件 columns 参数的取值，作用是决定生成的 source map 中是否包含列信息，在不包含列信息的情况下，调试时只能定位到指定代码所在的行而定位不到所在的列。
nosource：nosource 决定了插件中 noSource 变量的取值，作用是决定生成的 source map 中是否包含源代码信息，不包含源码情况下只能显示调用堆栈信息。

## Source Map 处理插件
EvalDevToolModulePlugin：模块代码后添加 sourceURL=webpack:///+ 模块引用路径，
不生成 source map 内容，模块产物代码通过 eval() 封装
EvalSourceMapDevToolPlugin：生成 base64 格式的 source map 并附加在模块代码之后，
source map 后添加 sourceURL=webpack:///+ 模块引用路径，不单独生成文件，模块产物代码通过 eval() 封装
SourceMapDevToolPlugin：生成单独的 .map 文件，模块产物代码不通过 eval 封装

