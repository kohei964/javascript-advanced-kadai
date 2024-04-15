/*== それぞれの関数の作成 ==*/

/*== 変数の初期化==*/
let unTyped = '';
let typed = '';
let score = 0;

/*== HTML要素の取得 ==*/
const unTypedField = document.getElementById('untyped');
const typedField = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const timeStart = document.getElementById('start');



//テキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

//ランダムなテキストの表示
const createText = () => {

    //入力し終えた文字列をクリア
    typed ='';
    typedField.textContent = typed;

    //ランダムな数値を生成
    let randomNum = Math.floor(Math.random()*textLists.length);

    //配列からランダムな数値を生成
    unTyped = textLists[randomNum];
    unTypedField.textContent = unTyped;
};




//　== キー入力の判定
const keyPress = e => {

    //== 誤った文字がタイプされた場合
    if(e.key !== unTyped.substring(0,1)) {
        //class.Listでクラスmistypedを追加
        wrap.classList.add('mistyped');

        //100ms後に背景色を元に戻す
        setTimeout(()=>{
            wrap.classList.remove('mistyped');
        },100);

        return;
    }


    //== 正しい文字がタイプされた場合

    //スコアのインクリメント
    score++;
    correctCount++;
    numberOfTimes();

    //変数「unTyed」の先頭文字を取得、変数「typed」の後ろに代入 
    typed = typed + unTyped.substring(0,1);

    //「untyped」に２文字目以降の文字列を再代入
    unTyped = unTyped.substring(1);

    //それぞれの定数に変数を代入
    typedField.textContent = typed;
    unTypedField.textContent = unTyped;

    //正しいタイプ時にはクラスmistypedを削除し背景を通常にする
    wrap.classList.remove('mistyped');

    //テキストがなくなったら新しいテキストを表示
    if(unTyped === '' ) {
        createText();
    }

};

//== 現在のタイプ数を表示=============================================================================
    
    //タイプ数をカウントする変数
    let correctCount = 0;

    const numberOfTimes = () =>{
        const typeTimes =document.getElementById('type-times');
        typeTimes.textContent = correctCount;
    };

//=================================================================================================







//== タイピングスキルランクを判定
const rankCheck = score => {

    //テキストを格納する変数を作る
    let resultText = '';

    //スコアに応じて異なるメッセージを生成し、変数resultTextに格納
    if(score < 100){
        resultText =`あなたのランクはCです\n Bランクまであと${100 - score}文字です。`;
    }

    else if(score < 200){
        resultText = `あなたのランクはBです\n Aランクまであと${200 - score}文字です`;
    }

    else if (score < 300){
        resultText = `あなたのランクはAです\n Sランクまであと${300 - score}文字です`;
    }
    else if (score >= 300){
        resultText = `あなたのランクはSです。おめでとうございます！`;
    }

    //生成したメッセージを、文字列を一緒に返す
    return`${score}文字打てました！\n ${resultText}\n 【OK】 リトライ / 【キャンセル】終了`;
};





//==  ゲームを終了
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    //OKボタンをクリックされたらリロード
    if(result == true){
        window.location.reload();
    }
};

//== カウントダウンタイマー
const timer = () => {
    //タイマー部分の「p要素」を取得
    let time = count.textContent;

    const id = setInterval(()=>{
        //カウントダウンする
        time--;
        count.textContent = time;

        //カウントが0になったらタイマーを停止する
        if(time <= 0){
            gameOver(id);
        }
    },1000);
};



//== スタートボタンを押した時の処理
timeStart.addEventListener('click',()=>{
    //タイマーを開始
    timer();

    //ランダムなテキストを表示
    createText();

    //スタートボタンを非表示に
    timeStart.style.display = 'none';

    //キーボードのイベント処理
    document.addEventListener('keypress',keyPress);
});

unTypedField.textContent = 'スタートボタンで開始';


