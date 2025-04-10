# LPコンポーネント設計書（未実装コンポーネント）

## 概要
このドキュメントでは、エルピトのLPに追加すべき未実装のコンポーネントの詳細設計を記述します。
各コンポーネントは、モダンでプロフェッショナルな印象を与えながら、サービスの価値を効果的に伝えることを目指します。

## 未実装コンポーネント一覧

### 1. 顧客の声/レビュー一覧
```typescript
type Review = {
  name: string;
  company: string;
  position: string;
  image: string;
  rating: number; // 1-5の評価
  text: string;
  date: string;
}
```

#### デザイン仕様
- カード形式でのレビュー表示
- カルーセル/スライダー実装
- 星評価の視覚的表現
- ユーザーの写真とプロフィール情報

#### セクション構成
- セクションID: `testimonials`
- タイトル: 「お客様の声」
- サブタイトル: 「エルピトを導入いただいたお客様からの評価」

#### レビュー項目
1. 顧客1
   - 名前: 田中 美香
   - 会社: Nail Salon MIRAGE
   - 役職: オーナー
   - 評価: 5
   - コメント: 「スワイプLPを導入してから、お客様の滞在時間が大幅に伸び、予約率が35%も向上しました。特にネイルデザインを見やすく紹介できるようになり、お客様の満足度も高いです。」
   - 日付: 2024年4月

2. 顧客2
   - 名前: 佐藤 健太
   - 会社: Eyelash Salon LUCE
   - 役職: マーケティング担当
   - 評価: 4
   - コメント: 「リスティング広告との連携で、広告費を抑えながら集客効果が出ています。データ分析に基づいた改善提案も的確で、常に進化し続けるLPの効果を実感しています。」
   - 日付: 2024年5月

3. 顧客3
   - 名前: 山田 優子
   - 会社: Beauty Salon CHARM
   - 役職: 経営者
   - 評価: 5
   - コメント: 「エルピトの運用代行サービスは本当に頼りになります。自分ではわからなかったWeb集客の課題を明確にし、解決策を提案してくれるので、安心してお任せできています。新規顧客が2倍以上に増えました！」
   - 日付: 2024年6月

#### レスポンシブ対応
- デスクトップ: 3カラムグリッド
- タブレット: 2カラムグリッド
- モバイル: 1カラム + スワイプでの切り替え

#### アニメーション
- スクロール時のフェードイン
- 評価星のカウントアップ表示

### 2. 実績の数値一覧
```typescript
type Stat = {
  id: string;
  value: number;
  unit: string;
  label: string;
  icon: string;
}
```

#### デザイン仕様
- 大きな数字での視覚的アピール
- アイコンの併用
- カウントアップアニメーション
- グリッドレイアウト

#### セクション構成
- セクションID: `achievement-stats`
- タイトル: 「導入実績」
- サブタイトル: 「数字で見るエルピトの効果」

#### 実績項目
1. 累計導入数
   - 値: 150
   - 単位: 件
   - ラベル: 「導入実績」
   - アイコン: チェックマーク

2. 平均CV率向上
   - 値: 150
   - 単位: %
   - ラベル: 「CV率向上」
   - アイコン: 上向き矢印

3. 平均滞在時間増加
   - 値: 230
   - 単位: %
   - ラベル: 「滞在時間増加」
   - アイコン: 時計

4. 月間データ分析数
   - 値: 100000
   - 単位: +
   - ラベル: 「月間分析データ数」
   - アイコン: グラフ

#### コンテンツ
- 各数値の下に簡潔な説明文
- 「詳細を見る」ボタンでケーススタディへリンク

#### アニメーション
- スクロール時のカウントアップアニメーション
- ホバー時の強調効果

### 3. 比較テーブル
```typescript
type ComparisonItem = {
  feature: string;
  traditional: boolean | string;
  elpto: boolean | string;
  highlight?: boolean;
}
```

#### デザイン仕様
- 2列比較（従来のLP vs エルピト）
- ハイライト行の強調表示
- モバイル時は縦並びに変換
- チェックマークとバツマークの視覚要素

#### セクション構成
- セクションID: `comparison-table`
- タイトル: 「従来のLPとの比較」
- サブタイトル: 「エルピトがもたらす革新的な違い」

#### 比較項目
1. ユーザー体験
   - 項目名: 「ユーザー体験」
   - 従来のLP: 「静的なページのみ」
   - エルピト: 「インタラクティブなスワイプ体験」
   - ハイライト: true

2. データ分析
   - 項目名: 「データ分析」
   - 従来のLP: 「基本的なアクセス解析のみ」
   - エルピト: 「AIによる高度な行動分析」
   - ハイライト: true

3. 改善サイクル
   - 項目名: 「改善サイクル」
   - 従来のLP: 「手動での更新が必要」
   - エルピト: 「データに基づく自動最適化提案」
   - ハイライト: false

4. モバイル対応
   - 項目名: 「モバイル対応」
   - 従来のLP: 「レスポンシブ対応のみ」
   - エルピト: 「スマホ操作に最適化されたUI/UX」
   - ハイライト: true

5. コンテンツ更新
   - 項目名: 「コンテンツ更新」
   - 従来のLP: 「デザイナーに依頼が必要」
   - エルピト: 「簡単な管理画面から更新可能」
   - ハイライト: false

6. 運用サポート
   - 項目名: 「運用サポート」
   - 従来のLP: 「限定的なサポート」
   - エルピト: 「専任担当者による継続的支援」
   - ハイライト: true

