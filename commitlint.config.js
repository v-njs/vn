module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新特性
        'fix', // 修复
        'docs', // 文档
        'style', // 风格
        'refactor', // 重构
        'perf', // 优化
        'test', // 测试
        'build', // 构建流程、外部依赖变更
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚
        'chore', // 对构建过程或辅助工具和库的更改
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
