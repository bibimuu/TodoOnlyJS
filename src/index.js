import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("addText").value;
  document.getElementById("addText").value = "";
  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (deleteTarget) => {
  document.getElementById("incompleteList").removeChild(deleteTarget);
};

//未完了リストに未完了リストに追加する関数
const createIncompleteList = (inputText) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "listRow";

  //p生成
  const p = document.createElement("p");
  p.className = "todoContent";
  p.innerText = inputText;

  //削除タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親要素ごと消す
    deleteFromIncompleteList(li);
  });

  //完了タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", (ele) => {
    //押された削除ボタンの親要素ごと消す
    deleteFromIncompleteList(ele.path[2]);

    //完了したTodoに追加する要素
    const addTarget = ele.path[2];
    //Todo内容テキストを取得
    const text = addTarget.firstElementChild.firstElementChild.innerText;
    //divの初期化
    addTarget.textContent = null;
    //li生成
    const li = document.createElement("li");
    //div生成
    const div = document.createElement("div");
    div.className = "listRow";
    //p生成
    const p = document.createElement("p");
    p.className = "todoContent";
    p.innerText = text;
    //buttonの生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻る";
    backButton.addEventListener("click", (ele) => {
      // 押されたボタンの押されたボタンの親タグを完了しストから削除
      document.getElementById("completedList").removeChild(ele.path[2]);
      //未完了のTOdoに追加する
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    li.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);

    //完了リストに追加
    document.getElementById("completedList").appendChild(li);
  });

  //liの中に子要素を設定
  li.appendChild(div);
  //divの中に子要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incompleteList").appendChild(li);
};

document
  .getElementById("addButton")
  .addEventListener("click", () => onClickAdd());
