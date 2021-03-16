/*
 * @Description: README
 * @Autor: lijinpeng
 * @Date: 2021-03-03 15:47:52
 * @LastEditors: lijinpeng
 */
var a = 1;
var obj = {
    a:2,
    b:function(){
      console.log(this)
      function fun(){
        console.log(this)
        return this.a;
      }
      console.log(fun());
    }
};
obj.b();//1