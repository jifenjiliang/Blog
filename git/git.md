git 命令：

# 初始化工厂
git init 

# 添加要commit的文件到本地仓库
git add .

# 提交加注释
git commit -m “第一次提交” 

# 删除远程 Git 仓库
git remote rm origin    

# 添加远程 Git 仓库
git remote add origin https://github.com/jifenjiliang/Blog.git

# 从远程 Git 仓库拉取
git pull

git pull origin master --allow-unrelated-histories

# 查看状态
git status

# 提交到远程 Git 仓库
git push -u origin master

# 在控制台打印出当前仓库的所有标签
git tag

# 搜索符合模式的标签
git tag -l ‘v0.1.*’ 

# 创建附注标签
git tag -a v1.0.0 -m “1.0.0版本”

# 切换到标签
git checkout [tagname]

# 用git show命令可以查看标签的版本信息
git show v1.0.0

# 删除标签
git tag -d v1.0.0

# 通常的git push不会将标签对象提交到git服务器，我们需要进行显式的操作：
# 将v1.0.0标签提交到git服务器
git push origin v1.0.0
# 将本地所有标签一次性提交到git服务器
git push origin –tags

# 要新建并切换到该分支
git checkout -b iss53

# 切换分支
git checkout master

# 所有分支的清单
git branch

# 各个分支最后一个提交对象的信息
git branch -v

# 哪些分支已被并入当前分支
git branch --merged

# 执行删除分支操作：
git branch -d hotfix