# js_pagination

## 完成イメージ
<img width="290" alt="image" src="https://github.com/koto74/js_pagination/assets/124267041/f65b9032-7b3f-464a-8b2b-4af9ccc46bd7">
<br>

<img width="278" alt="image" src="https://github.com/koto74/js_pagination/assets/124267041/ce50493d-0904-4521-8e15-b1e91acf491e">

## 環境構築
yarnを初期化。パッケージのインストール
```
yarn init -y
yarn add sass --dev
```
package.jsonに以下を追加
```
  "scripts": {
    "scss": "sass src/scss:public/css"
  },
```
以下コマンドでsassをコンパイル
```
yarn scss
```
