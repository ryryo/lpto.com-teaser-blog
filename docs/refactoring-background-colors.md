# セクション背景色のリファクタリング

## 概要

現在、各セクションの背景色は各SCSSファイル内で直接定義されています。これはセクションの順番が変わったときに背景色の調整が困難になる問題があります。このドキュメントでは、セクション背景色を共通クラスで管理する方法について説明します。

## 実装方法

1. `layout/_sections.scss` に背景色クラスを定義しました：
   - `.section-bg-white` - 白背景
   - `.section-bg-light` - 薄いグレー背景
   - `.section-bg-dark` - 暗い背景
   - `.section-bg-primary` - プライマリカラー背景
   - `.section-bg-gradient` - グラデーション背景（濃いめのプライマリカラー）
   - `.section-bg-gradient-soft` - 柔らかいグラデーション背景（プライマリとセカンダリの薄い色）
   - `.section-bg-gradient-primary` - プライマリカラーのグラデーション
   - `.section-bg-gradient-secondary` - セカンダリカラーのグラデーション
   - `.section-bg-gradient-accent` - アクセントカラーのグラデーション

2. 各セクションのHTMLに適切な背景色クラスを追加します：
   ```html
   <section id="example" class="example section-bg-light">
     ...
   </section>
   ```

3. 各セクションのSCSSファイルから背景色の指定を削除します：
   ```scss
   .example {
     padding: 2rem 0;
     // background-color: var(--bg-light); は削除
     ...
   }
   ```

## メリット

1. セクションの順番を変更しても、背景色のコントラストは自動的に維持されます
2. HTMLクラスを変更するだけで背景色を簡単に切り替えられます
3. 背景色の定義が一箇所に集約され、管理が容易になります

## 例

例えば、白と薄いグレーの背景を交互に配置したい場合は以下のようにします：

```html
<section class="section1 section-bg-white">...</section>
<section class="section2 section-bg-light">...</section>
<section class="section3 section-bg-white">...</section>
<section class="section4 section-bg-light">...</section>
```

グラデーション背景を使用する場合：

```html
<section class="section1 section-bg-gradient-soft">...</section>
<section class="section2 section-bg-white">...</section>
<section class="section3 section-bg-gradient-primary">...</section>
```

このようにすれば、セクションの順番を変更してもHTMLのクラスを変更するだけで背景色のパターンを維持できます。

## 実装結果

すべてのセクションについて、以下の対応を完了しました：

1. 各セクションのSCSSファイルから背景色の指定を削除
   - `_overview.scss`, `_testimonials.scss`, `_service-cards.scss`, `_tabbed-charts.scss`, `_faq.scss`, 
   - `_achievement-stats.scss`, `_timeline.scss`, `_before-after.scss`, `_comparison-table.scss`, `_contact-form.scss`, `_showcase.scss` など

2. 各セクションのHTMLに適切な背景色クラスを追加
   - 白背景と薄いグレー背景を交互に配置
   - タイムラインセクションは暗い背景（`section-bg-dark`）を使用
   - ショーケースセクションは柔らかいグラデーション背景（`section-bg-gradient-soft`）を使用

これにより、セクション背景色の管理が容易になりました。今後セクションの順番が変わっても、背景色クラスを変更するだけで適切なコントラストを維持できます。

## 今後の管理方法

新しいセクションを追加する場合や既存のセクションの順番を変更する場合は、以下のルールに従ってください：

1. 新しいセクションを追加する場合は、SCSSファイルに背景色を指定せず、HTMLの`class`属性に適切な背景色クラスを追加する
2. セクションの順番を変更する場合は、白背景と薄いグレー背景が交互になるようにHTMLの背景色クラスを調整する
3. 特別な背景色が必要な場合は、必要に応じて`section-bg-dark`、`section-bg-primary`、`section-bg-gradient`などのクラスを使用する
4. グラデーション背景が必要な場合は、用途に合わせて以下のクラスを選択する：
   - `.section-bg-gradient-soft` - 柔らかい印象を与えたいセクション
   - `.section-bg-gradient-primary` - 強調したいセクション
   - `.section-bg-gradient-secondary` - セカンダリカラーを前面に出したいセクション
   - `.section-bg-gradient-accent` - アクセントが必要なセクション 