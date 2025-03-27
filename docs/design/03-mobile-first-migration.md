# モバイルファーストへの移行計画

## 概要

現在のコードベースはPCファーストで実装されていますが、`_screens.scss`セクションだけがモバイルファーストで実装されています。本設計書では、すべてのセクションをモバイルファーストのアプローチに統一するための移行計画を示します。

## 現状の問題点

1. 大部分のセクションが`@include respond-to`ミックスインを使用しており、このミックスインはPCファーストの`max-width`メディアクエリを使用している
2. `_screens.scss`は直接`@media (min-width: 992px)`を使用してモバイルファーストを実現している
3. 一部のセクション（例えば`main_old.scss`のフッター部分）ではモバイルファーストの`min-width`を直接使用している箇所もある

## 移行計画

### 1. ミックスインの修正

`scss/utils/_mixins.scss`ファイルの`respond-to`ミックスインを修正し、`max-width`から`min-width`に変更します。

```scss
// 修正前
@mixin respond-to($breakpoint) {
  @if $breakpoint == sm {
    @media (max-width: $breakpoint-sm) { @content; }
  } @else if $breakpoint == md {
    @media (max-width: $breakpoint-md) { @content; }
  } @else if $breakpoint == lg {
    @media (max-width: $breakpoint-lg) { @content; }
  } @else if $breakpoint == xl {
    @media (max-width: $breakpoint-xl) { @content; }
  }
}

// 修正後
@mixin respond-to($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: $breakpoint-sm) { @content; }
  } @else if $breakpoint == md {
    @media (min-width: $breakpoint-md) { @content; }
  } @else if $breakpoint == lg {
    @media (min-width: $breakpoint-lg) { @content; }
  } @else if $breakpoint == xl {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}
```

### 2. 各セクションファイルの修正

すべてのセクションファイルを下記のアプローチで修正します：

#### PCファーストからモバイルファーストへの変換手順

1. **基本スタイルの見直し**：
   - スタイル定義をモバイル向けの基本スタイルに変更
   - 大きなフォントサイズ、余白、要素サイズを小さく調整

2. **メディアクエリの論理を反転**：
   - `@include respond-to(xx)` で定義されていたPCサイズ用のスタイルをベースのスタイルに移動
   - 代わりに`@include respond-to(xx)`でタブレット・デスクトップサイズのスタイルを記述

3. **レイアウト構造の修正**：
   - Flexboxのディレクションを`column`から開始し、大きな画面では`row`に変更
   - Gridレイアウトは小さな画面で1列、大きな画面で複数列になるように変更

### 3. 修正が必要なファイル一覧

#### レイアウト系
- `scss/layout/_header.scss`
- `scss/layout/_footer.scss`

#### セクション系
- `scss/sections/_hero.scss`
- `scss/sections/_service1.scss`
- `scss/sections/_service2.scss`
- `scss/sections/_features.scss`
- `scss/sections/_performance-graphs.scss`
- `scss/sections/_pricing.scss`
- `scss/sections/_operation.scss`
- `scss/sections/_cases.scss`
- `scss/sections/_faq.scss`
- `scss/sections/_contact.scss`
- `scss/sections/_history.scss`
- `scss/sections/_developer.scss`

### 4. その他の修正

- `scss/base/_typography.scss`のメディアクエリを修正
- `scss/main.scss`の共通セクションスタイルやコンテナの修正

## 移行手順と優先順位

1. まず`_mixins.scss`の`respond-to`ミックスインを修正
2. 複数ページで使われる共通コンポーネント（ヘッダー、フッター、タイポグラフィなど）を修正
3. 各セクションを一つずつ修正

## リスクと対策

1. **全体のレイアウト崩れ**
   - リスク：一括変更によりレイアウトが大きく崩れる可能性がある
   - 対策：セクションごとに修正して動作確認を行う

2. **ブレークポイントの扱い**
   - リスク：PCファーストとモバイルファーストでブレークポイントの意味が逆転するため、混乱が生じる可能性
   - 対策：コメントで明示的に各ブレークポイントの意味を記載する（例：`sm: 576px以上の画面`）

3. **デザインの整合性**
   - リスク：レイアウト変更により意図しないデザインの不整合が生じる可能性
   - 対策：各修正後にモバイル・タブレット・PCの各サイズで表示確認を行う

## 検証方法

1. 各ブレークポイント（576px, 768px, 992px, 1200px）でのレイアウト確認
2. 主要ブラウザ（Chrome, Firefox, Safari, Edge）での表示確認
3. 実機デバイス（スマートフォン、タブレット）での表示確認
