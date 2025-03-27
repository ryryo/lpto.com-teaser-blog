# セクション名変更計画

## 概要

現在のコードベースには、内容に基づいたセクション名が使用されています。このドキュメントでは、HTMLをテンプレートとして再利用しやすくするために、各セクションの機能に基づいた命名規則への移行計画を示します。これにより、コンテンツが変わっても、構造や機能は維持される汎用的なテンプレートになります。

## 現状のセクション構成

HTMLファイルから抽出した現在のセクション構造は以下の通りです:

1. `hero` - ヒーローセクション（ビデオ背景付きの大見出し）
2. `service1` - サービス概要（テキストとリスト）
3. `features` - サービスの特徴（画像とカード）
4. `operation` - 運用代行（テキストとカード）
5. `cases` - 事例と実績（データ表示）
6. `performance-graphs` - 実績データのグラフ表示
7. `faq` - よくある質問（アコーディオン）
8. `pricing` - 料金プラン（カード）
9. `service2` - サービス詳細（ビデオ背景付き）
10. `screens` - 画面表示（画像と説明）
11. `history` - 歴史（タイムライン）
12. `developer` - 開発者情報（プロフィールと説明）
13. `contact` - お問い合わせ（フォーム）

## 変更計画

以下の新しいセクション名は、セクションの機能や構造に基づいています：

| 現在のセクション名 | 新しいセクション名 | 理由 |
|------------------|-------------------|------|
| `hero` | `hero` | 一般的な用語で、機能をよく表しているため変更不要 |
| `service1` | `overview` | より汎用的な「概要」セクションを表す |
| `features` | `feature-cards` | カード形式での特徴紹介という機能を表す |
| `operation` | `service-cards` | サービスのカード表示という機能を表す |
| `cases` | `case-studies` | 事例研究・実績という機能を表す |
| `performance-graphs` | `tabbed-charts` | タブ切り替え式グラフという機能を表す |
| `faq` | `faq` | 一般的な用語で機能をよく表しているため変更不要 |
| `pricing` | `pricing` | 一般的な用語で機能をよく表しているため変更不要 |
| `service2` | `video-section` | ビデオ背景付きコンテンツという機能を表す |
| `screens` | `showcase` | 製品やサービスの画面を紹介するショーケース機能を表す |
| `history` | `timeline` | 時系列表示という機能を表す |
| `developer` | `team-profile` | チームまたは個人のプロフィール表示という機能を表す |
| `contact` | `contact` | 一般的な用語で機能をよく表しているため変更不要 |

## 実装手順

1. SCSSファイル名の変更
   - `scss/sections/_service1.scss` → `scss/sections/_overview.scss`
   - `scss/sections/_features.scss` → `scss/sections/_feature-cards.scss`
   - `scss/sections/_operation.scss` → `scss/sections/_service-cards.scss`
   - `scss/sections/_cases.scss` → `scss/sections/_case-studies.scss`
   - `scss/sections/_performance-graphs.scss` → `scss/sections/_tabbed-charts.scss`
   - `scss/sections/_service2.scss` → `scss/sections/_video-section.scss`
   - `scss/sections/_screens.scss` → `scss/sections/_showcase.scss`
   - `scss/sections/_history.scss` → `scss/sections/_timeline.scss`
   - `scss/sections/_developer.scss` → `scss/sections/_team-profile.scss`

2. HTMLのセクションID変更
   - `id="service1"` → `id="overview"`
   - `id="features"` → `id="feature-cards"`
   - `id="operation"` → `id="service-cards"`
   - `id="cases"` → `id="case-studies"`
   - (performance-graphsにはIDがない)
   - `id="service2"` → `id="video-section"`
   - `id="screens"` → `id="showcase"`
   - `id="history"` → `id="timeline"`
   - `id="developer"` → `id="team-profile"`

3. HTMLのセクションクラス変更
   - `class="service1"` → `class="overview"`
   - `class="features"` → `class="feature-cards"`
   - `class="operation"` → `class="service-cards"`
   - `class="cases"` → `class="case-studies"`
   - `class="performance-graphs"` → `class="tabbed-charts"`
   - `class="service2"` → `class="video-section"`
   - `class="screens"` → `class="showcase"`
   - `class="history"` → `class="timeline"`
   - `class="developer"` → `class="team-profile"`

4. SCSSのセレクタ変更
   - 各SCSSファイル内のセレクタを新しい名前に合わせて変更
   - 例: `.service1` → `.overview`, `.service1__content` → `.overview__content`

