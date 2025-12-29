# MCP Server 方案：跨项目复用设计规范

## 方案概述

创建一个独立的 MCP Server，将流畅界面等设计规范作为可查询的资源，让多个项目通过 MCP 配置复用。

## 目录结构

```
wxad-design-rules-mcp/
├── server/
│   ├── index.ts          # MCP Server 主文件
│   ├── rules/
│   │   ├── making-fluid-interfaces.mdc
│   │   ├── animation-principles.mdc
│   │   └── ...
│   └── package.json
├── README.md
└── package.json
```

## MCP Server 实现示例

```typescript
// server/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFile } from 'fs/promises';
import { join } from 'path';

const server = new Server({
  name: 'wxad-design-rules',
  version: '1.0.0',
}, {
  capabilities: {
    resources: {},
    tools: {},
  },
});

// 提供规范资源
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'wxad://rules/making-fluid-interfaces',
      name: '流畅界面规范',
      description: '制作流畅界面时遵循的原则',
      mimeType: 'text/markdown',
    },
    // ... 更多规范
  ],
}));

// 读取规范内容
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  
  if (uri.startsWith('wxad://rules/')) {
    const ruleName = uri.replace('wxad://rules/', '');
    const filePath = join(__dirname, 'rules', `${ruleName}.mdc`);
    const content = await readFile(filePath, 'utf-8');
    
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: content,
      }],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('WXAD Design Rules MCP Server running on stdio');
}

main();
```

## Cursor 配置

在各项目的 Cursor 设置中添加 MCP Server：

```json
{
  "mcpServers": {
    "wxad-design-rules": {
      "command": "node",
      "args": ["path/to/wxad-design-rules-mcp/server/index.js"]
    }
  }
}
```

## 优势

1. **跨项目复用**：一次配置，所有项目可用
2. **集中管理**：规范更新，所有项目自动同步
3. **动态查询**：AI 可以按需查询特定规范
4. **版本控制**：规范仓库独立版本管理

## 使用方式

AI 可以直接查询：
- "查询流畅界面规范"
- "获取动画原则"
- "查看性能优化建议"
