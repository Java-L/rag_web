# Dify 多智能体聊天应用 / Dify Multi-Agent Chat Application

这是一个基于Dify平台API的多智能体聊天应用，支持多种角色和多语言切换功能。

This is a multi-agent chat application based on Dify platform API, supporting multiple roles and multi-language switching.

## 功能特点 / Features

- 支持英语、汉语、泰语三种语言界面 / Support for English, Chinese, and Thai interfaces
- 多个角色选择（销售专家、客服专员、产品专家）/ Multiple role options (Sales Expert, Customer Service, Product Expert)
- 每个角色对应独立的知识库 / Each role corresponds to an independent knowledge base
- 完全依赖Dify平台，无需额外后端 / Fully relies on Dify platform, no additional backend needed

## 部署指南 / Deployment Guide

### 前提条件 / Prerequisites

1. Dify平台账号 / Dify platform account
2. 为每个角色创建对应的Dify应用和知识库 / Create corresponding Dify applications and knowledge bases for each role
3. GitHub账号 / GitHub account
4. Vercel账号 / Vercel account

### 获取Dify配置 / Get Dify Configuration

1. 在Dify平台创建应用 / Create applications in Dify platform
2. 记录每个应用的APP ID和API Key / Record the APP ID and API Key for each application
3. 记录Dify API的URL / Record the URL of Dify API

### 部署步骤 / Deployment Steps

1. Fork本项目到您的GitHub / Fork this project to your GitHub
2. 在Vercel中导入该项目 / Import the project in Vercel
3. 配置以下环境变量 / Configure the following environment variables:
   - `NEXT_PUBLIC_API_URL`: Dify API的URL / URL of Dify API
   - `NEXT_PUBLIC_SALES_APP_ID`: 销售角色的APP ID / APP ID for Sales role
   - `NEXT_PUBLIC_SALES_APP_KEY`: 销售角色的API Key / API Key for Sales role
   - `NEXT_PUBLIC_CUSTOMER_SERVICE_APP_ID`: 客服角色的APP ID / APP ID for Customer Service role
   - `NEXT_PUBLIC_CUSTOMER_SERVICE_APP_KEY`: 客服角色的API Key / API Key for Customer Service role
   - `NEXT_PUBLIC_PRODUCT_APP_ID`: 产品角色的APP ID / APP ID for Product role
   - `NEXT_PUBLIC_PRODUCT_APP_KEY`: 产品角色的API Key / API Key for Product role
4. 点击部署 / Click Deploy
5. 部署完成后，您可以访问生成的URL使用应用 / After deployment, you can access the generated URL to use the application

## 本地开发 / Local Development

```bash
# 安装依赖 / Install dependencies
npm install

# 启动开发服务器 / Start development server
npm run dev

# 构建生产版本 / Build production version
npm run build

# 启动生产服务 / Start production service
npm run start
``` 