5. マークアップパターンの確保
   - 各セクションのHTMLマークアップパターンを文書化して再利用できるようにする

## SCSSインポート変更

`scss/main.scss`内のインポート文も変更が必要です:

```scss
// 変更前
@import "sections/hero";
@import "sections/service1";
@import "sections/features";
@import "sections/operation";
@import "sections/cases";
@import "sections/performance-graphs";
@import "sections/faq";
@import "sections/pricing";
@import "sections/service2";
@import "sections/screens";
@import "sections/history";
@import "sections/developer";
@import "sections/contact";

// 変更後
@import "sections/hero";
@import "sections/overview";
@import "sections/feature-cards";
@import "sections/service-cards";
@import "sections/case-studies";
@import "sections/tabbed-charts";
@import "sections/faq";
@import "sections/pricing";
@import "sections/video-section";
@import "sections/showcase";
@import "sections/timeline";
@import "sections/team-profile";
@import "sections/contact";
```

## ナビゲーションリンクの更新

ヘッダーのナビゲーションリンクも更新が必要です:

```html
<!-- 変更前 -->
<li><a href="#service1">サービス概要</a></li>
<li><a href="#features">特徴</a></li>
<li><a href="#operation">運用代行</a></li>
<li><a href="#cases">実績</a></li>

<!-- 変更後 -->
<li><a href="#overview">サービス概要</a></li>
<li><a href="#feature-cards">特徴</a></li>
<li><a href="#service-cards">運用代行</a></li>
<li><a href="#case-studies">実績</a></li>
```

## リスクと対策

1. **CSSの競合**
   - リスク：新しいクラス名が既存の別のCSSと競合する可能性
   - 対策：全てのセレクタを確認し、BEM命名規則を徹底する

2. **JavaScriptセレクタ**
   - リスク：JavaScriptでセレクタを使用している場合、機能が動作しなくなる可能性
   - 対策：全てのJSファイルでクラス名やIDの参照を確認し更新する

3. **既存のブックマーク**
   - リスク：古いアンカーへのブックマークが動作しなくなる
   - 対策：必要に応じて古いIDを残しつつ、新しいIDも追加する移行期間を設ける

## テストプラン

1. 各セクションについて、スタイルが正しく適用されていることを確認
2. レスポンシブデザインが全てのブレークポイントで正常に動作するか確認
3. JavaScriptの機能（アコーディオン、タブ切り替えなど）が正常に動作するか確認
4. 内部リンク（アンカーリンク）が正しく機能するか確認

## 実装状況

### 2024年3月27日
- SCSSファイル名の変更が完了
  - 新しいファイル命名規則でSCSSファイルを作成
  - 各SCSSファイル内のセレクタを新しい名前に更新
  - main.scssのインポート文を更新
- 古いSCSSファイルのアーカイブ
  - 以下の元ファイルを `scss/sections/del/` に移動
    - `_service1.scss`
    - `_features.scss`
    - `_operation.scss`
    - `_cases.scss`
    - `_performance-graphs.scss`
    - `_service2.scss`
    - `_screens.scss`
    - `_history.scss`
    - `_developer.scss`
- HTMLファイルの更新が完了
  - セクションIDの変更（例：`id="service1"` → `id="overview"`）
  - セクションクラスの変更（例：`class="service1"` → `class="overview"`）
  - 子要素のクラス名更新（例：`service1__content` → `overview__content`）
  - ナビゲーションリンクの更新
  - フッターリンクの更新
- JavaScriptファイルの更新が完了
  - `performance-graph.js`のセレクタ参照を更新
  - `script.js`の参照を更新

## テスト結果

以下のテストを実施し、問題なく動作することを確認しました：

1. 各セクションのスタイルが正しく適用されている
2. レスポンシブデザインが全てのブレークポイントで正常に動作
3. JavaScriptの機能（アコーディオン、タブ切り替え）が正常に動作
4. 内部リンク（ナビゲーションリンク）が正しく機能

## 次のステップ

このセクション名変更により、テンプレートとしての再利用性が向上しました。今後、このテンプレートを基にした新しいページを作成する際には、以下のポイントに留意してください：

1. セクションの機能名に基づいてHTMLとCSSを構成する
2. 必要に応じてセクションを追加・削除・組み替えできるようにする
3. コンテンツの内容を変更しつつも、構造を維持する

## まとめ

この変更により、テンプレートとしての再利用性が向上し、内容に関わらず機能的に同じパターンを簡単に適用できるようになります。また、機能に基づいた命名により、新しい開発者も構造を理解しやすくなるメリットがあります。 