#### レスポンシブ対応
- デスクトップ: 横2列のテーブル
- モバイル: カード形式に変換（各項目ごとに従来/エルピトを縦に表示）

### 4. 統計情報カード
```typescript
type StatCard = {
  category: string;
  mainStat: {
    value: number;
    unit: string;
    trend: 'up' | 'down';
  };
  subStats: {
    label: string;
    value: number;
    unit: string;
  }[];
  bgColor: string;
}
```

#### デザイン仕様
- カテゴリ別の色分け
- トレンドを示す矢印アイコン
- メイン数値と補足数値の階層表示
- 浮き上がったカードデザイン

#### セクション構成
- セクションID: `stat-cards`
- タイトル: 「データで見る効果」
- サブタイトル: 「エルピト導入企業の平均的な改善効果」

#### 統計カード項目
1. 集客効果
   - カテゴリ: 「集客効果」
   - メイン指標: 「Web流入数 200%増」
   - トレンド: up
   - サブ指標: 
     - 「直帰率: 40%減」
     - 「滞在時間: 3倍」
     - 「ページ閲覧数: 2.5倍」
   - 背景色: ティール (#06C7C7)

2. コスト効率
   - カテゴリ: 「コスト効率」
   - メイン指標: 「広告費用対効果 150%向上」
   - トレンド: up
   - サブ指標:
     - 「クリック単価: 30%減」
     - 「コンバージョン単価: 45%減」
     - 「ROAS: 2.4倍」
   - 背景色: プライマリグリーン (#02A550)

3. 顧客満足度
   - カテゴリ: 「顧客満足度」
   - メイン指標: 「ユーザー評価 4.8/5」
   - トレンド: up
   - サブ指標:
     - 「再訪問率: 65%増」
     - 「SNS共有: 3.2倍」
     - 「口コミ投稿: 2.8倍」
   - 背景色: ロイヤルブルー (#4169E1)

#### レスポンシブ対応
- デスクトップ: 3カラムグリッド
- タブレット: 2カラムグリッド
- モバイル: 1カラム（スクロール）

### 5. インフォグラフィック
```typescript
type InfographicStep = {
  number: number;
  title: string;
  description: string;
  icon: string;
}
```

#### デザイン仕様
- 横並びまたは縦並びのステップ表示
- 矢印や線でつながる視覚的なフロー表現
- アイコンの効果的な使用
- モダンなグラフィック要素

#### セクション構成
- セクションID: `infographic`
- タイトル: 「エルピト導入の流れ」
- サブタイトル: 「わずか3ステップで簡単導入」

#### インフォグラフィック内容
1. 相談・ヒアリング
   - 番号: 1
   - タイトル: 「無料相談・ヒアリング」
   - 説明: 「お客様のビジネス課題や目標をヒアリングし、最適なプランをご提案します。」
   - アイコン: 会話/対話アイコン

2. プラン設計・LP制作
   - 番号: 2
   - タイトル: 「プラン設計・LP制作」
   - 説明: 「ヒアリング内容をもとに、効果的なスワイプLPを設計・制作します。」
   - アイコン: デザイン/制作アイコン

3. 運用開始・改善サイクル
   - 番号: 3
   - タイトル: 「運用開始・改善サイクル」
   - 説明: 「データ分析に基づく継続的な改善を行い、成果を最大化します。」
   - アイコン: グラフ/サイクルアイコン

#### レスポンシブ対応
- デスクトップ: 横並び3ステップ
- モバイル: 縦並び3ステップ

#### アニメーション
- スクロール時のステップごとのフェードイン
- ステップ番号のカウントアップ

### 6. ビフォー/アフター比較
```typescript
type BeforeAfterItem = {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
  stats: {
    label: string;
    beforeValue: number;
    afterValue: number;
    unit: string;
  }[];
}
```

#### デザイン仕様
- スライダーによる比較表示
- 効果を強調する視覚的要素
- ビフォー/アフターの数値比較
- アップグレードを強調する色使い

#### セクション構成
- セクションID: `before-after`
- タイトル: 「導入前と導入後の変化」
- サブタイトル: 「エルピトがもたらす具体的な改善効果」

#### 比較項目
1. LP表示パフォーマンス
   - タイトル: 「LP表示とユーザビリティ」
   - ビフォー説明: 「従来の静的なLP表示では、限られた情報しか一度に表示できず、ユーザーは長いスクロールを強いられていました。」
   - アフター説明: 「スワイプLPでは、直感的な操作で必要な情報にすぐにアクセスでき、ユーザーエンゲージメントが大幅に向上しています。」
   - 比較数値:
     - 「平均滞在時間」: 1分20秒 → 3分45秒
     - 「ページ閲覧数」: 2.3ページ → 5.8ページ
     - 「バウンス率」: 65% → 28%

2. 集客効果
   - タイトル: 「集客とコンバージョン」
   - ビフォー説明: 「一般的なLPでは、訪問者から顧客への転換率が低く、広告費対効果も限定的でした。」
   - アフター説明: 「エルピトの導入により、魅力的な体験と効果的なCTAで、より多くの訪問者が問い合わせや予約へとつながっています。」
   - 比較数値:
     - 「コンバージョン率」: 2.1% → 5.3%
     - 「顧客獲得コスト」: 15,000円 → 6,200円
     - 「ROAS」: 120% → 280%

#### レスポンシブ対応
- デスクトップ: 左右分割表示
- モバイル: 上下比較表示

#### インタラクション
- スライダーによるビフォー/アフターの切り替え
- ホバー時の詳細情報表示
