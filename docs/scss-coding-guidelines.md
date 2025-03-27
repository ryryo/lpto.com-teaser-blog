# SCSSコーディング規約

本ドキュメントは、LPTOプロジェクトのSCSSコーディング規約を定めるものです。全ての開発者はこの規約に従うことで、一貫性のあるコードベースを維持します。

## プロジェクト構造

```
scss/
├── animations/     # アニメーション関連のスタイル
│   └── _keyframes.scss  # アニメーションのキーフレーム定義
├── base/           # ベーススタイル
│   ├── _global.scss     # グローバルスタイル
│   ├── _reset.scss      # リセットCSS
│   ├── _typography.scss # タイポグラフィスタイル
│   └── _variables.scss  # 変数定義
├── components/     # 再利用可能なコンポーネント
│   ├── _buttons.scss    # ボタンスタイル
│   ├── _cards.scss      # カードスタイル
│   └── _forms.scss      # フォームスタイル
├── layout/         # レイアウト関連
│   ├── _footer.scss     # フッターレイアウト
│   ├── _grid.scss       # グリッドシステム
│   ├── _header.scss     # ヘッダーレイアウト
│   └── _sections.scss   # セクションレイアウト
├── sections/       # 各セクション固有
│   ├── _hero.scss       # ヒーローセクション
│   ├── _features.scss   # 特徴セクション
│   └── etc...           # その他セクション
├── utils/          # ユーティリティ
│   ├── _mixins.scss     # ミックスイン
│   └── _utilities.scss  # ユーティリティクラス
└── main.scss       # メインのSCSSファイル
```

## 必須のコーディングルール

### 1. ファイル構成

- 新しいセクションを作成する場合は必ず`sections/`ディレクトリ内に`_セクション名.scss`ファイルを作成する
- コンポーネントスタイルは`components/`ディレクトリに配置
- レイアウト構造は`layout/`ディレクトリに配置
- 変数は全て`_variables.scss`に定義

### 2. 変数・カラー参照方法

```scss
// ❌ 非推奨
.element {
  color: #02A550;
  background-color: rgba(255, 255, 255, 0.9);
}

// ✅ 推奨
.element {
  color: var(--primary-500);
  background-color: var(--bg-white);
  opacity: 0.9;
}
```

### 3. メディアクエリの使用

```scss
// ❌ 非推奨
@media (max-width: 767px) {
  .element {
    flex-direction: column;
  }
}

// ✅ 推奨
.element {
  @include respond-to(sm) {
    flex-direction: column;
  }
}
```

ブレイクポイント一覧：
- `sm`: 576px以下
- `md`: 768px以下
- `lg`: 992px以下
- `xl`: 1200px以下

### 4. Flexboxの使用

```scss
// ❌ 非推奨
.element {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

// ✅ 推奨
.element {
  @include flex(column, space-between, center);
}
```

### 5. Gridの使用

```scss
// ❌ 非推奨
.element {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

// ✅ 推奨
.element {
  @include grid(3, 2rem);
}

// 可変幅グリッド
.element {
  @include grid-auto-fit(250px, 2rem);
}
```

### 6. ボタンの作成

```scss
// ❌ 非推奨
.custom-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background-color: #02A550;
  color: white;
}

// ✅ 推奨
.custom-button {
  @include button-base;
  background-color: var(--primary-500);
  color: var(--text-white);
}
```

### 7. セクションの基本構造

新しいセクション作成時は以下の構造に従う：

```scss
@use '../utils/mixins' as *;

.section-name {
  // セクション固有のスタイル
  
  &__content {
    // コンテンツ領域のスタイル
  }
  
  &__heading {
    // 見出しスタイル
  }
  
  // レスポンシブ対応 (必要な場合のみ)
  @include respond-to(md) {
    // タブレット用スタイル
  }
  
  @include respond-to(sm) {
    // モバイル用スタイル
  }
}
```

### 8. セクションの基本レイアウト

セクションの共通レイアウトは`_sections.scss`を使用する：

```scss
// ❌ 非推奨
.my-section {
  padding: 4rem 0;
  background-color: #f4f9f7;
  
  @media (max-width: 767px) {
    padding: 2rem 0;
  }
}

// ✅ 推奨
.my-section {
  @extend .section;
  @extend .section-light;
}
```

### 9. アニメーションの使用

```scss
// ❌ 非推奨
@keyframes my-animation {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

// ✅ 推奨
// animations/_keyframes.scsで定義済みのアニメーションを使用
.element {
  animation: fadeIn 1s ease-out forwards;
}
```

### 10. シャドウとトランジションの使用

```scss
// ❌ 非推奨
.element {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

// ✅ 推奨
.element {
  box-shadow: var(--shadow-md);
  transition: all var(--transition-speed) ease;
}
```

## セクション作成時のチェックリスト

新しいセクションを作成する前に必ず以下を確認：

1. **共通コンポーネントの再利用**
   - 既存のカードスタイル、ボタンスタイルを確認（`components/`）
   - 共通のレイアウトパターンを確認（`layout/`）

2. **変数の使用**
   - 色はすべて変数を使用（`var(--primary-500)`など）
   - スペーシングはユーティリティクラスを検討（`.mt-2`, `.gap-3`など）

3. **レスポンシブ対応**
   - 必ず`@include respond-to()`を使用
   - 直接のメディアクエリは禁止

4. **BEM記法の遵守**
   - ブロック: `.feature`
   - エレメント: `.feature__item`
   - モディファイア: `.feature--large`

## 実装例

### 既存セクションを参考にした実装例

1. `.cases`セクションの例：

```scss
@use '../utils/mixins' as *;

.cases {
  .case {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-top: 3rem;
    
    @include respond-to(sm) {
      flex-direction: column;
      gap: 2rem;
    }
    
    &--reverse {
      flex-direction: row-reverse;
      
      @include respond-to(sm) {
        flex-direction: column;
      }
    }
    
    &__data {
      flex: 1;
    }
    
    &__stats {
      display: flex;
      gap: 2rem;
      margin: 1.5rem 0;
    }
  }
}
```

上記のコードを改善すると：

```scss
@use '../utils/mixins' as *;

.cases {
  .case {
    @include flex(row, flex-start, center);
    gap: 3rem;
    margin-top: 3rem;
    
    @include respond-to(sm) {
      flex-direction: column;
      gap: 2rem;
    }
    
    &--reverse {
      flex-direction: row-reverse;
      
      @include respond-to(sm) {
        flex-direction: column;
      }
    }
    
    &__data {
      flex: 1;
    }
    
    &__stats {
      @include flex;
      gap: 2rem;
      margin: 1.5rem 0;
    }
  }
}
```

## 良くある間違いと修正例

### 1. 直接のメディアクエリ

```scss
// ❌ 間違い
.element {
  @media (max-width: 767px) {
    // スタイル
  }
}

// ✅ 修正
.element {
  @include respond-to(sm) {
    // スタイル
  }
}
```

### 2. 色の直接指定

```scss
// ❌ 間違い
.element {
  color: #02A550;
}

// ✅ 修正
.element {
  color: var(--primary-500);
}
```

### 3. Flexboxの冗長な記述

```scss
// ❌ 間違い
.element {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// ✅ 修正
.element {
  @include flex(row, space-between, center);
}
```

### 4. グリッドの冗長な記述

```scss
// ❌ 間違い
.element {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

// ✅ 修正
.element {
  @include grid-auto-fit(250px, 1rem);
}
```

コーディングガイドラインを維持することで、メンテナンス性の高いSCSSファイルを作成し、チーム全体のコーディング効率を向上させることができます。 