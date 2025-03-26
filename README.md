# lpto.com

このリポジトリは、lpto.comのティザーサイトのソースコードを管理するためのものです。

## 開発環境

- Node.js
- Vite

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

開発サーバーが起動したら、`http://localhost:5173` でアクセスできます。

## 利用可能なコマンド

- `npm run dev` - 開発サーバーを起動（ホットリロード対応）
- `npm run build` - 本番用ビルドを生成
- `npm run preview` - ビルドしたファイルをプレビュー

## デプロイ設定

このプロジェクトはGitHub Actionsを使用して、masterブランチへのプッシュ時に自動的にFTPデプロイを行います。
設定ファイル: .github/workflows/deploy.yml

### 必要な設定

GitHubリポジトリの Settings > Secrets and variables > Actions > Secrets で以下のシークレットを設定する必要があります：

- `FTP_SERVER`: FTPサーバーのホスト名
- `FTP_USERNAME`: FTPアカウントのユーザー名
- `FTP_PASSWORD`: FTPアカウントのパスワード

これらの設定が完了すると、masterブランチにプッシュするたびに自動的にビルドとデプロイが実行されます。

## プロジェクト構成

```
lpto.com/
├── css/           # スタイルシートディレクトリ
├── js/            # JavaScriptディレクトリ
├── index.html     # メインのHTMLファイル
├── package.json   # プロジェクト設定
└── README.md      # このファイル
```
