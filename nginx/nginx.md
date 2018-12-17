# 安装之后，可以查看nginx的默认安装目录
whereis nginx

# 以下是Nginx的默认路径：
(1) Nginx配置路径：/etc/nginx/
(2) PID目录：/var/run/nginx.pid
(3) 错误日志：/var/log/nginx/error.log
(4) 访问日志：/var/log/nginx/access.log
(5) 默认站点目录：/usr/share/nginx/html

其他路径均可在/etc/nginx/nginx.conf 以及/etc/nginx/conf.d/default.conf 中查询到

# 设置自动启动
systemctl enable nginx

# 启动nginx
systemctl start nginx

# nginx 服务器命令
启动nginx：service nginx start
访问（nginx默认是80端口）：curl 127.0.0.1
nginx配置文件目录：nginx -t
重启nginx：service nginx restart
停用nginx：service nginx stop