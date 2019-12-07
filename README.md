# 使用上の注意事項
- [moment.js](https://momentjs.com/)と[underscoreGS](https://sites.google.com/site/scriptsexamples/custom-methods/underscoregs)という外部ライブラリを使用するため、通常のGASと初期操作が異なります。
  - ライブラリを利用する方法は下記します。
- [clasp](https://github.com/google/clasp)についてもこの機会にご利用してみて下さい。
  - claspを利用する方法は下記します。
- 定期実行したい場合は、GASファイルを開く →「編集」→「現在のプロジェクトのトリガー」→トリガー追加画面へ遷移 →「＋トリガーを追加」という流れで定期実行の設定が行えます。

# ライブラリの使用方法
1. 対象のGASを開きます。
2. 「リソース」→「ライブラリ」をクリック（下図1）
3. 「Add a library」の部分にライブラリIDを入力して「追加」をクリック（下図2）
  - `underscoreGS`のライブラリIDは`1yzaSmLB2aNXtKqIrSZ92SA4D14xPNdZOo3LQRH2Zc6DK6gHRpRK_StrT`
  - `Moment`のライブラリIDは`15hgNOjKHUG4UtyZl9clqBbl23sDvWMS8pfDJOyIapZk5RBqwL3i-rlCo`
4. 対象のライブラリが現れるので、最新バージョンを指定し、Development modeをオンにする
5. 「保存」をクリックして完了

(図1)
![image](https://user-images.githubusercontent.com/48205005/70034226-309cb000-15f4-11ea-9954-d077db9b6c20.png)

(図2)
![image](https://user-images.githubusercontent.com/48205005/70034677-e8ca5880-15f4-11ea-8e17-47ee90420857.png)

# claspの使用方法
## 環境構築
1. `npm i @google/clasp -g`
2. `clasp login`
3. Google OAuth認証
4. 自分のGASの設定画面からGoogle Apps Script APIを有効にする（下図3〜6）
5. `cd <your dir>`
6. `clasp clone 1zjac43X5TMVrwSIPZMJPzDDMs5Yoq2nsuqHd9Y3JI_Rl5DENHjCfTRdy`（下図7,8）
7. これにて環境構築完了

## その後の操作
- ローカルのエディタで実装したものを`clasp push`すると、GAS UIに反映されます。
- ローカルではES6記法やTypeScriptも使用できます。それらをpushするとGAS用にコンパイルされてGAS UIに反映されます。
- またGAS UI上で直接書いたものを`clasp pull`でローカルに反映させることも可能です。

(図3)
![image](https://user-images.githubusercontent.com/48205005/70035164-b53bfe00-15f5-11ea-92ad-fc9727626406.png)

(図4)
![image](https://user-images.githubusercontent.com/48205005/70035520-5460f580-15f6-11ea-9422-526d1d20154b.png)

(図5)
![image](https://user-images.githubusercontent.com/48205005/70035535-5aef6d00-15f6-11ea-80cd-d0cf2ecda406.png)

(図6)
![image](https://user-images.githubusercontent.com/48205005/70035554-680c5c00-15f6-11ea-925f-2feef4238842.png)

(図7)
![image](https://user-images.githubusercontent.com/48205005/70035687-b3bf0580-15f6-11ea-876e-46a129e88b0a.png)

(図8)
![image](https://user-images.githubusercontent.com/48205005/70035763-d9e4a580-15f6-11ea-876d-fc4decb5c4b4.png)


## 参考URL
- [GAS のGoogle謹製CLIツール clasp](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)