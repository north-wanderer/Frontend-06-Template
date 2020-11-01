# 学习流水账(2020.10)

### 复习 git 的基本使用

[Git - 获取 Git 仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)

[Git - 分支简介](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)

远程跟踪分支是远程分支状态的引用。

如果 `git pull` 获取到一个新的远程分支，想要使用就需要手动新建一个本地分支与之对应：

```bash
git pull origin // get new branch serverfix
git checkout -b serverfix origin/serverfix // or
git checkout --track origin/serverfix //和上条等价
```

```bash
git rebase <basebranch> <topicbranch>
```

只对尚未推送或分享给别人的本地修改执行变基操作清理历史， 从不对已推送至别处的提交执行变基操作。

在 Git 中任何 已提交 的东西几乎总是可以恢复的。

`git branch` 的 `-merged` 与 `--no-merged` 选项可以用来过滤结果，如：

查看未被合并到master的分支

```bash
git branch --no-merged master
```

分支开发工作流

- 长期分支

    设置不同稳定程度的分支，如：master-test-develop，稳定程度以此类推。进度领先的分支在代码稳定之后逐步merge。

    ![https://git-scm.com/book/en/v2/images/lr-branches-2.png](https://git-scm.com/book/en/v2/images/lr-branches-2.png)

- 主题分支

    在保持主干分支的基础上不断 checkout 短期分支来完成开发。

### JavaScript 异步编程
- callback
- Promise
- generate 模拟
- async 函数（基于Promise的语法糖）
    ```
    关键字 async await 
    单独await使用
    for await of 语法
    ```