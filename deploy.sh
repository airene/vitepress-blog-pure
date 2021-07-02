#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
# 进入生成的 文件夹
cd .vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push --quiet -f https://${travis_ci}@github.com/airene/airene.github.io.git master:main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 比如
# git push -f git@github.com:Tsanfer/VuePress-GithubPages-TravisCI.git master:gh-pages

cd -
