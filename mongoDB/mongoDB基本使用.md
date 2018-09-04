show dbs          显示mongodb中存在的数据库
use testblogdb    使用testblogdb数据库
show collections  显示testblogdb数据库中的表
db.users.insert() 插入
for(i=3;i<100;i++)db.db.users.insert({x:i}) 使用js动态插入数据
db.users.find()   查询
db.users.find().count() 查询个数
db.users.find().skip(2).limit(1).sort({name:1})  skip过滤掉几条数据  limit返回几条数据  sort按什么方式排序
db.users.update({name:"ljp"}, {name:"pjl"})  更新数据 全部替换
db.users.update({name:"ljp"}, {$set:{name:"pjl"}})  更新数据 部分替换
db.users.update({name:"ljp"}, {$set:{name:"pjl"}}, true)  更新数据  部分替换  不存在就插入新数据
db.users.update({name:"ljp"}, {$set:{name:"pjl"}}, true, true) 更新数据 部分替换 不存在就插入新数据 更新多条数据
db.users.remove({name:"ljp"})

show dbs ----已有数据库列表
show collections ---- 已有集合列表
show users ----已有用户列表
use dbname ---- 切换数据库，系统会自动延迟创建该数据库
db.account.save({'name':'test','addr':'china'}) -- 创建集合
db.account.find() -- 查看集合数据
db.dropDatabase() -- 删除数据库

db.users.getIndexes()  查询索引

db.shutdownServer() admin
kill -15