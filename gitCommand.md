### git学习笔记
---

###目录
- [Linux命令](#linux命令)
- [Git相关问题](#git相关问题)
- [Git与时间简史](#git与时间简史)
- [Git-SVN的区别](#git-svn的区别)

---    

#### linux命令
1. ***pwd:*** 查看当前目录
2. ***ls:*** 查看当前路径下的文件
3. ***ll(ls -al):*** 查看当前文件夹中的文件详情（绿色-快捷方式，白色-文件，蓝色-文件夹）
4. ***cd:*** 切换目录
5. ***mkdir 目录名:*** 在当前路径下创建文件夹

#### Git相关问题
1. Git 与GitHub有什么区别？
```
Git是一种协议，Github/碼云是具体的代码仓库，是众多的服务端中的一个。
```
2. 如何学好git
```
 1）保持好奇
 2）学会提问
 3）了解背景
```
3. Git是什么？
```
Git是一个版本控制工具
```
4. 为什么要用Git
```
 版本管理
 1）查看每一个版本都提交了什么
 2）版本回退
 3）多人协作
```
5. Git怎么用？
>![git](./src/img/git.png)

    Git两个半阶段的提交-->add->commit->push  
 `add`：创建文件之后要Git add  
 `commit`：每一写完一段功能或者当天收工要git commit  
 `push`：每天结束push  
 `pull`：每次 push 之前要 pull

6. Git命令
- 新建代码库  
`git init`： 在当前目录新建一个Git代码库  
`git init [project-name]`： 新建一个目录，将其初始化为Git代码库  
`git clone [url]`： 下载一个项目和它的整个代码历史
- 配置  
`git config --list`：显示当前的Git配置  
`git config -e [--global]`：编辑Git配置文件  
`git config [--global] user.name "[name]"`：设置提交代码时的用户名  
`git config [--global] user.email "[email address]"`：设置提交代码时的用户邮箱  
- 增加/删除文件  
`git add [file1] [file2] ...`：添加指定文件到 ***暂存区***  
`git add [dir]`：添加指定目录到 ***暂存区***，包括子目录  
`git add .`：添加当前目录的所有文件到 ***暂存区***  
`git add -p`：添加每个变化前，都会要求确认 | 对于同一个文件的多处变化，可以实现分次提交  
`git rm [file1] [file2] ...`：删除工作区文件，并且将这次删除放入暂存区  
`git rm --cached [file]`：停止追踪指定文件，但该文件会保留在工作区  
`git mv [file-original] [file-renamed]`： 改名文件，并且将这个改名放入暂存区  
- 代码提交  
`git commit -m [message]`：提交暂存区到仓库区  
`git commit [file1] [file2] ... -m [message]`：提交暂存区的指定文件到仓库区  
`git commit -a`：提交工作区自上次commit之后的变化，直接到仓库区  
`git commit -v`： 提交时显示所有diff信息  
`git commit --amend -m [message]`： 使用一次新的commit，替代上一次提交 | 如果代码没有任何新变化，则用来改写上一次commit的提交信息  
`git commit --amend [file1] [file2] ...`： 重做上一次commit，并包括指定文件的新变化  
- 分支  
`git branch`：列出所有本地分支  
`git branch -r`：出所有远程分支  
`git branch -a`：列出所有本地分支和远程分支  
`git branch [branch-name]`：新建一个分支，但依然停留在当前分支  
`git checkout -b [branch]`：新建一个分支，并切换到该分支  
`git branch [branch] [commit]`：新建一个分支，指向指定commit  
`git branch --track [branch] [remote-branch]`：新建一个分支，与指定的远程分支建立追踪关系  
`git checkout [branch-name]`：切换到指定分支，并更新工作区  
`git checkout -`：切换到上一个分支  
`git branch --set-upstream [branch] [remote-branch]`：建立追踪关系，在现有分支与指定的远程分支之间  
`git merge [branch]`：合并指定分支到当前分支  
`git cherry-pick [commit]`：选择一个commit，合并进当前分支  
`git branch -d [branch-name]`：删除分支  
`git push origin --delete [branch-name]` ` git branch -dr [remote/branch]`：删除远程分支  
- 查看信息  
`git status`：显示有变更的文件  
` git log`：显示当前分支的版本历史  
`git log --stat`：显示commit历史，以及每次commit发生变更的文件  
`git log -S [keyword]`：搜索提交历史，根据关键词  
- 远程同步  
`git fetch [remote]`：下载远程仓库的所有变动  
`git remote -v`：显示所有远程仓库  
`git remote show [remote]`：显示某个远程仓库的信息  
`git remote add [shortname] [url]`：增加一个新的远程仓库，并命名  
`git pull [remote] [branch]`：取回远程仓库的变化，并与本地分支合并  
`git push [remote] [branch]`：上传本地指定分支到远程仓库  
`git push [remote] --force`：强行推送当前分支到远程仓库，即使有冲突  
`git push [remote] --all`：推送所有分支到远程仓库  
`git push origin local_branch:remote_branch `：推送分支（origin为远程仓库名，local_branch必须为你本地存在的分支，remote_branch为远程分支，如果remote_branch不存在则会自动创建分支；类似，git push origin :remote_branch，local_branch 留空的话则是删除远程remote_branch分支。）

#### Git与时间简史
```
1）代码在某台机器上,某个路径下,有某个文件,其中某一行（状态）（三维空间）  
2）不同的时间点状态是不一样的（四维时空）
3）不同f分支（branch）(五维时空)--本地仓库（小宇宙）
4）不同的人有不同的本地仓库,构成了平行宇宙（六维时空）
```
#### Git-SVN的区别
```
Git是六维的，SVN是五维的；SVN没有小宇宙，是集成式存储；
```
