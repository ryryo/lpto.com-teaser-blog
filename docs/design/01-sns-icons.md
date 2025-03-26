# SNSアイコン素材

LP実装用のSNSアイコンをSVG形式で準備します。これらのアイコンはHTML内で直接インラインSVGとして使用することができます。

## Twitter（X）アイコン

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
</svg>
```

## Facebook アイコン

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
</svg>
```

## Instagram アイコン

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
</svg>
```

## YouTube アイコン

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
</svg>
```

## LINEアイコン

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2C6.5 2 2 5.8 2 10.5c0 2.4 1.1 4.5 2.9 6.1.3.3.7.5.6 1-.1.4-.3.9-.5 1.4-.2.5 0 .7.5.5 1.2-.5 3.2-1.8 4.5-2.5.5-.3.8-.3 1.1-.3 5.5 0 10-3.8 10-8.3C21 5.8 17.5 2 12 2z"></path>
</svg>
```

## HTMLでの使用方法

これらのSVGアイコンはHTMLに直接インラインで埋め込むことができます。また、以下のようにaタグで囲むことでリンクとして使用できます。

```html
<div class="social-icons">
  <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  </a>
  <!-- 他のSNSアイコンも同様に -->
</div>
```

## CSSでのスタイリング例

SVGアイコンに対して以下のようなCSSスタイルを適用できます：

```scss
.social-icons {
  display: flex;
  gap: 16px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);
      
      svg {
        stroke: white;
      }
    }
  }
  
  svg {
    stroke: var(--text-color-light);
    transition: stroke 0.3s ease;
  }
}

// ダークモード対応
@media (prefers-color-scheme: dark) {
  .social-icons svg {
    stroke: var(--text-color-dark);
  }
}
```

## 利点

1. **ファイル読み込み不要**: 外部ファイルとして読み込む必要がないため、HTTPリクエストが減少
2. **カスタマイズ性**: CSSでstroke、fill、widthなどの属性を動的に変更可能
3. **アクセシビリティ**: aria-label属性を使用して適切にラベル付け可能
4. **レスポンシブ**: SVGはどのサイズでも鮮明に表示される
5. **軽量**: シンプルなアイコンはファイルサイズが非常に小さい

これらのSVGアイコンは[Feather Icons](https://feathericons.com/)をベースにしています。もし必要であれば、他のアイコンも同様の方法で追加できます。 