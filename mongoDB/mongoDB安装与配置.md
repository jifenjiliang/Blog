1. 运行环境
linux  xshell

2. 配置
#mongodb config file  
#mongod --dbpath /Users/lijinpeng/Documents/server/mongodb/data/db/ 
#mongod --dbpath ../data/db
#mongod --config /Users/lijinpeng/Documents/server/mongodb/etc/mongod.conf
#mongod --config ../etc/mongod.conf
#mongod -f /Users/lijinpeng/Documents/server/mongodb/etc/mongod.conf --repair
#mongod -f ../etc/mongod.conf --repair
dbpath=/Users/lijinpeng/Documents/server/mongodb/data/db/
logpath=/Users/lijinpeng/Documents/server/mongodb/mongod.log
logappend = true
bind_ip = 127.0.0.1
port = 27017
#fork = true
master = true
#auth = true

3. 连接mongoDB服务器
mongo连接服务