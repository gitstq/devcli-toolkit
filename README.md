<div align="center">

# 🚀 DevCLI Toolkit

[![npm version](https://img.shields.io/npm/v/devcli-toolkit.svg)](https://www.npmjs.com/package/devcli-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

**A lightweight, all-in-one CLI toolkit for developers**

[简体中文](#简体中文) | [繁體中文](#繁體中文) | [English](#english)

</div>

---

## 简体中文

### 🎉 项目介绍

DevCLI Toolkit 是一个轻量级、多合一的命令行工具集，专为开发者设计。它整合了日常开发中最常用的工具功能，让你无需在多个零散工具之间切换，大幅提升工作效率。

**灵感来源**：在日常开发中，我们经常需要进行 JSON 格式化、Base64 编解码、时间戳转换等操作，但每个功能都需要不同的工具或网站。DevCLI Toolkit 将这些功能整合到一个统一的 CLI 中，让开发工作更加流畅。

**自研差异化亮点**：
- 🎨 彩色终端输出，提升可读性
- 📋 一键复制到剪贴板功能
- 🔌 模块化架构，易于扩展
- ⚡ 零依赖（打包后），跨平台支持

### ✨ 核心特性

| 功能 | 命令 | 描述 |
|------|------|------|
| 📋 **JSON 工具** | `devcli json` | 格式化、验证、压缩 JSON |
| 🔐 **Base64 工具** | `devcli base64` | 编解码字符串和文件 |
| ⏰ **时间戳工具** | `devcli time` | 时间戳与日期互转 |
| 🔑 **UUID 生成器** | `devcli uuid` | 生成和验证 UUID |
| 🔒 **密码工具** | `devcli pass` | 生成密码并检测强度 |
| 📱 **二维码工具** | `devcli qr` | 生成文本和 WiFi 二维码 |
| 🔍 **正则工具** | `devcli regex` | 测试正则表达式 |
| 🔗 **URL 工具** | `devcli url` | 编解码和解析 URL |

### 🚀 快速开始

#### 环境要求
- **Node.js** >= 14.0.0
- **npm** 或 **yarn**

#### 安装

```bash
# 全局安装
npm install -g devcli-toolkit

# 或使用 npx（无需安装）
npx devcli-toolkit --help
```

#### 基本使用

```bash
# 查看帮助
devcli --help

# JSON 格式化
devcli json '{"name":"test","value":123}' --format

# Base64 编码
devcli base64 "Hello World"

# 生成 UUID
devcli uuid

# 获取当前时间戳
devcli time --now
```

### 📖 详细使用指南

#### 📋 JSON 工具

```bash
# 格式化 JSON
devcli json '{"a":1,"b":2}' --format

# 验证 JSON
devcli json '{"invalid"}' --validate

# 压缩 JSON
devcli json '{"a": 1, "b": 2}' --minify

# 查看 JSON 统计信息
devcli json stats '{"key":"value"}'
```

#### 🔐 Base64 工具

```bash
# 编码字符串
devcli base64 "Hello World"

# 解码字符串
devcli base64 "SGVsbG8gV29ybGQ=" --decode

# 编码文件
devcli base64 file ./document.pdf

# URL 安全编码
devcli base64 "Hello+World" --urlsafe
```

#### ⏰ 时间戳工具

```bash
# 当前时间
devcli time --now

# 时间戳转日期
devcli time 1609459200

# 指定格式输出
devcli time --now --format utc

# 转换为 Unix 时间戳
devcli time "2024-01-01" --unix
```

#### 🔑 UUID 生成器

```bash
# 生成单个 UUID
devcli uuid

# 生成多个 UUID
devcli uuid -n 5

# 验证 UUID
devcli uuid validate "550e8400-e29b-41d4-a716-446655440000"
```

#### 🔒 密码工具

```bash
# 生成 16 位密码
devcli pass

# 生成强密码（包含所有字符类型）
devcli pass -l 20 -u -d -s

# 检查密码强度
devcli pass check "MyP@ssw0rd"
```

#### 📱 二维码工具

```bash
# 生成文本二维码
devcli qr "Hello World"

# 生成 WiFi 连接二维码
devcli qr wifi -s "MyWiFi" -p "password123"
```

#### 🔍 正则工具

```bash
# 测试正则表达式
devcli regex "\\d+" "abc123def"

# 全局搜索
devcli regex "[a-z]+" "Hello World" -g

# 查看常用正则模式
devcli regex patterns
```

#### 🔗 URL 工具

```bash
# URL 编码
devcli url "Hello World" --encode

# URL 解码
devcli url "Hello%20World" --decode

# 解析 URL
devcli url "https://example.com/path?key=value" --parse
```

### 💡 设计思路与迭代规划

#### 技术选型原因
- **Node.js**：跨平台、生态丰富、启动快速
- **Commander.js**：成熟的 CLI 框架，支持子命令
- **Chalk**：彩色终端输出，提升用户体验
- **Clipboardy**：跨平台剪贴板操作

#### 后续功能迭代计划
- [ ] 添加 JWT 编码/解码工具
- [ ] 添加 HTML/Markdown 转换工具
- [ ] 添加颜色代码转换工具（HEX/RGB/HSL）
- [ ] 添加 IP 地址查询工具
- [ ] 支持配置文件自定义

#### 社区贡献方向
欢迎提交 PR 和 Issue！我们特别需要：
- 新的工具模块
- 多语言本地化
- 测试用例补充
- 文档改进

### 📦 打包与部署指南

#### 本地构建

```bash
# 克隆仓库
git clone https://github.com/gitstq/devcli-toolkit.git
cd devcli-toolkit

# 安装依赖
npm install

# 运行测试
npm test

# 构建可执行文件
npm run build:all
```

#### 打包输出
构建完成后，`dist/` 目录将包含：
- `devcli-linux` - Linux 可执行文件
- `devcli-macos` - macOS 可执行文件
- `devcli-win.exe` - Windows 可执行文件

### 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

---

## 繁體中文

### 🎉 專案介紹

DevCLI Toolkit 是一個輕量級、多合一的命令列工具集，專為開發者設計。它整合了日常開發中最常用的工具功能，讓你無需在多個零散工具之間切換，大幅提升工作效率。

**靈感來源**：在日常開發中，我們經常需要進行 JSON 格式化、Base64 編解碼、時間戳轉換等操作，但每個功能都需要不同的工具或網站。DevCLI Toolkit 將這些功能整合到一個統一的 CLI 中，讓開發工作更加流暢。

**自研差異化亮點**：
- 🎨 彩色終端輸出，提升可讀性
- 📋 一鍵複製到剪貼簿功能
- 🔌 模組化架構，易於擴展
- ⚡ 零依賴（打包後），跨平台支援

### ✨ 核心特性

| 功能 | 命令 | 描述 |
|------|------|------|
| 📋 **JSON 工具** | `devcli json` | 格式化、驗證、壓縮 JSON |
| 🔐 **Base64 工具** | `devcli base64` | 編解碼字串和檔案 |
| ⏰ **時間戳工具** | `devcli time` | 時間戳與日期互轉 |
| 🔑 **UUID 產生器** | `devcli uuid` | 生成和驗證 UUID |
| 🔒 **密碼工具** | `devcli pass` | 生成密碼並檢測強度 |
| 📱 **QR Code 工具** | `devcli qr` | 生成文字和 WiFi 二維碼 |
| 🔍 **正規表示式工具** | `devcli regex` | 測試正規表示式 |
| 🔗 **URL 工具** | `devcli url` | 編解碼和解析 URL |

### 🚀 快速開始

#### 環境要求
- **Node.js** >= 14.0.0
- **npm** 或 **yarn**

#### 安裝

```bash
# 全域安裝
npm install -g devcli-toolkit

# 或使用 npx（無需安裝）
npx devcli-toolkit --help
```

#### 基本使用

```bash
# 查看說明
devcli --help

# JSON 格式化
devcli json '{"name":"test","value":123}' --format

# Base64 編碼
devcli base64 "Hello World"

# 生成 UUID
devcli uuid

# 取得目前時間戳
devcli time --now
```

### 📖 詳細使用指南

#### 📋 JSON 工具

```bash
# 格式化 JSON
devcli json '{"a":1,"b":2}' --format

# 驗證 JSON
devcli json '{"invalid"}' --validate

# 壓縮 JSON
devcli json '{"a": 1, "b": 2}' --minify

# 查看 JSON 統計資訊
devcli json stats '{"key":"value"}'
```

#### 🔐 Base64 工具

```bash
# 編碼字串
devcli base64 "Hello World"

# 解碼字串
devcli base64 "SGVsbG8gV29ybGQ=" --decode

# 編碼檔案
devcli base64 file ./document.pdf

# URL 安全編碼
devcli base64 "Hello+World" --urlsafe
```

#### ⏰ 時間戳工具

```bash
# 目前時間
devcli time --now

# 時間戳轉日期
devcli time 1609459200

# 指定格式輸出
devcli time --now --format utc

# 轉換為 Unix 時間戳
devcli time "2024-01-01" --unix
```

#### 🔑 UUID 產生器

```bash
# 生成單個 UUID
devcli uuid

# 生成多個 UUID
devcli uuid -n 5

# 驗證 UUID
devcli uuid validate "550e8400-e29b-41d4-a716-446655440000"
```

#### 🔒 密碼工具

```bash
# 生成 16 位密碼
devcli pass

# 生成強密碼（包含所有字元類型）
devcli pass -l 20 -u -d -s

# 檢查密碼強度
devcli pass check "MyP@ssw0rd"
```

#### 📱 QR Code 工具

```bash
# 生成文字 QR Code
devcli qr "Hello World"

# 生成 WiFi 連接 QR Code
devcli qr wifi -s "MyWiFi" -p "password123"
```

#### 🔍 正規表示式工具

```bash
# 測試正規表示式
devcli regex "\\d+" "abc123def"

# 全域搜尋
devcli regex "[a-z]+" "Hello World" -g

# 查看常用正規表示式模式
devcli regex patterns
```

#### 🔗 URL 工具

```bash
# URL 編碼
devcli url "Hello World" --encode

# URL 解碼
devcli url "Hello%20World" --decode

# 解析 URL
devcli url "https://example.com/path?key=value" --parse
```

### 💡 設計思路與迭代規劃

#### 技術選型原因
- **Node.js**：跨平台、生態豐富、啟動快速
- **Commander.js**：成熟的 CLI 框架，支援子命令
- **Chalk**：彩色終端輸出，提升使用者體驗
- **Clipboardy**：跨平台剪貼簿操作

#### 後續功能迭代計劃
- [ ] 新增 JWT 編碼/解碼工具
- [ ] 新增 HTML/Markdown 轉換工具
- [ ] 新增顏色代碼轉換工具（HEX/RGB/HSL）
- [ ] 新增 IP 位址查詢工具
- [ ] 支援設定檔自訂

#### 社群貢獻方向
歡迎提交 PR 和 Issue！我們特別需要：
- 新的工具模組
- 多語言在地化
- 測試案例補充
- 文件改進

### 📦 打包與部署指南

#### 本地構建

```bash
# 克隆倉庫
git clone https://github.com/gitstq/devcli-toolkit.git
cd devcli-toolkit

# 安裝依賴
npm install

# 執行測試
npm test

# 構建可執行檔案
npm run build:all
```

#### 打包輸出
構建完成後，`dist/` 目錄將包含：
- `devcli-linux` - Linux 可執行檔案
- `devcli-macos` - macOS 可執行檔案
- `devcli-win.exe` - Windows 可執行檔案

### 🤝 貢獻指南

1. Fork 本倉庫
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 建立 Pull Request

### 📄 開源協議

本專案採用 [MIT](LICENSE) 協議開源。

---

## English

### 🎉 Project Introduction

DevCLI Toolkit is a lightweight, all-in-one command-line toolkit designed for developers. It integrates the most commonly used tools in daily development, eliminating the need to switch between multiple scattered tools and significantly improving work efficiency.

**Inspiration**: In daily development, we often need to format JSON, encode/decode Base64, convert timestamps, etc., but each function requires different tools or websites. DevCLI Toolkit integrates these functions into a unified CLI, making development work smoother.

**Self-developed Differentiation Highlights**:
- 🎨 Colorful terminal output for better readability
- 📋 One-click copy to clipboard functionality
- 🔌 Modular architecture for easy extension
- ⚡ Zero dependencies (after packaging), cross-platform support

### ✨ Core Features

| Feature | Command | Description |
|---------|---------|-------------|
| 📋 **JSON Tools** | `devcli json` | Format, validate, minify JSON |
| 🔐 **Base64 Tools** | `devcli base64` | Encode/decode strings and files |
| ⏰ **Timestamp Tools** | `devcli time` | Convert between timestamps and dates |
| 🔑 **UUID Generator** | `devcli uuid` | Generate and validate UUIDs |
| 🔒 **Password Tools** | `devcli pass` | Generate passwords and check strength |
| 📱 **QR Code Tools** | `devcli qr` | Generate text and WiFi QR codes |
| 🔍 **Regex Tools** | `devcli regex` | Test regular expressions |
| 🔗 **URL Tools** | `devcli url` | Encode/decode and parse URLs |

### 🚀 Quick Start

#### Requirements
- **Node.js** >= 14.0.0
- **npm** or **yarn**

#### Installation

```bash
# Global installation
npm install -g devcli-toolkit

# Or use npx (no installation required)
npx devcli-toolkit --help
```

#### Basic Usage

```bash
# View help
devcli --help

# Format JSON
devcli json '{"name":"test","value":123}' --format

# Base64 encode
devcli base64 "Hello World"

# Generate UUID
devcli uuid

# Get current timestamp
devcli time --now
```

### 📖 Detailed Usage Guide

#### 📋 JSON Tools

```bash
# Format JSON
devcli json '{"a":1,"b":2}' --format

# Validate JSON
devcli json '{"invalid"}' --validate

# Minify JSON
devcli json '{"a": 1, "b": 2}' --minify

# View JSON statistics
devcli json stats '{"key":"value"}'
```

#### 🔐 Base64 Tools

```bash
# Encode string
devcli base64 "Hello World"

# Decode string
devcli base64 "SGVsbG8gV29ybGQ=" --decode

# Encode file
devcli base64 file ./document.pdf

# URL-safe encoding
devcli base64 "Hello+World" --urlsafe
```

#### ⏰ Timestamp Tools

```bash
# Current time
devcli time --now

# Timestamp to date
devcli time 1609459200

# Specific format output
devcli time --now --format utc

# Convert to Unix timestamp
devcli time "2024-01-01" --unix
```

#### 🔑 UUID Generator

```bash
# Generate single UUID
devcli uuid

# Generate multiple UUIDs
devcli uuid -n 5

# Validate UUID
devcli uuid validate "550e8400-e29b-41d4-a716-446655440000"
```

#### 🔒 Password Tools

```bash
# Generate 16-character password
devcli pass

# Generate strong password (all character types)
devcli pass -l 20 -u -d -s

# Check password strength
devcli pass check "MyP@ssw0rd"
```

#### 📱 QR Code Tools

```bash
# Generate text QR code
devcli qr "Hello World"

# Generate WiFi connection QR code
devcli qr wifi -s "MyWiFi" -p "password123"
```

#### 🔍 Regex Tools

```bash
# Test regex pattern
devcli regex "\\d+" "abc123def"

# Global search
devcli regex "[a-z]+" "Hello World" -g

# View common regex patterns
devcli regex patterns
```

#### 🔗 URL Tools

```bash
# URL encode
devcli url "Hello World" --encode

# URL decode
devcli url "Hello%20World" --decode

# Parse URL
devcli url "https://example.com/path?key=value" --parse
```

### 💡 Design Philosophy & Roadmap

#### Technology Choices
- **Node.js**: Cross-platform, rich ecosystem, fast startup
- **Commander.js**: Mature CLI framework with subcommand support
- **Chalk**: Colorful terminal output for better UX
- **Clipboardy**: Cross-platform clipboard operations

#### Future Roadmap
- [ ] Add JWT encode/decode tool
- [ ] Add HTML/Markdown converter
- [ ] Add color code converter (HEX/RGB/HSL)
- [ ] Add IP address lookup tool
- [ ] Support configuration file customization

#### Community Contributions
PRs and Issues are welcome! We especially need:
- New tool modules
- Multi-language localization
- Test case supplements
- Documentation improvements

### 📦 Build & Deployment Guide

#### Local Build

```bash
# Clone repository
git clone https://github.com/gitstq/devcli-toolkit.git
cd devcli-toolkit

# Install dependencies
npm install

# Run tests
npm test

# Build executables
npm run build:all
```

#### Build Output
After building, the `dist/` directory will contain:
- `devcli-linux` - Linux executable
- `devcli-macos` - macOS executable
- `devcli-win.exe` - Windows executable

### 🤝 Contributing Guidelines

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### 📄 License

This project is open-sourced under the [MIT](LICENSE) License.

---

<div align="center">

**Made with ❤️ for developers**

[Report Bug](https://github.com/gitstq/devcli-toolkit/issues) · [Request Feature](https://github.com/gitstq/devcli-toolkit/issues)

</div>
